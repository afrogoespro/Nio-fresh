from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from db.session import get_db
from db.queries import create_campaign

router = APIRouter(prefix="/agents", tags=["agents"])


# Agent definitions
AGENTS = [
    {
        "id": "sally",
        "name": "Sally",
        "age": "25",
        "role": "Marketing Creative",
        "description": "Casual, energetic, and fresh. Great for startups and creative industries.",
        "vibe": "casual & energetic",
        "avatar_url": "/agents/sally.jpg",
        "personality": "Uses casual language, emojis (sparingly), conversational tone, energy"
    },
    {
        "id": "david",
        "name": "David",
        "age": "35",
        "role": "SDR Veteran",
        "description": "Polished, professional, strategic. Built for B2B and enterprise outreach.",
        "vibe": "corporate & polished",
        "avatar_url": "/agents/david.jpg",
        "personality": "Structured, professional phrasing, industry-aware language, confident"
    },
    {
        "id": "jessica",
        "name": "Jessica",
        "age": "47",
        "role": "Communications Expert",
        "description": "Direct, real, efficient. Gets to the point and gets stuff done. No fluff.",
        "vibe": "direct & no-nonsense",
        "avatar_url": "/agents/jessica.jpg",
        "personality": "Extremely concise, no filler words, direct ask, no small talk"
    },
    {
        "id": "hans",
        "name": "Hans",
        "age": None,
        "role": "Friendly Realist",
        "description": "Talks like a friend. Warm, honest, real. Cold outreach that feels genuine.",
        "vibe": "friendly & real",
        "avatar_url": "/agents/hans.jpg",
        "personality": "Warm, personal, relatable, might reference something human/relatable"
    },
]


class Agent(BaseModel):
    id: str
    name: str
    age: str | None
    role: str
    description: str
    vibe: str
    avatar_url: str


class AgentListResponse(BaseModel):
    agents: list[Agent]
    build_your_own: Agent


class CreateCampaignRequest(BaseModel):
    user_id: str
    agent_id: str
    business_description: str
    target_description: str
    goal: str
    tone: str


class CreateCampaignResponse(BaseModel):
    campaign_id: str
    agent: Agent
    message: str


@router.get("/", response_model=AgentListResponse)
async def list_agents():
    """List all available agents + Build Your Own option"""
    build_your_own = Agent(
        id="custom",
        name="Build Your Own",
        age=None,
        role="Custom Agent",
        description="Train an agent on your voice, your style, your personality. Make a copy of yourself.",
        vibe="your voice, your rules",
        avatar_url="/agents/custom.jpg",
    )

    return AgentListResponse(
        agents=[Agent(**agent) for agent in AGENTS],
        build_your_own=build_your_own,
    )


@router.post("/select", response_model=CreateCampaignResponse)
async def select_agent(data: CreateCampaignRequest, db: AsyncSession = Depends(get_db)):
    """Create a campaign with selected agent"""
    # Create campaign in database
    campaign = await create_campaign(
        db,
        user_id=data.user_id,
        agent_id=data.agent_id,
        business_description=data.business_description,
        target_description=data.target_description,
        goal=data.goal,
        tone=data.tone,
    )

    # Find the selected agent
    selected_agent = None
    if data.agent_id == "custom":
        selected_agent = {
            "id": "custom",
            "name": "Your Custom Agent",
            "age": None,
            "role": "Custom",
            "description": "Training...",
            "vibe": "your voice",
            "avatar_url": "/agents/custom.jpg",
        }
    else:
        selected_agent = next((a for a in AGENTS if a["id"] == data.agent_id), None)

    return CreateCampaignResponse(
        campaign_id=str(campaign.id),
        agent=Agent(**selected_agent) if selected_agent else None,
        message=f"Campaign created. Let's train {selected_agent['name'] if selected_agent else 'your agent'}.",
    )
