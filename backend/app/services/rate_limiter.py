"""Rate limiting service for free tier usage."""
import time
from datetime import datetime, timedelta
from typing import Dict, Tuple
from app.config import settings
from app.metrics import free_trial_used, TOOL_NAME

# In-memory storage for device usage
# Format: {device_id: {"count": int, "reset_at": timestamp}}
_device_usage: Dict[str, dict] = {}


def get_daily_reset_timestamp() -> float:
    """Get timestamp for midnight UTC."""
    now = datetime.utcnow()
    tomorrow = now.replace(hour=0, minute=0, second=0, microsecond=0) + timedelta(days=1)
    return tomorrow.timestamp()


def check_rate_limit(device_id: str) -> Tuple[bool, int, int]:
    """
    Check if device has remaining free uses.
    
    Args:
        device_id: Device fingerprint ID
        
    Returns:
        Tuple of (allowed: bool, remaining: int, reset_at: int)
    """
    now = time.time()
    
    if device_id not in _device_usage:
        # New device
        _device_usage[device_id] = {
            "count": 0,
            "reset_at": get_daily_reset_timestamp()
        }
    
    usage = _device_usage[device_id]
    
    # Check if reset is needed
    if now >= usage["reset_at"]:
        usage["count"] = 0
        usage["reset_at"] = get_daily_reset_timestamp()
    
    remaining = settings.FREE_DAILY_LIMIT - usage["count"]
    allowed = remaining > 0
    
    return allowed, remaining, int(usage["reset_at"])


def record_usage(device_id: str) -> int:
    """
    Record a usage for the device.
    
    Args:
        device_id: Device fingerprint ID
        
    Returns:
        Remaining uses after this usage
    """
    if device_id not in _device_usage:
        _device_usage[device_id] = {
            "count": 0,
            "reset_at": get_daily_reset_timestamp()
        }
    
    _device_usage[device_id]["count"] += 1
    free_trial_used.labels(tool=TOOL_NAME).inc()
    
    return settings.FREE_DAILY_LIMIT - _device_usage[device_id]["count"]


def get_usage_stats() -> dict:
    """Get overall usage statistics."""
    return {
        "total_devices": len(_device_usage),
        "daily_limit": settings.FREE_DAILY_LIMIT,
    }
