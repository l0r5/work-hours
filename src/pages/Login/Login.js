import React from 'react';

import Card from '../../components/UI/Card/Card';
import classes from './Login.module.css';
import AuthForm from '../../components/Forms/AuthForm/AuthForm';


const Login = (props) => {

    return (
        <Card className={classes.login}>
            <h1>Login</h1>
            <AuthForm isLoginMode/>
        </Card>
    );
};

export default Login;
