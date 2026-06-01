from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from agents.email_agent import generate_email_samples
from db.session import get_db
from db.queries import get_campaign

router = APIRouter(prefix="/preview", tags=["preview"])


class EmailSample(BaseModel):
    id: str
    subject: str
    body: str
    to_person: str
    to_company: str
    personalization: str  # The specific research fact used


class EmailPreviewRequest(BaseModel):
    campaign_id: str
    num_samples: int = 3


class EmailPreviewResponse(BaseModel):
    campaign_id: str
    emails: list[EmailSample]
    agent_tone: str
    message: str


@router.post("/emails", response_model=EmailPreviewResponse)
async def preview_emails(data: EmailPreviewRequest, db: AsyncSession = Depends(get_db)):
    """Generate sample emails for user review"""
    campaign = await get_campaign(db, data.campaign_id)
    if not campaign:
        return {"error": "Campaign not found"}

    # Generate email samples using email agent
    email_samples = await generate_email_samples(
        campaign_id=data.campaign_id,
        agent_id=campaign.agent_id,
        business_description=campaign.business_description,
        target_description=campaign.target_description,
        goal=campaign.goal,
        num_samples=data.num_samples,
    )

    # Transform to EmailSample objects
    emails = [
        EmailSample(
            id=f"email_{i}",
            subject=sample.get("subject", ""),
            body=sample.get("body", ""),
            to_person=sample.get("to_person", ""),
            to_company=sample.get("to_company", ""),
            personalization=sample.get("personalization", ""),
        )
        for i, sample in enumerate(email_samples)
    ]

    return EmailPreviewResponse(
        campaign_id=data.campaign_id,
        emails=emails,
        agent_tone=campaign.tone if hasattr(campaign, "tone") else "professional",
        message="Here are sample emails. Review and approve to start campaign.",
    )


class EmailApprovalRequest(BaseModel):
    campaign_id: str
    approved_email_ids: list[str]
    notes: str = ""


@router.post("/{campaign_id}/approve")
async def approve_emails(
    campaign_id: str,
    data: EmailApprovalRequest,
    db: AsyncSession = Depends(get_db),
):
    """Approve emails and start campaign"""
    campaign = await get_campaign(db, campaign_id)
    if not campaign:
        return {"error": "Campaign not found"}

    # Save approval to database (would need approval_status field)
    return {
        "campaign_id": campaign_id,
        "approved_count": len(data.approved_email_ids),
        "message": f"Campaign starting. {len(data.approved_email_ids)} emails approved.",
        "status": "active",
    }


@router.post("/{campaign_id}/regenerate")
async def regenerate_emails(
    campaign_id: str,
    num_samples: int = 3,
    db: AsyncSession = Depends(get_db),
):
    """Regenerate email samples for campaign"""
    campaign = await get_campaign(db, campaign_id)
    if not campaign:
        return {"error": "Campaign not found"}

    # Generate new email samples
    email_samples = await generate_email_samples(
        campaign_id=campaign_id,
        agent_id=campaign.agent_id,
        business_description=campaign.business_description,
        target_description=campaign.target_description,
        goal=campaign.goal,
        num_samples=num_samples,
    )

    emails = [
        EmailSample(
            id=f"email_{i}",
            subject=sample.get("subject", ""),
            body=sample.get("body", ""),
            to_person=sample.get("to_person", ""),
            to_company=sample.get("to_company", ""),
            personalization=sample.get("personalization", ""),
        )
        for i, sample in enumerate(email_samples)
    ]

    return {
        "campaign_id": campaign_id,
        "emails": emails,
        "message": f"Regenerated {num_samples} email samples.",
    }
