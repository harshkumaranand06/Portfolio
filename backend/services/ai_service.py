import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

DEFAULT_MODEL = "llama-3.3-70b-versatile"

async def get_ai_response(user_message: str, resume_context: str):
    # Load env with override=True to pick up changes without a full OS process restart
    load_dotenv(override=True)
    key = os.getenv("GROQ_API_KEY")
    
    if not key:
        return "Error: Groq API key not found in environment variables."
    
    key = key.strip()
    # Masked key for debugging
    masked_key = f"{key[:6]}...{key[-4:]}"
    print(f"DEBUG: Using Groq API Key: {masked_key}")

    client = Groq(api_key=key)

    system_prompt = f"""
    You are a professional AI Portfolio Assistant. Your goal is to answer questions about the candidate based ONLY on the provided resume data.
    
    RESUME DATA:
    {resume_context}
    
    RULES:
    1. Answer ONLY using the information provided in the RESUME DATA.
    2. If the answer is not in the RESUME DATA, say: "This information is not in the resume."
    3. Do NOT hallucinate or make up any details.
    4. Be professional, concise, and helpful.
    """

    try:
        print(f"DEBUG: Calling Groq with model: {DEFAULT_MODEL}")
        completion = client.chat.completions.create(
            model=DEFAULT_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7,
            max_tokens=1024,
            stream=False
        )
        
        return completion.choices[0].message.content
    except Exception as e:
        print(f"Exception in get_ai_response: {e}")
        # Log to file for persistence
        with open("error_log.txt", "a") as f:
            f.write(f"\n--- Groq AI Error ---\n{str(e)}\n")
        return f"AI Error (Groq): {str(e)}"
