"""Prometheus metrics for BgGone."""
import os
from prometheus_client import Counter, Gauge, Histogram, generate_latest, CONTENT_TYPE_LATEST
from fastapi import APIRouter
from fastapi.responses import Response

TOOL_NAME = os.getenv("TOOL_NAME", "bggone")

# Core metrics
bg_removal_total = Counter(
    "bg_removal_total",
    "Total background removals processed",
    ["tool", "status"]
)

bg_removal_duration = Histogram(
    "bg_removal_duration_seconds",
    "Time spent processing background removal",
    ["tool"],
    buckets=[0.5, 1, 2, 5, 10, 30, 60]
)

free_trial_used = Counter(
    "free_trial_used_total",
    "Free trials used",
    ["tool"]
)

# Payment metrics
payment_checkout_created = Counter(
    "payment_checkout_created_total",
    "Number of checkouts created",
    ["tool", "product_sku"]
)

payment_success = Counter(
    "payment_success_total",
    "Number of successful payments",
    ["tool", "product_sku", "currency"]
)

payment_revenue_cents = Counter(
    "payment_revenue_cents_total",
    "Total revenue in cents",
    ["tool", "product_sku", "currency"]
)

payment_webhook_received = Counter(
    "payment_webhook_received_total",
    "Webhook events received",
    ["tool", "event_type", "status"]
)

tokens_created = Counter(
    "tokens_created_total",
    "Tokens created",
    ["tool", "product_sku"]
)

tokens_consumed = Counter(
    "tokens_consumed_total",
    "Tokens consumed",
    ["tool"]
)

tokens_remaining = Gauge(
    "tokens_remaining",
    "Remaining tokens",
    ["tool"]
)

# File metrics
file_size_bytes = Histogram(
    "file_size_bytes",
    "Size of uploaded files",
    ["tool"],
    buckets=[100000, 500000, 1000000, 5000000, 10000000, 20000000]
)

# Metrics router
metrics_router = APIRouter()


@metrics_router.get("/metrics")
async def metrics():
    """Prometheus metrics endpoint."""
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)
