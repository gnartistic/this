import React, { useState } from 'react'
import Loader from 'react-loaders'
import { useNavigate } from "react-router-dom";
import './index.scss'
import Logo from '../../assets/images/rapptr.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { validateEmail } from '../../utils/helpers';
import axios from "axios";

const Login = () =>
{
    // form input default state
    const [ formState, setFormState ] = useState( { email: '', password: '' } );
    const { email, password } = formState;

    // validation error initial states
    const [ emailErrMsg, setEmailErrMsg ] = useState( '' );
    const [ serverErrMsg, setServerErrMsg ] = useState( '' );
    const [ pwdErrMsg, setPwdErrMsg ] = useState( '' );

    // password validation state
    const [ validPassword, setValidPassword ] = useState( '' );

    // function to navigate to my todo list component since my log in doesnt work :(
    const navigate = useNavigate();
    const navigateToDo = () =>
    {
        navigate( '/todo' );
    }

    // function to handle the login form submission
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
                setPwdErrMsg( 'Not a valid password' );
            } else {
                setValidPassword( 'true' );
                setPwdErrMsg( '' );
            }
        }

        if( !emailErrMsg || validPassword ) {
            setFormState( { ...formState, [ e.target.name ]: e.target.value } );
        }
    };



    return (
        <>
            <div>
                {/* if you click this button it will navigate you to my todo list page since I havent resolved the login server issue */}
                <button className='todo-button' onClick={navigateToDo} >Todo page </button>
                <div className='login-container container'>
                    <form className='login' onSubmit={handleSubmit}>
                        <h1 className='login-title'>
                            <img className='logo-image' src={Logo} alt='rapptr logo' />
                            <span className='labs'> labs</span>
                        </h1>
                        {/* container to contain the input elements */}
                        <div className='input-container'>
                            {/* email input container */}
                            <div className='email'>
                                <h2 className='email-label'>Email</h2>
                                {/* conditional styling based on validation error */}
                                <div className='input-box' style={{ border: emailErrMsg ? '2px solid #f20d17' : '' }}>
                                    <FontAwesomeIcon icon={faUser} color='#3a8ebc' />
                                    <input
                                        type='email'
                                        name='email'
                                        maxLength={50}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                        defaultValue={email}
                                        placeholder='user@rapptrlabs.com' />
                                </div>
                                {/* email error message */}
                                {emailErrMsg && (
                                    <p className="error-text">{emailErrMsg}</p>
                                )}
                            </div>
                            {/* password input container */}
                            <div className='password'>
                                <h2 className='password-label'>Password</h2>
                                {/* conditional styling based on validation error */}
                                <div className='input-box' style={{ border: pwdErrMsg ? '2px solid #f20d17' : '' }}>
                                    <FontAwesomeIcon icon={faLock} color='#3a8ebc' />
                                    <input
                                        type='password'
                                        name='password'
                                        maxLength={16}
                                        onChange={handleChange}
                                        onBlur={handleChange}
                                        defaultValue={password}
                                        placeholder='Must be at least 4 characters' />
                                </div>
                                {/* password error message */}
                                {pwdErrMsg && (
                                    <p className="error-text">{pwdErrMsg}</p>
                                )}
                            </div>

                            {/* login button, disabled if inputs do not pass all verification */}
                            <button
                                data-testid="button"
                                disabled={!password || !email || !validPassword}
                                type='submit'
                                className='login-button'>
                                Login
                            </button>

                            {/* server error message */}
                            {serverErrMsg && (
                                <p className='error-text2'>{serverErrMsg}</p>
                            )}
                        </div>
                    </form>
                </div >
            </div>
            <Loader type="line-scale-pulse-out-rapid" />
        </>
    )
}

export default Login