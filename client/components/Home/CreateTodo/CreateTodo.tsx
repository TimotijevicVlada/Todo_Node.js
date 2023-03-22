import React, { FC, useState, ChangeEvent } from 'react';
import css from "./CreateTodo.module.scss";
import axios from 'axios';
import { Routes } from '@/api/routes';
import { useSnackbar } from 'notistack';

//react query
import { useMutation, useQueryClient } from 'react-query';

//types
import { CreateInputsProps, CreateTodoProps } from '@/types/todos';

const CreateTodo: FC<CreateTodoProps> = ({ setCreateInputs }) => {

    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const [inputs, setInputs] = useState<CreateInputsProps>({ title: "", description: "" })
    const [error, setError] = useState({ title: false, description: false })

    const { mutate: createTodo } = useMutation({
        mutationFn: (data: CreateInputsProps) => axios.post(Routes.createTodo, data),
        onSuccess: (data, id) => {
            queryClient.setQueryData("todos", (oldQueryData: any) =>
                [...oldQueryData, data.data]
            );
            setCreateInputs(false);
            setInputs({ title: "", description: "" });
            enqueueSnackbar("Todo successfully created", {
                variant: "success",
                autoHideDuration: 3000
            });
        },
        onError: (data) => {
            console.error(data)
        }
    })

    const handleSubmit = () => {
        if (!inputs.title.trim()) setError(prev => ({ ...prev, title: true }));
        if (!inputs.description.trim()) setError(prev => ({ ...prev, description: true }));
        if (!inputs.title.trim() || !inputs.description.trim()) return;
        createTodo(inputs);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (e.target.name === "title" && e.target.value.trim()) {
            setError(prev => ({ ...prev, title: false }))
        }
        if (e.target.name === "description" && e.target.value.trim()) {
            setError(prev => ({ ...prev, description: false }))
        }
    }

    const handleCancel = () => {
        setCreateInputs(false);
        setInputs({ title: "", description: "" });
        setError({ title: false, description: false });
    }

    return (
        <div className={css.createContainer}>
            <input
                type="text"
                name="title"
                value={inputs.title}
                placeholder='Write your title'
                onChange={handleChange}
                className={error.title ? css.error : ""}
            />
            <textarea
                name="description"
                placeholder='Write description'
                value={inputs.description}
                onChange={handleChange}
                className={error.description ? css.error : ""}
            />
            <div className={css.createButtonWrapper}>
                <button className={css.cancel} onClick={handleCancel}>
                    Cancel
                </button>
                <button className={css.create} onClick={handleSubmit}>
                    Create
                </button>
            </div>
        </div>
    )
}

export default CreateTodo;