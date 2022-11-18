import React from 'react'
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons';

const Task = ({handleDelete, task, setNwTask, nwTask}) =>
{
    // task component
    return (
        <div className='task'>
            {/* renders dynamic task title */}
            <p className='task-text'>{task.title}</p>
            <div className='button-container'>
                {/* here's where my 'edit' magic comes from. I understand that local storage doesn't allow me to update items in my array, so I have to delete them and add a new one in its place. I know this isnt 100%, but it does the bare minimum for now. */}
                <button className='edit-button' onClick={() =>
                {
                    // deleted task
                    handleDelete( task );
                    // when you click the button, it renders the task form to add a new one in it's place.
                    setNwTask( 'true' );
            }}>
                <FontAwesomeIcon icon={faPencil} color='#0b141d' size='lg'/>
                </button>
                {/* when the button is clicked no más task, muy bueno */}
            <button className='delete-button' onClick ={()=> handleDelete(task)}>
                <FontAwesomeIcon icon={faTrashCan} color='#0b141d' size='lg'/>
            </button>
                </div>
        </div>
    )
}

export default Task