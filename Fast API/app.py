from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ESP32_BASE_URL = "http://192.168.130.232:8080/servo"

@app.get("/open-gate")
async def open_gate():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{ESP32_BASE_URL}?angle=0")
        if response.status_code == 200:
            return {"message": "Gate opened successfully"}
        raise HTTPException(status_code=500, detail="Failed to open gate")

@app.get("/close-gate")
async def close_gate():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{ESP32_BASE_URL}?angle=90")
        if response.status_code == 200:
            return {"message": "Gate closed successfully"}
        raise HTTPException(status_code=500, detail="Failed to close gate")
    
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")