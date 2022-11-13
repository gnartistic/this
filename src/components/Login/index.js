import React from 'react'
import './index.scss'
import Logo from '../../assets/images/rapptr.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

const Login = () =>
{
    return (
        <div className='login-container container'>
            <div className='login'>
                {/* company name */}
                <img className='logo-image' src={Logo} alt='rapptr logo' />
                {/* container to contain the input elements with independent styling */}
                <div className='input-container'>
                    <div className='email'>
                        <h2 className='email-label'>Email</h2>
                        <div className='input-box'>
                            <FontAwesomeIcon icon={faUser} color='#0b141d' />
                            <input type='text' placeholder='user@rapptrlabs.com' />
                        </div>
                    </div>
                    <div className='password'>
                        <h2 className='password-label'>Password</h2>
                        <div className='input-box'>
                            <FontAwesomeIcon icon={faLock} color='#0b141d' />
                            <input type='password' placeholder='Must be at least 4 characters' />
                            </div>
                    </div>
                    <button type='submit' className='login-button'>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login