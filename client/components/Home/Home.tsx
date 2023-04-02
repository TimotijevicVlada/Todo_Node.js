import React, { useState } from 'react';
import { Routes } from '@/api/routes';
import css from "./Home.module.scss";
import axios from 'axios';
import { debounce } from "lodash";

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
    const [search, setSearch] = useState("");

    const { data, isLoading, isError } = useQuery<TodosProps>(['todos', completed, search], async () => {
        const response = await axios.get(Routes.getTodos, {
            params: {
                completed: completed,
                title: search
            }
        },);
        return response.data;
    });

    const debounceSearch = debounce((e) => setSearch(e.target.value.trim()), 500);

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
            <input
                type="text"
                placeholder='Search by title'
                className={css.searchInput}
                onChange={debounceSearch}
            />
            <Collapse in={createInputs}>
                <CreateTodo
                    setCreateInputs={setCreateInputs}
                    completed={completed}
                    search={search}
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
                            search={search}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Home;