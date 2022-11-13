import React from 'react'
import './index.scss'
import Logo from '../../assets/images/rapptr.png'

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
                        <input type='text' placeholder='user@rapptrlabs.com' />
                    </div>
                    <div className='password'>
                        <h2 className='password-label'>Password</h2>
                        <input  placeholder='Must be at least 4 characters'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login