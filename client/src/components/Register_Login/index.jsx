import React from 'react';

import Login from './login';

const RegisterLogin = () => {
    return (
        <div className="login">
            <div className="log-wrapper">
                <div className="top">
                    <h1>LOGIN</h1>
                </div>
                <div className="wrapp">
                    <div className="col-12 box">
                        <Login/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterLogin;