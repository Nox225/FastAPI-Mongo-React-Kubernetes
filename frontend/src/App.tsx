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

    const getAllTodos = useCallback(() => {
        axios.get('http://localhost:8000/api/todo')
            .then((res) => {
                setTodos(res.data);
        })
    }, []);

    useEffect(() => {
        getAllTodos();
    }, []);

    const addTodo = () => {
        axios.post('http://localhost:8000/api/todo', {
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
        axios.delete(`http://localhost:8000/api/todo/${title}`)
            .then(() => getAllTodos());
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
                        <div style={{display: 'flex', gap: '12px'}}>
                            <div key={index}>{todo.title}</div>
                            <div>-</div>
                            <div key={index}>{todo.description}</div>
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
        </>
    )
}

export default App
