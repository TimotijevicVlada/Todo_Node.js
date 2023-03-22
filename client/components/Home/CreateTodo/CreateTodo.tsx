import React, { FC, useState, ChangeEvent } from 'react';
import css from "./CreateTodo.module.scss";
import axios from 'axios';
import { Routes } from '@/api/routes';

//react query
import { useMutation, useQueryClient } from 'react-query';

//types
import { CreateInputsProps, CreateTodoProps } from '@/types/todos';

const CreateTodo: FC<CreateTodoProps> = ({ setCreateInputs }) => {

    const queryClient = useQueryClient();

    const [inputs, setInputs] = useState<CreateInputsProps>({ title: "", description: "" })

    const { mutate: createTodo } = useMutation({
        mutationFn: (data: CreateInputsProps) => axios.post(Routes.createTodo, data),
        onSuccess: (data, id) => {
            queryClient.setQueryData("todos", (oldQueryData: any) =>
                [...oldQueryData, data.data]
            );
            setCreateInputs(false);
            setInputs({ title: "", description: "" });
        },
        onError: (data) => {
            console.error(data)
        }
    })

    const handleSubmit = () => {
        if (!inputs.title || !inputs.description) return;
        createTodo(inputs);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <div className={css.createContainer}>
            <input
                type="text"
                name="title"
                value={inputs.title}
                placeholder='Write your title'
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder='Write description'
                value={inputs.description}
                onChange={handleChange}
            />
            <div className={css.createButtonWrapper}>
                <button className={css.cancel} onClick={() => setCreateInputs(false)}>
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