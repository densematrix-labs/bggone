"""Tests for health check endpoints."""
import pytest


def test_health_check(client):
    """Test health endpoint returns 200."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "BgGone"


def test_readiness_check(client):
    """Test readiness endpoint returns 200."""
    response = client.get("/ready")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ready"


def test_root_endpoint(client):
    """Test root endpoint returns service info."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["service"] == "BgGone"
    assert "version" in data
