import React, {Fragment, useContext, useState} from 'react';

import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import SuccessModal from '../../components/UI/SuccessModal/SuccessModal';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';
import AuthContext from '../../store/auth-context';
import UsersTable from '../../components/Tables/UsersTable/UsersTable';


const Administration = (props) => {
    const authCtx = useContext(AuthContext);

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [submittedData, setSubmittedData] = useState();

    const onSubmittedFormHandler = (data) => {
        setSubmittedData(data);
        setSuccessMessage('Der neue Benutzer ' + data.email + ' wurde erfolgreich erstellt! ')
        setShowSuccessModal(true);
    };

    const onNextSuccessModalHandler = () => {
        authCtx.login(submittedData.idToken, submittedData.expirationTime.toString());
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
                onNext={onNextSuccessModalHandler}
                header={"Erfolgreich"}>
                {successMessage}
            </SuccessModal>}
            <h2>Neuen Benutzer anlegen</h2>
            <AuthForm isLoginMode={false} onSubmitted={onSubmittedFormHandler}
                      onRequestError={onRequestErrorHandler}/>
            <UsersTable/>
        </Fragment>);
};

export default Administration;