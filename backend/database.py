from model import Todo
import os
import motor.motor_asyncio

MONGO_USERNAME = os.getenv("MONGO_USERNAME", "")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD", "")

client = motor.motor_asyncio.AsyncIOMotorClient(
        f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@mycluster.q60yvly.mongodb.net/"
)

database = client.TodoList
collection = database.todo

async def fetch_one_todo(title):
    document = await collection.find_one({"title": title})
    return document

async def fetch_all_todos():
    todos = []
    cursor = collection.find({})
    async for document in cursor:
        todos.append(Todo(**document))
    return todos

async def create_todo(todo):
    await collection.insert_one(todo)
    return todo

async def update_todo(title, desc):
    await collection.update_one({"title": title}, {"$set": {"description": desc}})
    document = await collection.find_one({"title": title})
    return document

async def remove_todo(title):
    await collection.delete_one({"title": title})
    return True

async def remove_all_todos():
    result = await collection.delete_many({})
    return result.deleted_count