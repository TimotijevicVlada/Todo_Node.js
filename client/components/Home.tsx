import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes } from '@/api/routes';

interface TodosProps {
    _id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
}

const Home = () => {

    const [todos, setTodos] = useState<TodosProps[]>([])

    const fetchTodos = async () => {
        try {
            const response = await axios.get(Routes.getTodos);
            console.log("RESPONSE", response)
            setTodos(response.data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            {todos.map((item, index) => (
                <div key={index}>
                    {item.title}
                </div>
            ))}
        </div>
    )
}

export default Home;