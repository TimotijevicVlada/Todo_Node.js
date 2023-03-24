import React, { FC, useState, useEffect } from 'react';
import css from "./Todo.module.scss";

//assets
import Checked from "svg/checked.svg";
import Unchecked from "svg/unchecked.svg";
import Delete from "svg/delete.svg";
import Edit from "svg/edit.svg";

//types
import { TodoProps } from '@/types/todos';

const Todo: FC<TodoProps> = ({ item }) => {

    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        setCompleted(item.completed);
    }, [])

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
                        <div className={css.deleteWrapper}>
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