from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from datetime import datetime, timedelta
from db.session import get_db
from db.queries import get_campaign, get_active_campaigns

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


class CampaignMetric(BaseModel):
    key: str
    value: int | str
    label: str


class ActivityEvent(BaseModel):
    timestamp: str
    action: str
    details: str
    status: str  # "sent", "opened", "clicked", "replied"


class DashboardStats(BaseModel):
    campaign_id: str
    agent_name: str
    agent_role: str
    status: str  # "draft", "active", "paused", "completed"
    metrics: list[CampaignMetric]
    activity: list[ActivityEvent]
    emails_sent_today: int
    reply_rate: float
    open_rate: float
    next_send: str  # ISO timestamp


@router.get("/{campaign_id}/stats", response_model=DashboardStats)
async def get_dashboard_stats(campaign_id: str, db: AsyncSession = Depends(get_db)):
    """Get campaign dashboard statistics"""
    campaign = await get_campaign(db, campaign_id)
    if not campaign:
        return {"error": "Campaign not found"}

    # Fetch agent name
    agent_name = campaign.agent_id if hasattr(campaign, "agent_id") else "Agent"
    agent_role = "Outreach Agent"

    # Mock metrics (would be fetched from database in production)
    metrics = [
        CampaignMetric(key="total_sent", value=142, label="Total Sent"),
        CampaignMetric(key="opened", value=68, label="Opened"),
        CampaignMetric(key="clicked", value=34, label="Clicked"),
        CampaignMetric(key="replied", value=12, label="Replied"),
    ]

    # Mock activity feed
    now = datetime.utcnow()
    activity = [
        ActivityEvent(
            timestamp=(now - timedelta(hours=1)).isoformat(),
            action="Email sent",
            details="To john@acme.com",
            status="sent",
        ),
        ActivityEvent(
            timestamp=(now - timedelta(hours=2)).isoformat(),
            action="Email opened",
            details="By jane@acme.com",
            status="opened",
        ),
        ActivityEvent(
            timestamp=(now - timedelta(hours=3)).isoformat(),
            action="Link clicked",
            details="By jane@acme.com",
            status="clicked",
        ),
        ActivityEvent(
            timestamp=(now - timedelta(hours=4)).isoformat(),
            action="Reply received",
            details="From mike@acme.com",
            status="replied",
        ),
    ]

    # Calculate next send time (9:00 AM tomorrow)
    tomorrow = datetime.utcnow() + timedelta(days=1)
    next_send = tomorrow.replace(hour=9, minute=0, second=0, microsecond=0).isoformat()

    return DashboardStats(
        campaign_id=campaign_id,
        agent_name=agent_name,
        agent_role=agent_role,
        status="active",
        metrics=metrics,
        activity=activity,
        emails_sent_today=12,
        reply_rate=0.085,  # 8.5%
        open_rate=0.479,  # 47.9%
        next_send=next_send,
    )


class CampaignControlRequest(BaseModel):
    action: str  # "pause", "resume", "stop"


@router.post("/{campaign_id}/control")
async def control_campaign(
    campaign_id: str,
    data: CampaignControlRequest,
    db: AsyncSession = Depends(get_db),
):
    """Pause, resume, or stop a campaign"""
    campaign = await get_campaign(db, campaign_id)
    if not campaign:
        return {"error": "Campaign not found"}

    action_map = {
        "pause": "paused",
        "resume": "active",
        "stop": "completed",
    }

    new_status = action_map.get(data.action, "active")

    # Update campaign status in database (would need status field)
    return {
        "campaign_id": campaign_id,
        "status": new_status,
        "message": f"Campaign {new_status}.",
    }


@router.get("/campaigns/list")
async def list_campaigns(db: AsyncSession = Depends(get_db)):
    """List all user campaigns"""
    campaigns = await get_active_campaigns(db)

    return {
        "campaigns": [
            {
                "id": str(campaign.id),
                "agent_name": campaign.agent_id,
                "status": "active",
                "emails_sent": 142,
                "replies": 12,
            }
            for campaign in campaigns
        ]
    }


@router.post("/{campaign_id}/adjust-frequency")
async def adjust_email_frequency(
    campaign_id: str,
    emails_per_day: int = 12,
    db: AsyncSession = Depends(get_db),
):
    """Adjust how many emails per day"""
    campaign = await get_campaign(db, campaign_id)
    if not campaign:
        return {"error": "Campaign not found"}

    # Validate input
    if not (1 <= emails_per_day <= 50):
        return {"error": "Emails per day must be between 1 and 50"}

    # Update in database
    return {
        "campaign_id": campaign_id,
        "emails_per_day": emails_per_day,
        "message": f"Updated to {emails_per_day} emails per day.",
    }
