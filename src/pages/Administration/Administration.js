import React, {Fragment, useEffect, useState} from 'react';

import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import SuccessModal from '../../components/UI/SuccessModal/SuccessModal';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';
import UsersTable from '../../components/Tables/UsersTable/UsersTable';
import {REST_GET} from '../../consts/consts';
import useDbCall from '../../hooks/use-db-call';
import Spinner from '../../components/UI/Spinner/Spinner';
import Modal from '../../components/UI/Modal/Modal';


const Administration = (props) => {
    const {makeDbRequest} = useDbCall();

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [showEditUserModal, setShowEditUserModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [submittedData, setSubmittedData] = useState();

    useEffect(() => {
        fetchUsers().catch(error => {
            setIsLoading(false);
            // setHttpError(error.message)
            throw error;
        });
    }, [submittedData]);

    const fetchUsers = async () => {
        setIsLoading(true);

        const response = await makeDbRequest('users.json', REST_GET, null);

        if (!response.ok) {
            onRequestErrorHandler('Failed fetching user data.')
            console.log('Failed fetching user data.' + response)
        }

        const responseData = await response.json();

        let loadedUsers = [];

        for (const key in responseData) {
            loadedUsers.push({
                id: responseData[key].id,
                email: responseData[key].email,
                role: responseData[key].role,
                dbKey: key
            })
        }
        console.log(loadedUsers)
        setUsers(loadedUsers);
        setIsLoading(false);
        console.log("Fetched Users from Database.")
    };

    const onSubmittedFormHandler = (data) => {
        setSubmittedData(data);
        setSuccessMessage('Der neue Benutzer ' + data.email + ' wurde erfolgreich erstellt! ')
        setShowSuccessModal(true);
    };

    const onContinueSuccessModalHandler = () => {
        setShowSuccessModal(false)
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

    const onCloseEditUserHandler = () => {
        setShowEditUserModal(false)
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
                onContinue={onContinueSuccessModalHandler}
                header={"Erfolgreich"}>
                {successMessage}
            </SuccessModal>}
            {showEditUserModal && <Modal
                onClose={onCloseEditUserHandler}>
                My Modal
            </Modal>}
            <h2>Neuen Benutzer anlegen</h2>
            <AuthForm isLoginMode={false} onSubmitted={onSubmittedFormHandler}
                      onRequestError={onRequestErrorHandler}/>
            {isLoading ? <Spinner/> : <UsersTable
                items={users}/>}
        </Fragment>);
};

export default Administration;