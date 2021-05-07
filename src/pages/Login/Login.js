import React, {Fragment, useState} from 'react';

import Card from '../../components/UI/Card/Card';
import classes from './Login.module.css';
import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';


const Login = (props) => {

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const onCloseErrorModalHandler = () => {
        setShowErrorModal(false)
        setErrorMessage('')
    }

    const onRequestErrorHandler = (errorMessage) => {
        console.log(errorMessage);
        setShowErrorModal(true)
        setErrorMessage(errorMessage)
    }

    return (
        <Fragment>
            {showErrorModal &&
            <ErrorModal onClose={onCloseErrorModalHandler} header={"Ooooops!"}>
                {errorMessage}
            </ErrorModal>}
            <Card className={classes.login}>
                <h1>Login</h1>
                <AuthForm isLoginMode onRequestError={onRequestErrorHandler}/>
            </Card>
        </Fragment>
    );
};

export default Login;
