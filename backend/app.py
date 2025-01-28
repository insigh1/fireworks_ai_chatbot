# File: backend/app.py
import os
import time
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fireworks.client import Fireworks
from databases import Database

# Read environment variables
FIREWORKS_API_KEY = os.getenv("FIREWORKS_API_KEY")
if not FIREWORKS_API_KEY:
    raise Exception("FIREWORKS_API_KEY not set.")

# Initialize Fireworks client
client = Fireworks(api_key=FIREWORKS_API_KEY)

# Database configuration (adjust user/password as needed)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@postgres:5432/fireworks_db")
database = Database(DATABASE_URL)

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """
    Accepts a user message and calls Fireworks AI's chat completions.
    """
    try:
        # Start timing
        start_time = time.perf_counter()

        # Fireworks API call
        response = client.chat.completions.create(
            model="accounts/fireworks/models/llama-v3p1-8b-instruct",
            messages=[{"role": "user", "content": request.message}],
        )

        # End timing
        end_time = time.perf_counter()
        duration_ms = (end_time - start_time) * 1000  # Convert to milliseconds

        print(f"API call duration: {duration_ms} ms")  # Debug log

        # Return both content and duration_ms
        return {
            "content": response.choices[0].message.content,
            "duration_ms": duration_ms,  # Add duration to the response
            "role": "assistant"  # Add role for clarity
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
