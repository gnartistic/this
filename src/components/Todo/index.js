import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react'
import Loader from 'react-loaders'
import Task from './Task'
import './index.scss'
import TaskForm from './TaskForm';
import { useNavigate } from "react-router-dom";

const Todo = () =>
{
    const [ search, setSearch ] = useState( {
        query: '',
        list: []
    } );

    const [ task, setTask ] = useState( "" );
    const [ tasks, setTasks ] = useState( [] );
    const [ nwTask, setNwTask ] = useState( '' );
    const navigate = useNavigate();

    // function to navigate back to login. My logout button isn't properly functioning due to a server error I have yet to  resolve... keyword YET 💪🏼
    const navigateToLogin = () =>
    {
        navigate( '/' );
    }

    // using this react hook to esure the tasks are up to date. If AND when they exist, they will be used as the Tasks state so that they can be rendered on page
    useEffect( () =>
    {
        if( localStorage.getItem( "localTasks" ) ) {
            const storedList = JSON.parse( localStorage.getItem( "localTasks" ) );
            setTasks( storedList );
        }
    }, [] )

    // adds new task to array in local storage called 'localTasks', pencil button and new button functionality
    const addTask = ( e ) =>
    {
        if( task ) {
            // decided to give them uniqure ids to be a lil fancy
            const newTask = { id: new Date().getTime().toString(), title: task };
            setTasks( [ ...tasks, newTask ] );
            localStorage.setItem( "localTasks", JSON.stringify( [ ...tasks, newTask ] ) );

            // sets states back to default so all conditional rendering and functiions work accordingly
            setTask( "" );
            setNwTask( '' );
        }
    };

    // deletes the task stored in local storage under 'localTasks', trashcan button functionality
    const handleDelete = ( task ) =>
    {
        const deleted = tasks.filter( ( t ) => t.id !== task.id );
        setTasks( deleted );
        localStorage.setItem( "localTasks", JSON.stringify( deleted ) )
    }

    const handleChange = ( e ) =>
    {
        const results = tasks.filter( task =>
        {
            if( e.target.value === "" ) return tasks
            return task.title.toLowerCase().includes( e.target.value.toLowerCase() )
        } )
        setSearch( {
            query: e.target.value,
            list: results
        } )
    }

    return (
        <>        <div className='tasks'>
            {/* button will navigate back to login page, but unfortunately it does not actually 'log out' 🥲 */}
            <button className='logout-button container' onClick={navigateToLogin}>Logout</button>
            <div className='task-page'>
                <h1>To-Do List</h1>
                <div className='task-container'>
                    <div className='task-header'>

                        {/* search bar 🔎 */}
                        <div className='searchbar'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} color="#0b141d" />
                            <input className='search' type='search' name='search'
                                onChange={handleChange} value={search.query} placeholder='search' />
                        </div>

                        <button className='new-button' onClick={() =>
                        {
                            // when button is clicked it will trigger the new task form to render through the nwTask state
                            setNwTask( 'true' );

                            //  when button is clicked again, it will remove the new task form
                            if( nwTask === 'true' ) {
                                setNwTask( '' );
                            }
                        }}>New</button>
                    </div>
                    {/* renders new task form if new button is clicked, also renders tasks underneath */}
                    <div className='task-body'>

                        {/* if there's a new task, render new task form */}
                        {nwTask === 'true' && <TaskForm task={task} addTask={addTask} setTask={setTask} />}

                        {/* if there's any tasks, they will be rendered here, also have to pass handleDelete function and nwTask state to 'edit' existing tasks... more info in component.*/}
                        {!search.query && tasks.map( ( task, index ) => <Task task={task} key={index} setNwTask={setNwTask} handleDelete={handleDelete} nwTask={nwTask} /> )}

                        {search.query && search.list.map( ( task, index ) =>
                            <Task task={task} key={index} setNwTask={setNwTask} handleDelete={handleDelete} nwTask={nwTask} />
                        )}
                        {/* server error message */}
                        <div className='search-error'>
                            {( search.query === '' ? "" : !search.list.length ? "Your search did not return any results" : search.list.map( post =>
                            {
                                return <p key={task.title}>{task.title}</p>
                            } ) )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <Loader type="line-scale-pulse-out-rapid" />
        </>

    )
}

export default Todo