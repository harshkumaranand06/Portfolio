from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from backend.routes import chat, resume
from backend.database.supabase_db import init_db
import os
import uvicorn
from dotenv import load_dotenv

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    print("Starting up: Initializing database...")
    await init_db()
    yield
    # Shutdown logic (if any)
    print("Shutting down...")

app = FastAPI(title="AI Portfolio API", lifespan=lifespan)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AI Portfolio API is running"}

app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(resume.router, prefix="/api/resume", tags=["resume"])

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8005))
    print(f"Server is starting on port {port}...")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
