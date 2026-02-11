"""Tests for rate limiting service."""
import pytest
from app.services.rate_limiter import (
    check_rate_limit,
    record_usage,
    get_usage_stats,
)
from app.config import settings


def test_check_rate_limit_new_device(reset_rate_limiter):
    """Test new device gets full quota."""
    allowed, remaining, reset_at = check_rate_limit("new_device_123")
    assert allowed is True
    assert remaining == settings.FREE_DAILY_LIMIT
    assert reset_at > 0


def test_check_rate_limit_after_usage(reset_rate_limiter):
    """Test remaining decreases after usage."""
    device_id = "test_device"
    
    # Check initial state
    allowed, remaining, _ = check_rate_limit(device_id)
    assert remaining == settings.FREE_DAILY_LIMIT
    
    # Record usage
    new_remaining = record_usage(device_id)
    assert new_remaining == settings.FREE_DAILY_LIMIT - 1
    
    # Check again
    allowed, remaining, _ = check_rate_limit(device_id)
    assert remaining == settings.FREE_DAILY_LIMIT - 1


def test_rate_limit_exhausted(reset_rate_limiter):
    """Test device is blocked after exhausting quota."""
    device_id = "exhausted_device"
    
    # Use all free uses
    for _ in range(settings.FREE_DAILY_LIMIT):
        record_usage(device_id)
    
    # Should be blocked now
    allowed, remaining, _ = check_rate_limit(device_id)
    assert allowed is False
    assert remaining == 0


def test_different_devices_independent(reset_rate_limiter):
    """Test different devices have independent quotas."""
    device_a = "device_a"
    device_b = "device_b"
    
    # Use quota for device A
    for _ in range(settings.FREE_DAILY_LIMIT):
        record_usage(device_a)
    
    # Device B should still have full quota
    allowed, remaining, _ = check_rate_limit(device_b)
    assert allowed is True
    assert remaining == settings.FREE_DAILY_LIMIT


def test_get_usage_stats(reset_rate_limiter):
    """Test usage statistics."""
    # Record some usage
    record_usage("device_1")
    record_usage("device_2")
    record_usage("device_2")
    
    stats = get_usage_stats()
    assert stats["total_devices"] == 2
    assert stats["daily_limit"] == settings.FREE_DAILY_LIMIT
