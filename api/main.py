from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient

DATABASE_URL = "mongodb+srv://tkfka:123@cluster0.zfqrsdd.mongodb.net/?retryWrites=true&w=majority"  # 로컬 MongoDB 주소
client = AsyncIOMotorClient(DATABASE_URL)
database = client.mydatabase  # 'mydatabase'라는 이름의 데이터베이스 사용
collection = database.texts  # 'texts'라는 이름의 컬렉션 사용

app = FastAPI()

class TextItem(BaseModel):
    title: str
    text: str

@app.post("/api/add-text")
async def add_text(item: TextItem):
    # MongoDB에 데이터 삽입
    result = await collection.insert_one(item.dict())
    
    # 삽입이 성공적으로 이루어졌는지 확인
    if result.inserted_id:
        return {"success": True, "message": "Data inserted successfully"}
    return {"success": False, "message": "Data insertion failed"}

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/files", response_model=List[str])
async def get_files():
    titles = await collection.distinct("title")
    return titles

@app.get("/api/text/{title}")
async def read_text(title: str):
    document = await collection.find_one({"title": title})
    if document:
        return {"text": document["text"]}
    return {"text": "파일을 찾을 수 없습니다."}

@app.delete("/api/text/{title}")
async def delete_text(title: str):
    result = await collection.delete_one({"title": title})
    
    # Check if any document was deleted
    if result.deleted_count:
        return {"success": True, "message": f"'{title}' deleted successfully"}
    return {"success": False, "message": f"Failed to delete '{title}' or '{title}' does not exist"}
