"""Demo-only endpoints for controlled live presentation switches."""
import json
import time
from pathlib import Path

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/api/v1/demo", tags=["demo"])
STATE_PATH = Path("/tmp/bggone-demo-state.json")


class IntroToggleRequest(BaseModel):
    enabled: bool = True
    run_id: str | None = None


def _read_state() -> dict:
    if not STATE_PATH.exists():
        return {"intro_enabled": False, "updated_at": None, "run_id": None}
    try:
        return json.loads(STATE_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {"intro_enabled": False, "updated_at": None, "run_id": None}


@router.get("/status")
async def demo_status() -> dict:
    """Return live demo feature visibility state."""
    state = _read_state()
    return {
        "intro_enabled": bool(state.get("intro_enabled")),
        "updated_at": state.get("updated_at"),
        "run_id": state.get("run_id"),
    }


@router.post("/intro")
async def toggle_intro(payload: IntroToggleRequest) -> dict:
    """Enable/disable the Intro page link for the live demo site."""
    state = {
        "intro_enabled": payload.enabled,
        "updated_at": int(time.time()),
        "run_id": payload.run_id,
    }
    STATE_PATH.write_text(json.dumps(state, ensure_ascii=False), encoding="utf-8")
    return {"ok": True, **state}
