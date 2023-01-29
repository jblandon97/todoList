import React from 'react'

function FilterButton(props) {
    return (

        <div className='filter-group'>
            < input type="radio"
                name="rbt"
                className='filter-button'
                id={props.name}
                value={props.name}
                defaultChecked={props.isPressed}
                onChange={() => props.setFilter(props.name)} />
            <label htmlFor={props.name} className='label-filters'>
                {props.name}
            </label>
        </div>

    )
}

export default FilterButton
