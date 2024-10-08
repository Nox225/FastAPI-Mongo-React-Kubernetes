from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

from database import *

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/api/todo")
async def get_todo():
    response = await fetch_all_todos()
    return response
    

@app.get("/api/todo/{title}", response_model=Todo)
async def get_todo_by_title(title):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(status_code=404, detail="Todo not found")

@app.post("/api/todo", response_model=Todo)
async def post_todo(todo: Todo):
    response = await create_todo(todo.model_dump())
    if response:
        return response
    raise HTTPException(status_code=400, detail="Error creating todo")

@app.put("/api/todo/{title}", response_model=Todo)
async def put_todo(title: str, desc: str):
    response = await update_todo(title, desc)
    if response:
        return response
    raise HTTPException(status_code=400, detail="Error updating todo")

@app.delete("/api/todo/{title}")
async def delete_todo(title):
    response = await remove_todo(title)
    if response:
        return {"message": "Todo deleted successfully"}
    raise HTTPException(status_code=400, detail="Error deleting todo")

@app.delete("/api/todo")
async def delete_all_todos():
    try:
        response = await remove_all_todos()
        return {"message": f"All todos deleted successfully. Deleted count: {response}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error deleting all todos")
