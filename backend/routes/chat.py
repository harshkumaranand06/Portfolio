from fastapi import APIRouter, HTTPException
from backend.models.schemas import ChatRequest, ChatResponse
from backend.services.ai_service import get_ai_response
from backend.database.supabase_db import get_supabase
import json

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    supabase = get_supabase()
    # Fetch resume data from Supabase
    response = supabase.table("resume").select("*").eq("type", "main").single().execute()
    
    if not response.data:
        resume_context = "No resume data available yet."
    else:
        resume_data = response.data
        # Context for the AI
        resume_context = json.dumps(resume_data, indent=2)
    
    reply = await get_ai_response(request.message, resume_context)
    return ChatResponse(reply=reply)
