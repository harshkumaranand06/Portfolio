from pydantic import BaseModel
from typing import List, Optional

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

class Skill(BaseModel):
    category: str
    items: List[str]

class Project(BaseModel):
    title: str
    description: str
    tech_stack: List[str]
    link: Optional[str] = None

class ResumeData(BaseModel):
    name: str
    tagline: str
    about: str
    skills: List[Skill]
    projects: List[Project]
    contact: dict
