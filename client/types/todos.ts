import { Dispatch, SetStateAction } from "react";

interface Todo {
    _id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    completed: boolean;
}

export type TodosProps = Todo[];

export interface TodoProps {
    item: Todo;
}

export interface CreateInputsProps {
    title: string;
    description: string;
}

export interface CreateTodoProps {
    setCreateInputs: Dispatch<SetStateAction<boolean>>
}