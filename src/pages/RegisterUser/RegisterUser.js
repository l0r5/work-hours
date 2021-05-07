import React, {Fragment, useState} from 'react';

import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import {useHistory} from 'react-router-dom';
import SuccessModal from '../../components/UI/SuccessModal/SuccessModal';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';


const RegisterUser = (props) => {

    const history = useHistory();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmittedFormHandler = (data) => {
        setSuccessMessage('Der neue Benutzer ' + data.email + ' wurde erfolgreich erstellt! ')
        setShowSuccessModal(true);
    };

    const onCloseModalHandler = () => {
        history.push('/');
    }

    const onRequestErrorHandler = (errorMessage) => {
        console.log(errorMessage);
        setErrorMessage(errorMessage)
        setShowErrorModal(true)
    }

    const onCloseErrorModalHandler = () => {
        setShowErrorModal(false)
        setErrorMessage('')
    }

    return (
        <Fragment>
            {showErrorModal &&
            <ErrorModal
                onClose={onCloseErrorModalHandler}
                header={"Ooooops!"}>
                {errorMessage}
            </ErrorModal>}
            {showSuccessModal && <SuccessModal
                onNext={onCloseModalHandler}
                header={"Erfolgreich"}>
                {successMessage}
            </SuccessModal>}
            <h2>Neuen Benutzer anlegen</h2>
            <AuthForm isLoginMode={false} onSubmitted={onSubmittedFormHandler}
                      onRequestError={onRequestErrorHandler}/>
        </Fragment>);
};

export default RegisterUser;