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

//components
import Todo from './Todo/Todo';
import CreateTodo from './CreateTodo/CreateTodo';
import FilterButtons from './FilterButtons/FilterButtons';

const Home = () => {

    const [createInputs, setCreateInputs] = useState(false);
    const [completed, setCompleted] = useState<null | boolean>(null);

    const { data, isLoading, isError } = useQuery<TodosProps>(['todos', completed], async () => {
        const response = await axios.get(Routes.getTodos, { params: { completed: completed } },);
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
            <FilterButtons
                completed={completed}
                setCompleted={setCompleted}
            />
            <Collapse in={createInputs}>
                <CreateTodo
                    setCreateInputs={setCreateInputs}
                    completed={completed}
                />
            </Collapse>
            <div className={css.todosWrapper}>
                {data?.length === 0 ?
                    <div className={css.noTodos}>
                        No todos yet.
                    </div>
                    :
                    data?.map((item, index) => (
                        <Todo
                            key={index}
                            item={item}
                            index={index}
                            completed={completed}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Home;