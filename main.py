import sys
import os
from dotenv import load_dotenv

# Ensure environment variables are loaded from the root
load_dotenv()

# Add the backend directory to sys.path to allow imports to work correctly on Render
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
if backend_path not in sys.path:
    sys.path.append(backend_path)

# Import the actual FastAPI app from the backend folder
try:
    from backend.main import app
except ImportError:
    # Fallback for if it's already in the path
    from main import app

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8005))
    uvicorn.run(app, host="0.0.0.0", port=port)
