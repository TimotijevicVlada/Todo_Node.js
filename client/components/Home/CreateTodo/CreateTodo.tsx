import React, { FC, useState, ChangeEvent } from 'react';
import css from "./CreateTodo.module.scss";
import { useSnackbar } from 'notistack';

//assets
import UplaodIcon from "svg/upload.svg";
import Delete from "svg/delete.svg";

//api
import axios from 'axios';
import { Routes } from '@/api/routes';

//react query
import { useMutation, useQueryClient } from 'react-query';

//types
import { CreateInputsProps, CreateTodoProps } from '@/types/todos';

const CreateTodo: FC<CreateTodoProps> = ({ setCreateInputs }) => {

    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();

    const [inputs, setInputs] = useState<CreateInputsProps>({ title: "", description: "" })
    const [error, setError] = useState({ title: false, description: false })
    const [file, setFile] = useState<any>(null)

    const { mutate: createTodo } = useMutation({
        mutationFn: (data: CreateInputsProps) => axios.post(Routes.createTodo, data),
        onSuccess: (data, id) => {
            queryClient.setQueryData("todos", (oldQueryData: any) =>
                [...oldQueryData, data.data]
            );
            setCreateInputs(false);
            setInputs({ title: "", description: "" });
            setFile(null);
            enqueueSnackbar("Todo successfully created", {
                variant: "success",
                autoHideDuration: 3000
            });
        },
        onError: (data) => {
            console.error(data)
        }
    })

    const { mutate: uploadImage } = useMutation({
        mutationFn: (data: any) => axios.post(Routes.uploadImage, data),
    })

    const handleSubmit = () => {
        if (!inputs.title.trim()) setError(prev => ({ ...prev, title: true }));
        if (!inputs.description.trim()) setError(prev => ({ ...prev, description: true }));
        if (!inputs.title.trim() || !inputs.description.trim()) return;
        const finalData: CreateInputsProps = {
            title: inputs.title,
            description: inputs.description
        }
        if (file) {
            const data = new FormData();
            const filename = file.name;   // Unique name => const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            finalData.photo = filename;
            uploadImage(data);
        }
        createTodo(finalData);
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
            <div className={css.formContainer}>
                <div className={css.uploadContainer}>
                    {file ?
                        //URL.createObjectURL is used to create a temporary URL for a file object in the browser, 
                        //and it's typically used when you want to display an image that was selected by 
                        //the user using an <input type="file" /> element.
                        <img src={URL.createObjectURL(file)} alt="image" />
                        :
                        <label htmlFor="fileInput">
                            <UplaodIcon />
                        </label>
                    }
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e: any) => setFile(e.target.files[0])}
                    />
                    {file &&
                        <div className={css.deleteIcon} onClick={() => setFile(null)}>
                            <Delete />
                        </div>
                    }
                </div>
                <div className={css.inputsContainer}>
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
                </div>
            </div>
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