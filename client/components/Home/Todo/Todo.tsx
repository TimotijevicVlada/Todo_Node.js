import React, { FC, useState, useEffect } from 'react';
import css from "./Todo.module.scss";
import { useSnackbar } from 'notistack';

//api
import axios from 'axios';
import { Routes } from '@/api/routes';

//react query
import { useMutation, useQueryClient } from 'react-query';

//assets
import Checked from "svg/checked.svg";
import Unchecked from "svg/unchecked.svg";
import Delete from "svg/delete.svg";
import Edit from "svg/edit.svg";

//types
import { TodoProps, Todo } from '@/types/todos';

const Todo: FC<TodoProps> = ({ item }) => {

    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        setCompleted(item.completed);
    }, [])

    const { mutate: deleteTodo } = useMutation({
        mutationFn: (data: { _id: string }) => axios.delete(Routes.deleteTodo, { data }),
        onSuccess: (data, variables) => {
            queryClient.setQueryData("todos", (oldQueryData: any) =>
                oldQueryData.filter((todo: Todo) => todo._id !== variables._id)
            )
            enqueueSnackbar("Todo deleted", {
                variant: "success",
                autoHideDuration: 3000
            });
        }
    })

    const handleDelete = (id: string) => {
        const finalData = {
            _id: id
        }
        deleteTodo(finalData);
    }

    return (
        <div className={css.container}>
            <div className={css.imageContainer}>
                image.jpg
            </div>
            <div className={css.infoContainer}>
                <h4>{item.title}</h4>
                <div className={css.description}>
                    <p>{item.description}</p>
                </div>
                <div className={css.footer}>
                    <div className={css.actionButtonsWrapper}>
                        <div
                            className={css.deleteWrapper}
                            onClick={() => handleDelete(item._id)}
                        >
                            <Delete />
                            Delete
                        </div>
                        <div className={css.editWrapper}>
                            <Edit />
                            Edit
                        </div>
                    </div>
                    <div className={css.completed}>
                        <span>Completed</span>
                        {completed ?
                            <div
                                className={css.checkedWrapper}
                                onClick={() => setCompleted(false)}
                            >
                                <Checked />
                            </div>
                            :
                            <div
                                className={css.uncheckedWrapper}
                                onClick={() => setCompleted(true)}
                            >
                                <Unchecked />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo;