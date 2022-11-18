import React from 'react'
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons';

const TaskForm = ( { setTask, task, addTask, handleReplace } ) =>
{
// captures information for new task
    return (
        <form className='task-edit' onSubmit={addTask}>
            <input
                autoFocus
                name="task"
                type="text"
                value={task}
                maxLength={25}
                placeholder='Add task...'
                className="task-input"
                onChange={( e ) => setTask( e.target.value )}
            />
            <div className='button-container'>
                <button className='save-button' type='submit'>
                    <FontAwesomeIcon icon={faSave} color='#0b141d' size='lg' />
                </button>
            </div>
        </form>
    )
}

export default TaskForm