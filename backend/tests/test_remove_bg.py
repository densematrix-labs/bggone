"""Tests for background removal API."""
import pytest
import io


def test_rate_limit_check(client, reset_rate_limiter):
    """Test rate limit check endpoint."""
    response = client.get(
        "/api/v1/rate-limit",
        headers={"X-Device-ID": "test_device"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["allowed"] is True
    assert data["remaining"] == 5
    assert data["daily_limit"] == 5


def test_remove_bg_missing_device_id(client, sample_image):
    """Test remove-bg fails without device ID."""
    response = client.post(
        "/api/v1/remove-bg",
        files={"file": ("test.png", io.BytesIO(sample_image), "image/png")}
    )
    assert response.status_code == 422  # Validation error


def test_remove_bg_invalid_file_type(client, reset_rate_limiter):
    """Test remove-bg rejects invalid file types."""
    response = client.post(
        "/api/v1/remove-bg",
        headers={"X-Device-ID": "test_device"},
        files={"file": ("test.txt", io.BytesIO(b"not an image"), "text/plain")}
    )
    assert response.status_code == 400
    assert "not allowed" in response.json()["detail"]


def test_remove_bg_success(client, sample_image, reset_rate_limiter):
    """Test successful background removal."""
    response = client.post(
        "/api/v1/remove-bg",
        headers={"X-Device-ID": "test_device"},
        files={"file": ("test.png", io.BytesIO(sample_image), "image/png")}
    )
    assert response.status_code == 200
    assert response.headers["content-type"] == "image/png"
    assert "X-Remaining-Uses" in response.headers
    assert int(response.headers["X-Remaining-Uses"]) == 4


def test_remove_bg_rate_limited(client, sample_image, reset_rate_limiter):
    """Test rate limiting after quota exhausted."""
    device_id = "rate_limited_device"
    
    # Use all free uses
    for i in range(5):
        response = client.post(
            "/api/v1/remove-bg",
            headers={"X-Device-ID": device_id},
            files={"file": ("test.png", io.BytesIO(sample_image), "image/png")}
        )
        assert response.status_code == 200
    
    # Next request should be rate limited
    response = client.post(
        "/api/v1/remove-bg",
        headers={"X-Device-ID": device_id},
        files={"file": ("test.png", io.BytesIO(sample_image), "image/png")}
    )
    assert response.status_code == 429
    data = response.json()
    assert data["detail"]["error"] == "rate_limit_exceeded"


def test_image_info(client, sample_image):
    """Test image info endpoint."""
    response = client.post(
        "/api/v1/image-info",
        files={"file": ("test.png", io.BytesIO(sample_image), "image/png")}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["width"] == 100
    assert data["height"] == 100
    assert data["format"] == "PNG"
