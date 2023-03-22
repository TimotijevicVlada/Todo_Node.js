import React, { FC, useState, useEffect } from 'react';
import css from "./Todo.module.scss";

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
                    <div>Created: 14.8.2023</div>
                    <div className={css.completed}>
                        <span>Completed</span>
                        <input
                            type="checkbox"
                            checked={completed}
                            onChange={e => setCompleted(e.target.checked)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Todo;