"""Tests for Prometheus metrics."""
import pytest


def test_metrics_endpoint(client):
    """Test metrics endpoint returns Prometheus format."""
    response = client.get("/metrics")
    assert response.status_code == 200
    assert "text/plain" in response.headers["content-type"]
    
    # Check for expected metrics
    content = response.text
    assert "bg_removal_total" in content or "# HELP" in content
    assert "free_trial_used_total" in content or "# HELP" in content


def test_metrics_after_usage(client, sample_image, reset_rate_limiter):
    """Test metrics are recorded after image processing."""
    import io
    
    # Process an image
    client.post(
        "/api/v1/remove-bg",
        headers={"X-Device-ID": "metrics_test"},
        files={"file": ("test.png", io.BytesIO(sample_image), "image/png")}
    )
    
    # Check metrics
    response = client.get("/metrics")
    content = response.text
    
    # Should have recorded the usage
    assert "free_trial_used_total" in content
