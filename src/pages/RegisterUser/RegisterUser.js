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

    const onSubmittedFormHandler = () => {
        setShowSuccessModal(true);
    };

    const onCloseModalHandler = () => {
        history.push('/');
    }

    const onRequestErrorHandler = (errorMessage) => {
        console.log(errorMessage);
        setShowErrorModal(true)
        setErrorMessage(errorMessage)
    }

    const onCloseErrorModalHandler = () => {
        setShowErrorModal(false)
        setErrorMessage('')
    }

    return <Fragment>
        {showErrorModal &&
        <ErrorModal onClose={onCloseErrorModalHandler} header={"Ooooops!"}>
            {errorMessage}
        </ErrorModal>}
        {showSuccessModal && <SuccessModal
            onNext={onCloseModalHandler}
            header={"Erfolgreich!"}>
            Der neue Benutzer wurde erfolgreich erstellt!
        </SuccessModal>}
        <AuthForm isLoginMode={false} onSubmitted={onSubmittedFormHandler}
                  onRequestError={onRequestErrorHandler}/>
    </Fragment>;
};

export default RegisterUser;