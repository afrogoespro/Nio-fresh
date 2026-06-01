"""
Email Generation Agent

Takes campaign details and generates personalized cold emails that follow
NIO copy rules: no spam language, personalized, real research-based, and
written in the user's voice.
"""

from anthropic import Anthropic

client = Anthropic()


async def generate_email_samples(
    campaign_id: str,
    agent_id: str,
    business_description: str,
    target_description: str,
    goal: str,
    num_samples: int = 3,
) -> list[dict]:
    """
    Generates sample cold emails for a campaign.
    Returns list of emails with subject, body, recipient info, and personalization note.
    """

    # Define agent personality prompts
    agent_prompts = {
        "sally": "casual, energetic, creative. Use conversational language, occasional emojis (sparingly). Fresh energy.",
        "david": "professional, polished, strategic. Corporate tone, industry jargon, confident authority.",
        "jessica": "direct, no-nonsense, efficient. Extremely concise, no filler, straight to the ask.",
        "hans": "friendly, warm, real. Like a friend reaching out. Relatable, genuine, human.",
        "custom": "user-trained voice from the onboarding conversation",
    }

    agent_vibe = agent_prompts.get(agent_id, "professional and personalized")

    prompt = f"""
You are an expert cold email copywriter. Generate {num_samples} sample personalized cold emails.

Campaign Context:
- Business: {business_description}
- Target: {target_description}
- Goal: {goal}
- Agent Voice: {agent_vibe}

For each email, provide:
1. A specific recipient (name and company) - make it realistic
2. A personalization fact based on the target description
3. A subject line (short, specific, no clickbait)
4. Email body (short, personalized, real value proposition)

Email Rules:
- NO spam language (no "I wanted to reach out", "just checking in", "per my last email")
- MUST include specific personalization based on research
- Keep it short (3-5 sentences max)
- Focus on THEIR problem and your solution
- No templates or generic openers
- Sound authentic and like a real person
- Each email should be different

Return JSON array of {{
  "subject": "...",
  "body": "...",
  "to_person": "John Smith",
  "to_company": "TechCorp Inc",
  "personalization": "they recently raised Series B funding"
}}

Return ONLY valid JSON array, no markdown or explanation.
"""

    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=2048,
        messages=[{"role": "user", "content": prompt}],
    )

    # Parse the response
    import json

    response_text = message.content[0].text
    emails = json.loads(response_text)

    return emails
