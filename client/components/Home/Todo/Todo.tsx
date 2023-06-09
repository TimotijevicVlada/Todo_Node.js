import React, { FC, useMemo, useState } from 'react';
import css from "./Todo.module.scss";
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

//mui
import { Collapse } from "@mui/material";

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
import UplaodIcon from "svg/upload.svg";

//types
import { TodoProps, Todo, FinalDataProps } from '@/types/todos';

const Todo: FC<TodoProps> = ({ item, index, completed, search, type }) => {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const router = useRouter();
    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const isSingleTodo = useMemo(() => type === "singleTodo", [type]);

    const [mode, setMode] = useState("");
    const [dataToEdit, setDataToEdit] = useState({ title: "", description: "" })
    const [errors, setErrors] = useState({ title: false, description: false })
    const [file, setFile] = useState<any>(null);

    const { mutate: deleteTodo } = useMutation({
        mutationFn: (data: { _id: string }) => axios.delete(Routes.deleteTodo, { data }),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(["todos", completed, search], (oldQueryData: any) =>
                oldQueryData.filter((todo: Todo) => todo._id !== variables._id)
            )
            enqueueSnackbar("Todo deleted", {
                variant: "success",
                autoHideDuration: 3000
            });
            setMode("");
        }
    })

    const { mutate: completeTodo } = useMutation({
        mutationFn: (data: { _id: string, completed: boolean }) => axios.put(Routes.completeTodo, data),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(["todos", completed, search], (oldQueryData: any) =>
                oldQueryData.map((item: Todo) => {
                    if (item._id === variables._id) {
                        item.completed = variables.completed;
                        return item;
                    }
                    return item;
                })
            )

        }
    })

    const { mutate: editTodo } = useMutation({
        mutationFn: (data: FinalDataProps) => axios.put(Routes.updateTodo, data),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(["todos", completed, search], (oldQueryData: any) =>
                oldQueryData.map((item: Todo) => {
                    if (item._id === variables._id) {
                        item.title = variables.title;
                        item.description = variables.description;
                        if (variables.photo) {
                            item.photo = variables.photo
                            return item;
                        }
                        return item;
                    }
                    return item;
                })
            )
            enqueueSnackbar("Todo successfully edited", {
                variant: "success",
                autoHideDuration: 3000
            });
            setMode("");
            setFile(null);
        }
    })

    //Function to upload image to the local file "/images"
    const { mutate: uploadImage } = useMutation({
        mutationFn: (data: any) => axios.post(Routes.uploadImage, data),
    })

    const handleDelete = (id: string) => {
        const finalData = {
            _id: id
        }
        deleteTodo(finalData);
    }

    const handleComplete = () => {
        const finalData = {
            _id: item._id,
            completed: item.completed ? false : true
        }
        completeTodo(finalData);
    }

    const handleEdit = () => {
        if (checkErrors()) return;
        const finalData: FinalDataProps = {
            _id: item._id,
            title: dataToEdit.title.trim(),
            description: dataToEdit.description.trim()
        }
        if (file) {
            const data = new FormData();
            const filename = file.name;
            data.append("name", filename);
            data.append("file", file);
            finalData.photo = filename;
            uploadImage(data);
        }
        editTodo(finalData);
    }

    const checkErrors = () => {
        let tempErrors = {} as any;
        if (!dataToEdit.title) tempErrors = { ...tempErrors, title: true }
        if (!dataToEdit.description) tempErrors = { ...tempErrors, description: true }
        setErrors(tempErrors);
        return !!Object.values(tempErrors).length;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDataToEdit(prev => ({ ...prev, [e.target.name]: e.target.value }))
        if (e.target.name === "title" && e.target.value.trim()) setErrors(prev => ({ ...prev, title: false }))
        if (e.target.name === "description" && e.target.value.trim()) setErrors(prev => ({ ...prev, description: false }))
    }

    const handleRoute = () => {
        if (!isSingleTodo) {
            router.push(`todo/${item._id}`)
        }
    }

    return (
        <>
            <div className={`${css.container} ${isSingleTodo ? css.singleContainer : ""}`}>
                <div className={css.imageContainer}>
                    {file ?
                        <img src={URL.createObjectURL(file)} alt="image" />
                        :
                        item.photo ?
                            <img
                                src={baseUrl + item.photo}
                                alt="image"
                                onClick={handleRoute}
                            />
                            :
                            <label htmlFor={`uploadFile${index}`} className={css.uploadIcon}>
                                <UplaodIcon />
                            </label>
                    }
                    <input
                        type="file"
                        style={{ display: "none" }}
                        id={`uploadFile${index}`}
                        onChange={(e: any) => {
                            setFile(e.target.files[0])
                            setMode("edit")
                            setDataToEdit({ title: item.title, description: item.description })
                        }}
                    />
                </div>
                <div className={css.infoContainer}>
                    {mode === "edit" ?
                        <input
                            type="text"
                            name='title'
                            value={dataToEdit.title}
                            className={`${css.editTitleInput} ${errors.title ? css.error : ""}`}
                            onChange={handleChange}
                        />
                        :
                        <h4>{item.title}</h4>
                    }

                    <div className={css.description}>
                        {mode === "edit" ?
                            <textarea
                                name='description'
                                value={dataToEdit.description}
                                onChange={handleChange}
                                className={errors.description ? css.error : ""}
                            />
                            :
                            <p>{item.description}</p>
                        }

                    </div>
                    <div className={css.footer}>
                        <div className={css.actionButtonsWrapper}>
                            <div
                                className={css.deleteWrapper}
                                onClick={() => setMode("delete")}
                            >
                                <Delete />
                                Delete
                            </div>
                            <div
                                className={css.editWrapper}
                                onClick={() => {
                                    setMode("edit")
                                    setDataToEdit({ title: item.title, description: item.description })
                                }}
                            >
                                <Edit />
                                Edit
                            </div>
                        </div>
                        <div className={css.completed} onClick={handleComplete}>
                            <span>Completed</span>
                            {item.completed ?
                                <div className={css.checkedWrapper}
                                >
                                    <Checked />
                                </div>
                                :
                                <div className={css.uncheckedWrapper}
                                >
                                    <Unchecked />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Collapse in={mode !== ""}>
                <div className={css.actionButtons}>
                    <button onClick={() => {
                        setMode("")
                        setFile(null)
                    }}>
                        Cancel
                    </button>
                    {mode === "edit" ?
                        <button
                            className={css.confirmButton}
                            onClick={handleEdit}
                        >
                            Save
                        </button>
                        :
                        <button
                            className={css.confirmButton}
                            onClick={() => handleDelete(item._id)}
                        >
                            Delete
                        </button>
                    }
                </div>
            </Collapse>
        </>
    )
}

export default Todo;