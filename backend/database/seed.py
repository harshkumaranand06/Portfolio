import asyncio
from models.schemas import ResumeData, Skill, Project
import os
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

async def seed_data():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("Error: Supabase credentials not found.")
        return
        
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    resume_data = {
        "type": "main",
        "name": "Harsh Kumar Anand",
        "tagline": "Full Stack Developer & AI Enthusiast",
        "about": "Bachelor of Engineering - Information Technology student at JSS Academy of Technical Education Bangalore. Independent software developer with a track record of delivering production applications (AI, e-commerce, music streaming) serving 12,500+ combined users with 99% uptime. Expert in MERN stack, AI integration, and Offline-First PWA architectures.",
        "skills": [
            {"category": "Languages", "items": ["Java", "JavaScript", "TypeScript", "C++", "Python", "HTML5", "CSS3"]},
            {"category": "Frontend", "items": ["React 19", "Next.js 14", "Tailwind CSS", "Framer Motion", "Vite 7"]},
            {"category": "Backend", "items": ["Node.js 20", "Express.js 5", "REST APIs", "Service Workers", "PWA"]},
            {"category": "Database", "items": ["MongoDB", "MySQL", "IndexedDB", "Supabase"]},
            {"category": "Tools", "items": ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Cloudinary", "Clerk Auth", "Leaflet"]}
        ],
        "projects": [
            {
                "title": "Krishi - AI Agriculture Platform",
                "description": "Architected AI-powered crop diagnosis system processing 500+ images daily with 92% accuracy across 15 disease types. Reduced diagnosis time from 24 hours to 3 seconds.",
                "tech_stack": ["React", "Node.js", "Express", "MongoDB", "Computer Vision", "Framer Motion"],
                "link": "https://github.com/harshkumaranand06"
            },
            {
                "title": "DukaanXpress - E-Commerce Platform",
                "description": "Scaled MERN marketplace to 1,200+ products and 100+ vendors. Cut image load times by 65% using Cloudinary CDN. Boosted mobile conversion by 28%.",
                "tech_stack": ["React", "Node.js", "Express", "MongoDB", "Clerk", "Cloudinary", "Leaflet"],
                "link": "https://github.com/harshkumaranand06"
            },
            {
                "title": "Retro Swar - Music Streaming PWA",
                "description": "Launched PWA with 100+ Hindi songs serving 1,000+ users with 50MB offline cache. Optimized service worker caching for 95% instant playback.",
                "tech_stack": ["React", "Vite", "Service Workers", "IndexedDB", "Clerk", "Express"],
                "link": "https://github.com/harshkumaranand06"
            }
        ],
        "contact": {
            "email": "harshbabu06@gmail.com",
            "linkedin": "www.linkedin.com/in/harsh-kumar-anand-1b014a26a",
            "github": "github.com/harshkumaranand06"
        }
    }

    response = supabase.table("resume").upsert(resume_data, on_conflict="type").execute()
    print("Database seeded successfully with Harsh Kumar Anand's data!")

if __name__ == "__main__":
    asyncio.run(seed_data())
