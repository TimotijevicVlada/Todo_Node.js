import React from 'react';
import { useRouter } from 'next/router';
import css from "./[id].module.scss";

//assets
import ExitIcon from "../../svg/exit.svg";

//api
import axios from 'axios';
import { Routes } from '@/api/routes';
import { useQuery } from 'react-query';

//components
import Todo from '@/components/Home/Todo/Todo';

const SingleTodoPage = () => {

    const router = useRouter();

    const getSingleTodo = async ({ queryKey }: any) => {
        const id = queryKey[1];
        const response = await axios.get(Routes.getSingleTodo, {
            params: {
                _id: id
            }
        })
        return response.data;
    }

    const { data: todo, isLoading, isError } = useQuery(["todo", router.query.id], getSingleTodo);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (isError) {
        return (
            <div>Something went wrong</div>
        )
    }

    return (
        <div className={css.container}>
            <div className={css.header}>
                <h1>Welcome to single Todo page</h1>
                <button onClick={() => router.back()}>
                    <ExitIcon /> Go back
                </button>
            </div>
            <Todo
                item={todo}
                type="singleTodo"
            />
        </div>
    )
}

export default SingleTodoPage;