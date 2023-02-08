import React, { useState, useEffect, useRef } from 'react'

function Form(props) {
    const [name, setName] = useState("")
    const inputEl = useRef(null)
    const handleChange = (evt) => {
        setName(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        props.addTask(name)
        setName("")
    }

    const handleFocus = (evt) => {
        const target = evt.target
        target.parentNode.classList.add('active')
    }

    const handleBlur = (evt) => {
        const target = evt.target
        if (!target.value) {
            target.parentNode.classList.remove('active');
        }
    }

    useEffect(() => {
        inputEl.current.value.trim("") !== "" ?
            inputEl.current.parentNode.classList.add('active') :
            inputEl.current.parentNode.classList.remove('active')
    }, [])

    return (
        <form onSubmit={handleSubmit} className={`form`}>
            <div className="search-container">
                <label htmlFor='new-todo'
                    className='lbl-new-todo'>
                    Create a new task...
                </label>
                <input type="text"
                    name="text"
                    id='new-todo'
                    className='new-todo'
                    autoComplete='off'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={name}
                    ref={inputEl}
                    onChange={handleChange} />
                <button type="submit" className='btn btn-submit'
                >
                    <span className='sr-only'>add</span>
                </button>
            </div>
        </form>
    )
}

export default Form