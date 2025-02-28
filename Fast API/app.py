from fastapi import FastAPI, HTTPException
import httpx

app = FastAPI()

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
