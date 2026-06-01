from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from agents.voice_agent import voice_chat, extract_voice_profile
from db.session import get_db
from db.queries import save_voice_profile, get_voice_profile, update_voice_profile

router = APIRouter(prefix="/voice", tags=["voice"])


class ChatMessage(BaseModel):
    campaign_id: str
    message: str
    history: list[dict] = []


class ChatResponse(BaseModel):
    reply: str
    training_complete: bool
    history: list[dict]
    voice_profile: dict | None = None


class EditFeedback(BaseModel):
    campaign_id: str
    original: str
    edited: str


@router.post("/chat", response_model=ChatResponse)
async def voice_chat_endpoint(data: ChatMessage, db: AsyncSession = Depends(get_db)):
    # Determine step based on message count
    step = min((len(data.history) // 2) + 1, 4)  # Increment every 2 messages, max 4

    result = await voice_chat(
        agent_id="custom",
        step=step,
        user_input=data.message,
        conversation_history=data.history,
    )

    voice_profile = None
    # Assume training is complete after 4 steps
    training_complete = step >= 4

    if training_complete:
        voice_profile = await extract_voice_profile(data.history + [
            {"role": "assistant", "content": result["response"]}
        ])
        await save_voice_profile(db, data.campaign_id, voice_profile, data.history)

    return ChatResponse(
        reply=result["response"],
        training_complete=training_complete,
        history=data.history + [{"role": "assistant", "content": result["response"]}],
        voice_profile=voice_profile,
    )


@router.get("/{campaign_id}")
async def get_profile(campaign_id: str, db: AsyncSession = Depends(get_db)):
    vp = await get_voice_profile(db, campaign_id)
    if not vp:
        return {"voice_profile": None}
    return {"voice_profile": vp.profile}


@router.post("/learn")
async def learn_from_user_edit(data: EditFeedback, db: AsyncSession = Depends(get_db)):
    """
    Learn from user edits to refine voice profile.
    Future: integrate this to improve voice accuracy based on user feedback.
    """
    vp = await get_voice_profile(db, data.campaign_id)
    current = vp.profile if vp else {}

    # For now, just return the current profile
    # In future, implement learning logic here
    return {"voice_profile": current}
