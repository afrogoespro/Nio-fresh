"""
Voice/Chat Agent

Conducts a multi-turn conversation with the user to learn their voice,
business context, target market, and communication style.
"""

from anthropic import Anthropic

client = Anthropic()

# System prompt for the voice training conversation
VOICE_TRAINING_SYSTEM = """You are a friendly AI assistant helping someone set up their cold email outreach.

Your job is to have a natural conversation to understand:
1. Their business (what they do, what they sell)
2. Their target customer (who they want to reach)
3. Their voice (how they naturally communicate)
4. Their outreach goals (what they want to achieve)

Be conversational, warm, and genuinely interested. Ask follow-up questions.
Keep responses short and focused (2-3 sentences max).
When you have enough information, confirm what you understand and suggest moving to the next step.

After 4-5 turns of conversation about each topic, move to the next topic.
"""

# Step-specific prompts
STEP_PROMPTS = {
    1: "Ask about their business - what they do, who they help, their products/services.",
    2: "Ask about their target customer - industries, company sizes, job titles, pain points.",
    3: "Ask about their communication style - how they naturally talk, their tone, values.",
    4: "Ask about their outreach goals - what success looks like, how many meetings, what timeframe.",
}


async def voice_chat(
    agent_id: str,
    step: int,
    user_input: str,
    conversation_history: list[dict],
) -> dict:
    """
    Conducts a single turn of the voice training conversation.
    Returns the agent's response and any extracted campaign data.
    """

    # Build conversation messages for Claude
    messages = [
        {"role": msg["role"], "content": msg["content"]}
        for msg in conversation_history
    ]

    # Add current user input
    messages.append({"role": "user", "content": user_input})

    # Get response from Claude
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=256,
        system=VOICE_TRAINING_SYSTEM + f"\n\nCurrent step ({step}/4): {STEP_PROMPTS.get(step, '')}",
        messages=messages,
    )

    assistant_response = response.content[0].text

    return {
        "response": assistant_response,
        "step": step,
        "campaign_id": f"campaign_{step}",  # In real implementation, would create campaign in DB
    }


async def extract_voice_profile(conversation_history: list[dict]) -> dict:
    """
    After conversation is complete, analyze it to extract a voice profile.
    Returns personality, tone, example phrases, etc.
    """

    # Create a summary prompt
    conversation_text = "\n".join(
        [f"{msg['role'].upper()}: {msg['content']}" for msg in conversation_history]
    )

    prompt = f"""
Based on this conversation, analyze the user's communication style and voice.

Conversation:
{conversation_text}

Return JSON with:
- personality: One-sentence description of their communication style
- tone: Key words describing their tone (e.g. "friendly, direct, professional")
- examples: List of 3-4 phrases or patterns they used naturally
- brand_voice: Summary of how they should sound in cold emails

Return ONLY valid JSON, no markdown.
"""

    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=512,
        messages=[{"role": "user", "content": prompt}],
    )

    import json

    response_text = response.content[0].text
    profile = json.loads(response_text)

    return profile
