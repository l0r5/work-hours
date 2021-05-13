import React, {Fragment, useContext, useState} from 'react';

import Card from '../../components/UI/Card/Card';
import classes from './Login.module.css';
import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';
import AuthContext from '../../store/auth-context';


const Login = (props) => {
    const authCtx = useContext(AuthContext);

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const onCloseErrorModalHandler = () => {
        setShowErrorModal(false)
        setErrorMessage('')
    }

    const onRequestErrorHandler = (errorMessage) => {
        console.log(errorMessage);
        setErrorMessage(errorMessage)
        setShowErrorModal(true)
    }

    const onSubmittedFormHandler = (data) => {
        authCtx.login(data.email, data.idToken, data.expirationTime.toString());
    }

    return (
        <Fragment>
            {showErrorModal &&
            <ErrorModal onClose={onCloseErrorModalHandler} header={"Ooooops!"}>
                {errorMessage}
            </ErrorModal>}
            <Card className={classes.login}>
                <h1>Login</h1>
                <AuthForm isLoginMode onRequestError={onRequestErrorHandler}
                          onSubmitted={onSubmittedFormHandler}/>
            </Card>
        </Fragment>
    );
};

export default Login;
