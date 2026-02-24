import httpx
import asyncio
import os
from dotenv import load_dotenv

async def test_key():
    load_dotenv(override=True)
    key = os.getenv("OPENROUTER_API_KEY")
    if not key:
        print("Error: OPENROUTER_API_KEY not found in .env")
        return

    key = key.strip()
    print(f"Testing key: {key[:6]}...{key[-4:]}")
    
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",
        "X-Title": "Portfolio-App"
    }

    models_to_test = [
        "mistralai/mistral-7b-instruct",
        "mistralai/mistral-7b-instruct:free",
        "openrouter/auto"
    ]
    
    async with httpx.AsyncClient() as client:
        for model in models_to_test:
            print(f"\n--- Testing model: {model} ---")
            payload = {
                "model": model,
                "messages": [{"role": "user", "content": "hi"}]
            }
            try:
                response = await client.post(url, headers=headers, json=payload, timeout=10.0)
                print(f"Status: {response.status_code}")
                if response.status_code == 200:
                    print(f"SUCCESS! Response: {response.json()['choices'][0]['message']['content']}")
                    break # Found a working one
                else:
                    print(f"FAILED: {response.text}")
            except Exception as e:
                print(f"Error testing {model}: {e}")

if __name__ == "__main__":
    asyncio.run(test_key())
