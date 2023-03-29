import React, { FC } from 'react';
import css from "./FilterButtons.module.scss";

//types
import { FilterButtonsProps } from '@/types/todos';

const FilterButtons: FC<FilterButtonsProps> = ({ completed, setCompleted }) => {
    return (
        <div className={css.filterButtonsWrapper}>
            <button
                className={completed === null ? css.active : ""}
                onClick={() => setCompleted(null)}
            >
                All Todos
            </button>
            <button
                className={completed === true ? css.active : ""}
                onClick={() => setCompleted(true)}
            >
                Completed Todos
            </button>
            <button
                className={completed === false ? css.active : ""}
                onClick={() => setCompleted(false)}
            >
                Uncompleted Todos
            </button>
        </div>
    )
}

export default FilterButtons;