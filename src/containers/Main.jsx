import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import * as Realm from 'realm-web'
import { Audio } from 'react-loader-spinner'
import { nanoid } from "nanoid"
import FilterButton from '../components/FilterButton'
import Todo from '../components/Todo'
import Form from '../components/Form'

function Main() {

    const [filter, setFilter] = useState('All')
    const [tasks, setTasks] = useState(null)
    const [error, setError] = useState(null)
    const [fetchStatus, setFetchStatus] = useState('idle')   

    const fetchData = async () => {
        setFetchStatus("loading")
        // const REALM_APP_ID = "todos-xirtb"
        // const app = new Realm.App({ id: REALM_APP_ID });
        // const credentials = Realm.Credentials.anonymous();

        const API_URL = "http://localhost:3000/todos";

        try {
            // const user = await app.logIn(credentials);
            const RESPONSE = await fetch(API_URL)
            const allTodos = await RESPONSE.json()
            setTasks(await allTodos)
            setFetchStatus("success")
            console.log(allTodos)
        } catch (err) {
            setError(err)
            setFetchStatus("error")
            console.error(err);
        }
    }    

    useEffect(() => {
        fetchData()
        setFetchStatus("success")
    }, [])
   

    if (fetchStatus === 'idle' || fetchStatus === 'loading' || tasks === null) {
        return <div className='loading'>
            <Audio color="#00BFFF" height={160} width={160} ariaLabel='loading' />
        </div>
    }

    if (fetchStatus === error) {
        return <div className='loading loading-error'>
            <p className='loading-title loading-error-title'>Something went wrong!!</p>
        </div>
    }

    const FILTER_MAP = {
        All: () => true,
        Active: task => !task.completed,
        Completed: task => task.completed
    };

    const FILTER_NAMES = Object.keys(FILTER_MAP);

    function toggleTaskCompleted(id) {
        const updatedTasks = tasks && tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                return { ...task, completed: !task.completed }
            }
            return task;
        })
        setTasks(updatedTasks)
    }

    function resetTask() {
        const updatedTasks = tasks && tasks.filter(task => task.completed !== true)
        setTasks(updatedTasks)
    }

    function deleteTask(id) {
        const remainingTasks = tasks && tasks.filter(task => id !== task.id);
        setTasks(remainingTasks);
    }

    function editTask(id, newName) {
        const editedTasksList = tasks.map(task => {
            if (id === task.id) {
                return { ...task, name: newName }
            }
            return (task)
        })
        setTasks(editedTasksList)
    }

    const taskList = tasks && tasks
        .filter(FILTER_MAP[filter])
        .map((task, idx) => (
            <Todo
                key={task.id}
                id={task.id}
                index={idx}
                name={task.name}
                completed={task.completed}
                toggleTaskCompleted={toggleTaskCompleted}
                deleteTask={deleteTask}
                editTask={editTask}

            />
        ));

    const filterList = FILTER_NAMES.map(name => (
        <FilterButton
            key={name}
            name={name}
            isPressed={name === filter}
            setFilter={setFilter}
        />
    ));


    function addTask(name) {
        const newTask = {
            id: "todo-" + nanoid(),
            name: name,
            completed: false,
            key: "todo-" + nanoid()
        };
        setTasks([...tasks, newTask]);
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return
        const items = Array.from(tasks)
        const [reorderedItems] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItems)
        setTasks(items)
    }

    const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
    const headingTitle = `${taskList.length} ${tasksNoun} left`    
   
    return (
        <main className={`main`}>
            <Form addTask={addTask} />
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='tasks'>
                    {(provided) => (
                        <ul className='todo-list'
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {taskList}
                            {provided.placeholder}
                        </ul>

                    )}

                </Droppable>
            </DragDropContext>

            <div className='summary'>
                <p className='completed'>{headingTitle}</p>
                <div className='filters-container'>
                    {filterList}
                </div>
                <div className="container-btn-clear">
                    <button className='clear-items-btn' onClick={resetTask}>
                        Clear completed
                    </button>
                </div>
            </div>
            <div className="drag-and-drop">
                <p className='instructions'>
                    Drag and drop to reorder list
                </p>
            </div>

        </main>
    )
}

export default Main