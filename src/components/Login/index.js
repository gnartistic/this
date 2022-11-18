import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './index.scss'
import Logo from '../../assets/images/rapptr.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { validateEmail } from '../../utils/helpers';
import axios from "axios";

const Login = () =>
{
    const [ formState, setFormState ] = useState( { email: '', password: '' } );

    const [ emailErrMsg, setEmailErrMsg ] = useState( '' );
    const { email, password } = formState;
    const [ serverErrMsg, setServerErrMsg ] = useState( '' );
    const [ validPassword, setValidPassword ] = useState( '' );
    const navigate = useNavigate();

    const navigateToDo = () =>
    {
        navigate( '/todo' );
    }

    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://dev.rapptrlabs.com/Tests/scripts/user-login.php',
                JSON.stringify( { email: email, password: password } ),
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
        } catch( err ) {
            if( !err?.response ) {
                setServerErrMsg( "The server could not be reached. Please try again later." );
            }
        }
    }

    // function to handle input change. contains email validation and password verification
    const handleChange = ( e ) =>
    {
        if( e.target.name === 'email' ) {
            const isEmailValid = validateEmail( e.target.value );

            if( !isEmailValid ) {
                setEmailErrMsg( 'Not a valid email' )
            } else {
                setEmailErrMsg( '' );
            }
        }

        if( e.target.name === 'password' ) {
            const isPasswordValid = e.target.value.length > 4;

            if( !isPasswordValid ) {
                setValidPassword( '' );
            } else {
                setValidPassword( 'true' );
            }
        }

        if( !emailErrMsg || validPassword ) {
            setFormState( { ...formState, [ e.target.name ]: e.target.value } );
        }
    };



    return (
        <div>
            <button className='todo-button' onClick={navigateToDo} >Todo page </button>
            <div className='login-container container'>
                <form className='login' onSubmit={handleSubmit}
                >
                    <h1 className='login-title'>
                        <img className='logo-image' src={Logo} alt='rapptr logo' />
                        <span className='labs'> labs</span>
                    </h1>
                    {/* container to contain the input elements with independent styling */}
                    <div className='input-container'>
                        {/* email input container */}
                        <div className='email'>
                            <h2 className='email-label'>Email</h2>
                            <div className='input-box' style={{ border: emailErrMsg ? '2px solid #f20d17' : '' }}>
                                <FontAwesomeIcon icon={faUser} color='#3a8ebc' />
                                <input
                                    type='email'
                                    name='email'
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    defaultValue={email}
                                    placeholder='user@rapptrlabs.com' />
                            </div>
                            {/* error message */}
                            {emailErrMsg && (
                                <p className="error-text">{emailErrMsg}</p>
                            )}
                        </div>
                        {/* password input container */}
                        <div className='password'>
                            <h2 className='password-label'>Password</h2>
                            <div className='input-box'>
                                <FontAwesomeIcon icon={faLock} color='#3a8ebc' />
                                <input
                                    type='password'
                                    name='password'
                                    onChange={handleChange}
                                    defaultValue={password}
                                    placeholder='Must be at least 4 characters' />
                            </div>
                        </div>

                        {/* login button */}
                        <button
                            data-testid="button"
                            disabled={!password || !email || !validPassword}
                            type='submit'
                            className='login-button'>
                            Login
                        </button>

                        {/* server error message, if any */}
                        {serverErrMsg && (
                            <p className='error-text2'>{serverErrMsg}</p>
                        )}
                    </div>
                </form>
            </div >
        </div>
    )
}

export default Login