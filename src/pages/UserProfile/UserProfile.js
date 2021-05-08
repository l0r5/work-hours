import ProfileForm from '../../components/Forms/ProfileForm/ProfileForm';
import classes from './UserProfile.module.css';
import {useHistory} from 'react-router-dom';
import React, {Fragment, useContext, useState} from 'react';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';
import SuccessModal from '../../components/UI/SuccessModal/SuccessModal';
import AuthContext from '../../store/auth-context';

const UserProfile = () => {
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const onSubmittedFormHandler = (data) => {
        setSuccessMessage('Das Passwort von ' + data.email + ' wurde erfolgreich geändert! ')
        authCtx.login(data.idToken, data.expirationTime.toString());
        setShowSuccessModal(true);
    };

    const onNextSuccessModalHandler = () => {
        history.replace('/');
    }

    const onRequestErrorHandler = (errorMessage) => {
        console.log(errorMessage);

        setErrorMessage(errorMessage)
        setShowErrorModal(true)
    };

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
            <section className={classes.profile}>
                <h2>Your User Profile</h2>
                <ProfileForm onSubmitted={onSubmittedFormHandler}
                             onRequestError={onRequestErrorHandler}/>
            </section>
        </Fragment>
    );
};

export default UserProfile;