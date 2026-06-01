"""
ICP (Ideal Customer Profile) Derivation Agent

Takes user input about their business and target market, and uses Claude to derive
an ideal customer profile with specific attributes.
"""

from pydantic import BaseModel
from anthropic import Anthropic

client = Anthropic()


class ICPProfile(BaseModel):
    job_titles: list[str]
    company_attributes: list[str]
    industry: str
    company_size: str
    location: str
    pain_points: list[str]
    buying_triggers: list[str]


async def derive_icp(
    business_description: str,
    target_description: str,
    goal: str,
) -> ICPProfile:
    """
    Uses Claude to analyze business, target, and goal inputs to derive an ICP.
    Returns structured profile with job titles, company attributes, industry, etc.
    """

    prompt = f"""
You are an expert at identifying Ideal Customer Profiles (ICPs).

Based on this information:
- Business: {business_description}
- Target: {target_description}
- Goal: {goal}

Derive a detailed ICP. Return a JSON object with:
- job_titles: Array of 3-5 job titles that would be decision makers
- company_attributes: Array of 4-5 company characteristics (size, growth stage, etc.)
- industry: Primary industry or vertical
- company_size: Company size range (e.g. "10-50", "50-500", "500+")
- location: Geographic focus if any
- pain_points: List of 4-5 key pain points this ICP has
- buying_triggers: List of 3-4 events or conditions that would trigger buying

Return ONLY valid JSON, no markdown or explanation.
"""

    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}],
    )

    # Parse the response
    import json

    response_text = message.content[0].text
    icp_data = json.loads(response_text)

    return ICPProfile(**icp_data)
