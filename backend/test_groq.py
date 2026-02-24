import os
from dotenv import load_dotenv
from groq import Groq

def test_groq():
    load_dotenv(override=True)
    key = os.getenv("GROQ_API_KEY")
    if not key:
        print("Error: GROQ_API_KEY not found in .env")
        return

    print(f"Testing Groq key: {key[:6]}...{key[-4:]}")
    client = Groq(api_key=key)

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": "hi"}],
            temperature=0.7,
            max_tokens=100
        )
        print("SUCCESS! Groq Response:")
        print(completion.choices[0].message.content)
    except Exception as e:
        print(f"FAILED: {e}")

if __name__ == "__main__":
    test_groq()
