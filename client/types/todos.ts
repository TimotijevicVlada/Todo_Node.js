import { Dispatch, SetStateAction } from "react";

export interface Todo {
    _id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    completed: boolean;
    photo?: string;
}

export type TodosProps = Todo[];

export interface TodoProps {
    item: Todo;
    index?: number;
    completed?: null | boolean;
    search?: string;
    type?: string;
}

export interface CreateInputsProps {
    title: string;
    description: string;
    photo?: string;
}

export interface CreateTodoProps {
    setCreateInputs: Dispatch<SetStateAction<boolean>>
    completed: null | boolean;
    search: string;
}

export interface FinalDataProps {
    _id: string;
    title: string;
    description: string;
    photo?: string
}

export interface FilterButtonsProps {
    completed: null | boolean;
    setCompleted: Dispatch<SetStateAction<null | boolean>>;
}