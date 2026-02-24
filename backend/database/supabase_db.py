from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = None

async def init_db():
    global supabase
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("Warning: Supabase credentials not found in environment variables.")
        return
    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    print(f"Connected to Supabase at {SUPABASE_URL}")

def get_supabase():
    return supabase
