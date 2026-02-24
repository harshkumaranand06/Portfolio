import os
import sys
from dotenv import load_dotenv

# Load env from root
load_dotenv()

# Add the backend directory to sys.path FIRST
backend_path = os.path.join(os.path.dirname(__file__), 'backend')
if backend_path not in sys.path:
    # Adding to the front of sys.path ensures local imports are found first
    sys.path.insert(0, backend_path)

# Import the actual FastAPI app using local name
try:
    from main import app
except ImportError as e:
    print(f"Error importing main from backend: {e}")
    # Fallback attempt
    from backend.main import app

if __name__ == "__main__":
    import uvicorn
    # Use environment PORT for Render
    port = int(os.getenv("PORT", 8005))
    print(f"Production Entry Point: Starting server on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
