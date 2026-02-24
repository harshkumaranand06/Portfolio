import os
import sys
from dotenv import load_dotenv

# Load env from root
load_dotenv()

# Ensure the root is in sys.path
root_dir = os.path.dirname(os.path.abspath(__file__))
if root_dir not in sys.path:
    sys.path.append(root_dir)

# Import app using absolute package path
try:
    from backend.main import app
except ImportError as e:
    print(f"Error importing backend.main: {e}")
    # Fallback to absolute relative import if necessary
    sys.path.append(os.path.join(root_dir, 'backend'))
    from main import app

if __name__ == "__main__":
    import uvicorn
    # Use environment PORT for Render
    port = int(os.getenv("PORT", 8005))
    print(f"Production Entry Point: Starting server on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
