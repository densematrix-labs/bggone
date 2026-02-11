"""Test configuration and fixtures."""
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services import rate_limiter


@pytest.fixture
def client():
    """Create test client."""
    return TestClient(app)


@pytest.fixture
def reset_rate_limiter():
    """Reset rate limiter between tests."""
    rate_limiter._device_usage.clear()
    yield
    rate_limiter._device_usage.clear()


@pytest.fixture
def sample_image():
    """Create a simple test image."""
    from PIL import Image
    import io
    
    # Create a simple 100x100 red image
    img = Image.new('RGB', (100, 100), color='red')
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)
    return buffer.getvalue()


@pytest.fixture
def large_image():
    """Create a large test image."""
    from PIL import Image
    import io
    
    # Create a 2000x2000 image
    img = Image.new('RGB', (2000, 2000), color='blue')
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)
    return buffer.getvalue()
