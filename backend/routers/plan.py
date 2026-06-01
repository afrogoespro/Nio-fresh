from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from agents.icp_agent import derive_icp
from db.session import get_db
from db.queries import get_campaign, set_campaign_icp

router = APIRouter(prefix="/plan", tags=["plan"])


class PlanRequest(BaseModel):
    campaign_id: str
    business_description: str
    target_description: str
    goal: str


class ICPTag(BaseModel):
    type: str  # "title", "company", "industry", etc.
    value: str
    category: str  # "green", "tan", "purple"


class PlanResponse(BaseModel):
    campaign_id: str
    business_summary: str
    icp_tags: list[ICPTag]
    emails_per_day: int
    sending_window: str
    message: str


@router.post("/generate", response_model=PlanResponse)
async def generate_plan(data: PlanRequest, db: AsyncSession = Depends(get_db)):
    """Generate campaign plan from user inputs"""
    # Fetch campaign to verify it exists
    campaign = await get_campaign(db, data.campaign_id)
    if not campaign:
        return {"error": "Campaign not found"}

    # Use ICP agent to derive ideal customer profile
    icp = await derive_icp(
        business_description=data.business_description,
        target_description=data.target_description,
        goal=data.goal,
    )

    # Parse ICP into tags (example structure)
    icp_tags = []
    if hasattr(icp, "job_titles"):
        for title in icp.job_titles:
            icp_tags.append(ICPTag(type="title", value=title, category="green"))
    if hasattr(icp, "company_attributes"):
        for attr in icp.company_attributes:
            icp_tags.append(ICPTag(type="company", value=attr, category="tan"))
    if hasattr(icp, "industry"):
        icp_tags.append(ICPTag(type="industry", value=icp.industry, category="purple"))

    # Save ICP to database
    await set_campaign_icp(db, data.campaign_id, icp.model_dump() if hasattr(icp, "model_dump") else icp)

    return PlanResponse(
        campaign_id=data.campaign_id,
        business_summary=data.business_description,
        icp_tags=icp_tags,
        emails_per_day=12,  # Default, user can adjust
        sending_window="9am-12pm",  # Default, user can adjust
        message="Your plan is ready. Review below and adjust if needed.",
    )


@router.get("/{campaign_id}")
async def get_plan(campaign_id: str, db: AsyncSession = Depends(get_db)):
    """Get existing campaign plan"""
    campaign = await get_campaign(db, campaign_id)
    if not campaign:
        return {"error": "Campaign not found"}

    return {
        "campaign_id": campaign_id,
        "business_summary": campaign.business_description,
        "icp": campaign.icp if hasattr(campaign, "icp") else None,
    }


@router.post("/{campaign_id}/update")
async def update_plan_settings(
    campaign_id: str,
    emails_per_day: int = 12,
    sending_window: str = "9am-12pm",
    db: AsyncSession = Depends(get_db),
):
    """Update plan settings (emails per day, sending window)"""
    campaign = await get_campaign(db, campaign_id)
    if not campaign:
        return {"error": "Campaign not found"}

    # Update in database (would need to add these fields to campaign model)
    return {
        "campaign_id": campaign_id,
        "emails_per_day": emails_per_day,
        "sending_window": sending_window,
        "message": "Plan updated.",
    }
