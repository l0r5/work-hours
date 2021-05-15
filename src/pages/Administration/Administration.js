import React, {Fragment, useContext, useEffect, useState} from 'react';

import AuthForm from '../../components/Forms/AuthForm/AuthForm';
import SuccessModal from '../../components/UI/SuccessModal/SuccessModal';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';
import AuthContext from '../../store/auth-context';
import UsersTable from '../../components/Tables/UsersTable/UsersTable';
import {REST_GET} from '../../consts/consts';
import useDbCall from '../../hooks/use-db-call';


const Administration = (props) => {
    const authCtx = useContext(AuthContext);
    const {makeDbRequest} = useDbCall();

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
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
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);

        const response = await makeDbRequest('users.json', REST_GET, null);

        if (!response.ok) {
            // TODO error handling
            console.log(response)
            throw new Error('Something went wrong!');
        }

        const responseData = await response.json();

        let loadedUsers = [];

        for (const key in responseData) {
            loadedUsers.push({
                id: responseData[key].id,
                email: responseData[key].email,
                role: responseData[key].role,
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
    const onEditUserHandler = (item) => {
        console.log("Clicked edit item: ", item.id)
        // history.push({
        //     pathname: `/bearbeiten/${item.id}`,
        //     state: {
        //         id: item.id,
        //         date: item.date,
        //         customer: item.customer,
        //         location: item.location,
        //         token: item.token,
        //         task: item.task,
        //         comment: item.comment,
        //         employee: item.employee,
        //         workHours: item.workHours,
        //         chainsawHours: item.chainsawHours,
        //         machineHours: item.machineHours
        //     }
        // });
    };

    const onDeleteUserHandler = (item) => {
        console.log("Clicked delete item: ", item.id)

    };

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
            <h2>Neuen Benutzer anlegen</h2>
            <AuthForm isLoginMode={false} onSubmitted={onSubmittedFormHandler}
                      onRequestError={onRequestErrorHandler}/>
            <UsersTable
                items={users}
                onEditClick={onEditUserHandler}
                onDeleteClick={onDeleteUserHandler}/>
        </Fragment>);
};

export default Administration;