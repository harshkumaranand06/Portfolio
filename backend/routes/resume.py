from fastapi import APIRouter, HTTPException
from models.schemas import ResumeData
from database.supabase_db import get_supabase

router = APIRouter()

@router.get("/", response_model=ResumeData)
async def get_resume():
    supabase = get_supabase()
    response = supabase.table("resume").select("*").eq("type", "main").single().execute()
    
    if not response.data:
        raise HTTPException(status_code=404, detail="Resume data not found")
    return response.data

@router.post("/")
async def update_resume(data: ResumeData):
    supabase = get_supabase()
    # Store or update the resume in Supabase
    # .upsert() uses the primary key or unique constraint to update if exists
    resume_dict = data.dict()
    resume_dict["type"] = "main"
    
    response = supabase.table("resume").upsert(resume_dict, on_conflict="type").execute()
    
    if hasattr(response, 'error') and response.error:
        raise HTTPException(status_code=500, detail=str(response.error))
        
    return {"message": "Resume updated successfully"}
