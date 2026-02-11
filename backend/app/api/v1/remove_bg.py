"""Background removal API endpoints."""
import io
from fastapi import APIRouter, UploadFile, File, HTTPException, Header
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional

from app.config import settings
from app.services.background_remover import remove_background, get_image_info
from app.services.rate_limiter import check_rate_limit, record_usage
from app.metrics import file_size_bytes, TOOL_NAME

router = APIRouter(prefix="/api/v1", tags=["background-removal"])


class RateLimitResponse(BaseModel):
    """Rate limit status response."""
    allowed: bool
    remaining: int
    reset_at: int
    daily_limit: int


class ImageInfoResponse(BaseModel):
    """Image info response."""
    width: int
    height: int
    format: str
    size_bytes: int


@router.get("/rate-limit", response_model=RateLimitResponse)
async def get_rate_limit(x_device_id: str = Header(..., alias="X-Device-ID")):
    """Check current rate limit status for a device."""
    allowed, remaining, reset_at = check_rate_limit(x_device_id)
    return RateLimitResponse(
        allowed=allowed,
        remaining=remaining,
        reset_at=reset_at,
        daily_limit=settings.FREE_DAILY_LIMIT
    )


@router.post("/remove-bg")
async def remove_bg(
    file: UploadFile = File(...),
    x_device_id: str = Header(..., alias="X-Device-ID"),
):
    """
    Remove background from an uploaded image.
    
    Returns the processed image as PNG with transparent background.
    Rate limited to FREE_DAILY_LIMIT uses per device per day.
    """
    # Check rate limit
    allowed, remaining, reset_at = check_rate_limit(x_device_id)
    if not allowed:
        raise HTTPException(
            status_code=429,
            detail={
                "error": "rate_limit_exceeded",
                "message": f"Daily limit of {settings.FREE_DAILY_LIMIT} free uses reached",
                "reset_at": reset_at,
                "upgrade_url": "/pricing"
            }
        )
    
    # Validate file extension
    if not file.filename:
        raise HTTPException(status_code=400, detail="Filename is required")
    
    ext = file.filename.rsplit(".", 1)[-1].lower()
    if ext not in settings.ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"File type not allowed. Supported: {', '.join(settings.ALLOWED_EXTENSIONS)}"
        )
    
    # Read file
    contents = await file.read()
    file_size = len(contents)
    
    # Check file size
    max_bytes = settings.MAX_FILE_SIZE_MB * 1024 * 1024
    if file_size > max_bytes:
        raise HTTPException(
            status_code=400,
            detail=f"File too large. Maximum size: {settings.MAX_FILE_SIZE_MB}MB"
        )
    
    # Record file size metric
    file_size_bytes.labels(tool=TOOL_NAME).observe(file_size)
    
    try:
        # Process image
        result = await remove_background(contents)
        
        # Record usage
        new_remaining = record_usage(x_device_id)
        
        # Return as streaming response
        return StreamingResponse(
            io.BytesIO(result),
            media_type="image/png",
            headers={
                "Content-Disposition": f"attachment; filename=bggone_{file.filename.rsplit('.', 1)[0]}.png",
                "X-Remaining-Uses": str(new_remaining),
                "X-Daily-Limit": str(settings.FREE_DAILY_LIMIT),
            }
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to process image: {str(e)}"
        )


@router.post("/image-info", response_model=ImageInfoResponse)
async def get_image_info_endpoint(file: UploadFile = File(...)):
    """Get information about an uploaded image."""
    contents = await file.read()
    info = get_image_info(contents)
    return ImageInfoResponse(
        width=info["width"],
        height=info["height"],
        format=info["format"] or "unknown",
        size_bytes=len(contents)
    )
