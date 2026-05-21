"""BgGone FastAPI application."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import settings
from app.api.v1 import remove_bg, health, payment
from app.metrics import metrics_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup: preload rembg model
    from app.services.background_remover import get_session
    print("Loading rembg model...")
    get_session()
    print("Model loaded successfully!")
    yield
    # Shutdown
    print("Shutting down BgGone...")


app = FastAPI(
    title=settings.APP_NAME,
    description="AI-powered background removal tool - Free remove.bg alternative",
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Remaining-Uses", "X-Daily-Limit"],
)

# Include routers
app.include_router(health.router)
app.include_router(remove_bg.router)
app.include_router(payment.router)
app.include_router(metrics_router)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "docs": "/docs",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
    )
