import React, { useState } from 'react'
import './index.scss'
import Logo from '../../assets/images/rapptr.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { validateEmail } from '../../utils/helpers';

const Login = () =>
{
    const [ formState, setFormState ] = useState( { email: '', password: '' } );

    const [ errorMessage, setErrorMessage ] = useState( '' );
    // const { email, password } = formState;

    const handleChange = ( e ) =>
    {
        if( e.target.name === 'email' ) {
            const isValid = validateEmail( e.target.value );

            if( !isValid ) {
                setErrorMessage( 'Not a valid email' )
            } else {
                    setErrorMessage( '' );
            }
        }
        if( !errorMessage ) {
            setFormState( { ...formState, [ e.target.name ]: e.target.value } );
        }
    };

    // const handleSubmit = ( e ) =>
    // {
    //     e.preventDefault();
    //     if( !errorMessage ) {
    //         setFormState( { [ e.target.name ]: e.target.value } );
    //         console.log( 'Form', formState );
    //     }
    // }

    return (
        <div className='login-container container'>
            <div className='login'>
                {/* company name */}
                <h1 className='login-title'>
                    <img className='logo-image' src={Logo} alt='rapptr logo' />
                    <span className='labs'> labs</span>
                </h1>
                {/* container to contain the input elements with independent styling */}
                <div className='input-container'>
                {/* email input container */}
                    <div className='email'>
                        <h2 className='email-label'>Email</h2>
                        <div className='input-box' style={{border:  errorMessage ? '2px solid #f20d17': '' }}>
                            <FontAwesomeIcon icon={faUser} color='#3a8ebc' />
                            <input type='email' name='email' onBlur={handleChange} placeholder='user@rapptrlabs.com' />
                        </div>
                        {/* error message */}
                        {errorMessage && (
                            <p className="error-text">{errorMessage}</p>
                        )}
                    </div>
                    {/* password input container */}
                    <div className='password'>
                        <h2 className='password-label'>Password</h2>
                        <div className='input-box'>
                            <FontAwesomeIcon icon={faLock} color='#3a8ebc' />
                            <input type='password' placeholder='Must be at least 4 characters' />
                        </div>
                    </div>
                    <button data-testid="button" type='submit' className='login-button'>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login