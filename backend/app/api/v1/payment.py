"""Creem payment integration endpoints."""
import os
import json
import hmac
import hashlib
from typing import Optional
from fastapi import APIRouter, HTTPException, Header, Request
from pydantic import BaseModel
import requests

from app.config import settings
from app.metrics import (
    payment_checkout_created,
    payment_success,
    payment_revenue_cents,
    payment_webhook_received,
    tokens_created,
    TOOL_NAME,
)

router = APIRouter(prefix="/api/v1/payment", tags=["payment"])

# Creem API configuration
CREEM_API_BASE = "https://api.creem.io" if not settings.CREEM_API_KEY.startswith("creem_test_") else "https://test-api.creem.io"

# Product configurations (based on competitor pricing analysis)
# remove.bg charges $0.225/image, we charge $0.035-0.06 (70-82% cheaper)
PRODUCTS = {
    "starter_50": {"name": "Starter Pack (50 Credits)", "credits": 50, "price_cents": 299},   # $0.06/image
    "pro_200": {"name": "Pro Pack (200 Credits)", "credits": 200, "price_cents": 699},        # $0.035/image
    "unlimited_monthly": {"name": "Unlimited Monthly", "credits": -1, "price_cents": 499},   # -1 = unlimited
}


class CheckoutRequest(BaseModel):
    """Checkout creation request."""
    product_sku: str
    device_id: str
    success_url: str
    cancel_url: str
    email: Optional[str] = None


class CheckoutResponse(BaseModel):
    """Checkout creation response."""
    checkout_url: str
    checkout_id: str


@router.post("/create-checkout", response_model=CheckoutResponse)
async def create_checkout(request: CheckoutRequest):
    """Create a Creem checkout session."""
    if not settings.CREEM_API_KEY:
        raise HTTPException(status_code=503, detail="Payment not configured")
    
    if request.product_sku not in PRODUCTS:
        raise HTTPException(status_code=400, detail="Invalid product SKU")
    
    product = PRODUCTS[request.product_sku]
    
    # Get Creem product ID from config
    try:
        product_ids = json.loads(settings.CREEM_PRODUCT_IDS)
        creem_product_id = product_ids.get(request.product_sku)
        if not creem_product_id:
            raise HTTPException(status_code=503, detail="Product not configured in Creem")
    except json.JSONDecodeError:
        raise HTTPException(status_code=503, detail="Invalid product configuration")
    
    # Create checkout via Creem API
    try:
        response = requests.post(
            f"{CREEM_API_BASE}/v1/checkouts",
            headers={
                "Authorization": f"Bearer {settings.CREEM_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "product_id": creem_product_id,
                "success_url": request.success_url,
                "cancel_url": request.cancel_url,
                "metadata": {
                    "device_id": request.device_id,
                    "product_sku": request.product_sku,
                    "tool": TOOL_NAME,
                },
            },
            timeout=30,
        )
        response.raise_for_status()
        data = response.json()
        
        # Record metric
        payment_checkout_created.labels(tool=TOOL_NAME, product_sku=request.product_sku).inc()
        
        return CheckoutResponse(
            checkout_url=data["checkout_url"],
            checkout_id=data["id"],
        )
        
    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Payment provider error: {str(e)}")


def verify_webhook_signature(payload: bytes, signature: str) -> bool:
    """Verify Creem webhook signature."""
    if not settings.CREEM_WEBHOOK_SECRET:
        return False
    
    expected = hmac.new(
        settings.CREEM_WEBHOOK_SECRET.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(f"sha256={expected}", signature)


@router.post("/webhooks/creem")
async def handle_creem_webhook(
    request: Request,
    x_creem_signature: str = Header(None, alias="X-Creem-Signature"),
):
    """Handle Creem payment webhooks."""
    payload = await request.body()
    
    # Verify signature
    if x_creem_signature and not verify_webhook_signature(payload, x_creem_signature):
        payment_webhook_received.labels(tool=TOOL_NAME, event_type="unknown", status="invalid_signature").inc()
        raise HTTPException(status_code=401, detail="Invalid signature")
    
    try:
        event = json.loads(payload)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON")
    
    event_type = event.get("type", "unknown")
    
    if event_type == "checkout.completed":
        await handle_checkout_completed(event)
        payment_webhook_received.labels(tool=TOOL_NAME, event_type=event_type, status="success").inc()
    else:
        payment_webhook_received.labels(tool=TOOL_NAME, event_type=event_type, status="ignored").inc()
    
    return {"received": True}


async def handle_checkout_completed(event: dict):
    """Handle completed checkout event."""
    data = event.get("data", {})
    metadata = data.get("metadata", {})
    
    device_id = metadata.get("device_id")
    product_sku = metadata.get("product_sku")
    amount_cents = data.get("amount", 0)
    currency = data.get("currency", "USD")
    
    if not device_id or not product_sku:
        return
    
    product = PRODUCTS.get(product_sku)
    if not product:
        return
    
    # Record payment metrics
    payment_success.labels(tool=TOOL_NAME, product_sku=product_sku, currency=currency).inc()
    payment_revenue_cents.labels(tool=TOOL_NAME, product_sku=product_sku, currency=currency).inc(amount_cents)
    tokens_created.labels(tool=TOOL_NAME, product_sku=product_sku).inc()
    
    # TODO: Create token in database
    # For now, we log the successful payment
    print(f"Payment completed: {product_sku} for device {device_id}, {amount_cents} {currency}")
