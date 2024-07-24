import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

interface Todo {
    title: string;
    description: string;
}

function App() {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    // const [img, setImg] = useState(new Image());

    const getAllTodos = useCallback(() => {
        axios.get('/api/todo')
            .then((res) => {
                setTodos(res.data);
        })
    }, []);

    useEffect(() => {
        getAllTodos();
    }, []);

    // console.log(img);
    

    const addTodo = () => {
        axios.post('/api/todo', {
            title: title,
            description: desc
        })
        .then(() => {
            getAllTodos();
            setTitle('');
            setDesc('');
        })
    }

    const deleteTodo = (title: string) => {
        axios.delete(`/api/todo/${title}`)
            .then(() => getAllTodos());
    }

    const deleteAllTodos = () => {
        axios.delete(`/api/todo`)
            .then(() => setTodos([]));
    }

    return (
        <>
            <input 
                type="text" 
                placeholder="Title" 
                onChange={(e) => { setTitle(e.target.value)}} 
            />
            <input 
                type="text" 
                placeholder="Description" 
                onChange={(e) => setDesc(e.target.value)} 
            />
            <button onClick={() => { addTodo() }}>Add</button>
            <>
                {todos.map((todo, index) => {
                    return(
                        <div style={{display: 'flex', gap: '12px'}} key={index}>
                            <div>{todo.title}</div>
                            <div>-</div>
                            <div>{todo.description}</div>
                            <div 
                                style={{color: 'red'}} 
                                onClick={() => { deleteTodo(todo.title) }}
                            >
                                Delete
                            </div>
                        </div>
                    )
                })}
            </>
            <button onClick={() => { deleteAllTodos() }}>Delete all</button>
            {/* <img src='http://localhost:8000/api/img' alt="" content='image/gif' /> */}
        </>
    )
}

export default App
