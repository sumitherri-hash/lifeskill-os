import os
import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI


app = FastAPI(title="LifeSkill OS AI Engine")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise RuntimeError(
        "OPENAI_API_KEY environment variable is missing."
    )

client = OpenAI(api_key=api_key)


class LearningRequest(BaseModel):
    goal: str


@app.get("/")
def home():
    return {
        "name": "LifeSkill OS",
        "status": "AI Engine Online"
    }


@app.post("/experience")
def create_experience(request: LearningRequest):

    goal = request.goal.strip()

    if not goal:
        raise HTTPException(
            status_code=400,
            detail="Learning goal is required."
        )

    prompt = f"""
You are the Experience Engine of LifeSkill OS.

A learner wants to learn:

{goal}

Design a creative, age-appropriate learning experience.

Return ONLY valid JSON.

Use exactly this structure:

{{
  "subject": "string",
  "topic": "string",
  "difficulty": "beginner/intermediate/advanced",
  "learning_goal": "string",
  "experience_type": "string",
  "mission_title": "string",
  "mission": "string",
  "explanation": "string",
  "challenge": "string",
  "success_condition": "string",
  "next_step": "string"
}}

Rules:

- Make learning experiential, not lecture-based.
- Use simple language.
- Do not invent dangerous activities.
- The learner should understand the concept by doing something.
- Keep the first mission short enough for a prototype.
"""

    try:

        response = client.responses.create(
            model="gpt-5.6-luna",
            input=prompt
        )

        text = response.output_text.strip()

        # Remove accidental markdown fences.
        if text.startswith("```"):
            text = text.replace("```json", "")
            text = text.replace("```", "")
            text = text.strip()

        experience = json.loads(text)

        return {
            "success": True,
            "experience": experience
        }

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=502,
            detail="AI returned invalid experience data."
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )
