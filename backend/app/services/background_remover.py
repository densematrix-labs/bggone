"""Background removal service using rembg."""
import io
import time
from PIL import Image
from rembg import remove, new_session
from app.metrics import bg_removal_total, bg_removal_duration, TOOL_NAME


# Initialize rembg session (load model once)
_session = None


def get_session():
    """Get or create rembg session."""
    global _session
    if _session is None:
        _session = new_session("u2net")
    return _session


async def remove_background(image_bytes: bytes) -> bytes:
    """
    Remove background from an image.
    
    Args:
        image_bytes: Input image as bytes
        
    Returns:
        PNG image bytes with transparent background
    """
    start_time = time.time()
    
    try:
        # Open image
        input_image = Image.open(io.BytesIO(image_bytes))
        
        # Remove background using rembg
        session = get_session()
        output_image = remove(
            input_image,
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=10,
        )
        
        # Convert to PNG bytes
        output_buffer = io.BytesIO()
        output_image.save(output_buffer, format="PNG", optimize=True)
        output_bytes = output_buffer.getvalue()
        
        # Record metrics
        duration = time.time() - start_time
        bg_removal_total.labels(tool=TOOL_NAME, status="success").inc()
        bg_removal_duration.labels(tool=TOOL_NAME).observe(duration)
        
        return output_bytes
        
    except Exception as e:
        bg_removal_total.labels(tool=TOOL_NAME, status="error").inc()
        raise e


def get_image_info(image_bytes: bytes) -> dict:
    """Get image dimensions and format."""
    image = Image.open(io.BytesIO(image_bytes))
    return {
        "width": image.width,
        "height": image.height,
        "format": image.format,
        "mode": image.mode,
    }
