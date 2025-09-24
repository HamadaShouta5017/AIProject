from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
import openai
import os

app = FastAPI()
templates = Jinja2Templates(directory="app/templates")

@app.get("/", response_class=HTMLResponse)
async def get_chat(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/chat")
async def post_chat(request: Request):
    data = await request.json()
    messages = data.get("messages")  # ← ここでhistory全体を取得
    client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    response = client.chat.completions.create(
        model="gpt-4o",  # ←ご希望のモデルに
        messages=messages
    )
    reply = response.choices[0].message.content.strip()
    return JSONResponse({"reply": reply})