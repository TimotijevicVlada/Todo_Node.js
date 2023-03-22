import React, { useState } from 'react';
import { Routes } from '@/api/routes';
import css from "./Home.module.scss";
import axios from 'axios';

//mui
import { Collapse } from "@mui/material";

//types
import { TodosProps } from '@/types/todos';

//react query
import { useQuery } from 'react-query';
import Todo from './Todo/Todo';
import CreateTodo from './CreateTodo/CreateTodo';

const Home = () => {

    const [createInputs, setCreateInputs] = useState(false);

    const { data, isLoading, isError } = useQuery<TodosProps>(['todos'], async () => {
        const response = await axios.get(Routes.getTodos);
        return response.data;
    });

    if (isLoading) {
        return (
            <div className={css.loading}>Loading...</div>
        )
    }

    if (isError) {
        return (
            <div className={css.error}>Something went wrong</div>
        )
    }

    return (
        <div className={css.container}>
            <button
                className={css.createNew}
                onClick={() => setCreateInputs(true)}
            >
                Create new todo
            </button>
            <Collapse in={createInputs}>
                <CreateTodo
                    setCreateInputs={setCreateInputs}
                />
            </Collapse>
            {data?.map((item, index) => (
                <Todo
                    key={index}
                    item={item}
                />
            ))}
        </div>
    )
}

export default Home;