import socket
import httpx
import asyncio

async def check_internet():
    print("Checking Internet Connectivity for OpenRouter...")
    
    # Check socket resolution
    hosts = ["google.com", "openrouter.ai"]
    for host in hosts:
        try:
            ip = socket.gethostbyname(host)
            print(f"DNS Resolution Successful: {host} -> {ip}")
        except Exception as e:
            print(f"DNS Resolution Failed for {host}: {e}")

    # Check HTTP request to OpenRouter
    url = "https://openrouter.ai/api/v1/chat/completions"
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get("https://openrouter.ai", timeout=10.0)
            print(f"HTTP GET to OpenRouter Successful: {resp.status_code}")
    except Exception as e:
        print(f"HTTP GET to OpenRouter Failed: {e}")

if __name__ == "__main__":
    asyncio.run(check_internet())
