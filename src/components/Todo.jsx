import React, { useEffect, useState, useRef } from "react";
import { Draggable } from 'react-beautiful-dnd';
import Cross from '../imgs/icon-cross.svg'

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

function Todo(props) {
    const [isEditing, setEditing] = useState(false)
    const [newName, setNewName] = useState('')
    const editFieldRef = useRef(null)
    const editButtonRef = useRef(null)
    const wasEditing = usePrevious(isEditing)

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    const editingTemplate = (
        <form className={`todo-container`}
            onSubmit={handleSubmit}>
            <div className="form-group-edit">
                <label className="todo-label" htmlFor={props.id}>
                    {`New name for "${props.name}"`}
                </label>
                <input id={props.id}
                    className="todo-text"
                    type="text"
                    value={newName}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
            </div>
            <div className="container-group-edit">
                <button type="button"
                    className="btn todo-edit-cancel"
                    onClick={() => setEditing(false)}>
                    Cancel
                    <span className="sr-only">renaming {props.name}</span>
                </button>
                <button type="submit"
                    className="btn btn__primary todo-edit-save">
                    Save
                    <span className="sr-only">new name for {props.name}</span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className={`todo-container`}>
            <input id={props.id}
                type="checkbox"
                className="todo-item"
                defaultChecked={props.completed}
                onChange={() => props.toggleTaskCompleted(props.id)} />

            <label className={`todo-label ${props.completed ? 'line-through' : ""}`}
                htmlFor={props.id} >
                {props.name}
            </label>

            <button className={`btn-edit ${!props.completed ? "btn-hide" : ""}`}
                onClick={() => setEditing(true)}
                ref={editButtonRef}
            >
                Edit
            </button>

            <button className={`delete-btn ${!props.completed ? "btn-hide" : ""}`}
                onClick={() => props.deleteTask(props.id)}>
                <img src={Cross} alt="" />
                <span className="sr-only">Delete a task</span>
            </button>

        </div>

    )

    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus()
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus()
        }
    }, [wasEditing, isEditing])


    return (
        <Draggable key={props.id} draggableId={props.id} index={props.index}>
            {(provided) => (
                <li className='todo'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef} >
                    {isEditing ? editingTemplate : viewTemplate}
                </li>
            )}
        </Draggable>
    )
}

export default Todo
