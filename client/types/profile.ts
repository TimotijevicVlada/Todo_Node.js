import { SetStateAction } from "jotai";
import { Dispatch } from "react";

export interface UserProps {
    createdAt: string;
    updatedAt: string;
    email: string;
    username: string;
    password?: string;
    profilePicture: string;
    _id: string;
}

export interface EditFormProps {
    editData: null | UserProps;
    setEditData: Dispatch<SetStateAction<null | UserProps>>;
}