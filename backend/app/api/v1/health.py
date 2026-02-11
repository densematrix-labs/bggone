"""Health check endpoints."""
from fastapi import APIRouter
from pydantic import BaseModel
from app.config import settings

router = APIRouter(tags=["health"])


class HealthResponse(BaseModel):
    """Health check response."""
    status: str
    version: str
    service: str


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    return HealthResponse(
        status="healthy",
        version=settings.APP_VERSION,
        service=settings.APP_NAME
    )


@router.get("/ready", response_model=HealthResponse)
async def readiness_check():
    """Readiness check endpoint."""
    # Could add database/model checks here
    return HealthResponse(
        status="ready",
        version=settings.APP_VERSION,
        service=settings.APP_NAME
    )
