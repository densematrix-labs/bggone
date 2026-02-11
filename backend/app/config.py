"""Configuration settings for BgGone backend."""
import os
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings."""
    
    # App
    APP_NAME: str = "BgGone"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 30066
    
    # Free tier limits
    FREE_DAILY_LIMIT: int = 5
    
    # File limits
    MAX_FILE_SIZE_MB: int = 20
    ALLOWED_EXTENSIONS: set = {"png", "jpg", "jpeg", "webp", "gif"}
    
    # Database (for payment tokens)
    DATABASE_URL: str = "postgresql+asyncpg://bggone:bggone@localhost:5432/bggone"
    
    # Creem Payment
    CREEM_API_KEY: str = ""
    CREEM_WEBHOOK_SECRET: str = ""
    CREEM_PRODUCT_IDS: str = '{"pack_5": "", "pack_20": "", "unlimited": ""}'
    
    # Prometheus
    TOOL_NAME: str = "bggone"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


settings = get_settings()
