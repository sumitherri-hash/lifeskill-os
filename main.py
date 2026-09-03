import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI(title="LifeSkill OS AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class ExperienceRequest(BaseModel):
    goal: str


@app.get("/")
def home():
    return {
        "status": "online",
        "service": "LifeSkill OS AI"
    }


@app.post("/experience")
def create_experience(request: ExperienceRequest):

    if not os.getenv("OPENAI_API_KEY"):
        raise HTTPException(
            status_code=500,
            detail="OPENAI_API_KEY is not configured on the server."
        )

    try:
        response = client.responses.create(
            model="gpt-5-mini",
            input=[
                {
                    "role": "system",
                    "content": (
                        "You are the AI experience designer for LifeSkill OS. "
                        "Turn the user's learning goal into an immersive, "
                        "interactive real-world simulation. "
                        "Return practical scenario information only. "
                        "Do not claim that text alone creates actual VR."
                    )
                },
                {
                    "role": "user",
                    "content": request.goal
                }
            ]
        )

        return {
            "success": True,
            "goal": request.goal,
            "experience": response.output_text
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )
