import {useEffect, useReducer, useState} from 'react';

import classes from './AuthForm.module.css';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import {
    FIREBASE_COLLECTION_BASE_URL,
    ID_UNCONFIRMED,
    REST_POST,
    REST_PUT,
    ROLE_USER
} from '../../../consts/consts';
import useDbCall from '../../../hooks/use-db-call';
import useAuthCall from '../../../hooks/use-auth-call';

const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {value: action.val, isValid: action.val.includes('@')};
    }
    if (action.type === 'INPUT_BLUR') {
        return {value: state.value, isValid: state.value.includes('@')};
    }
    return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {value: action.val, isValid: action.val.trim().length > 6};
    }
    if (action.type === 'INPUT_BLUR') {
        return {value: state.value, isValid: state.value.trim().length > 6};
    }
    return {value: '', isValid: false};
};

const AuthForm = (props) => {

    const {makeDbRequest} = useDbCall();
    const {makeAuthRequest} = useAuthCall();
    const [isLoading, setIsLoading] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: false
    });

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
            isValid: false
        });

        const {isValid: emailIsValid} = emailState;
        const {isValid: passwordIsValid} = passwordState;

        useEffect(() => {
            const identifier = setTimeout(() => {
                setFormIsValid(
                    emailIsValid && passwordIsValid
                );
            }, 500);
            return () => {
                clearTimeout(identifier);
            };
        }, [emailIsValid, passwordIsValid]);


    const emailChangeHandler = (event) => {
        dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({type: 'USER_INPUT', val: event.target.value});
    };

    const validateEmailHandler = () => {
        dispatchEmail({type: 'INPUT_BLUR'});
    };

    const validatePasswordHandler = () => {
        dispatchPassword({type: 'INPUT_BLUR'});
    };

    const updateUserId = async (key, user, localId) => {
        const collectionElem = '/users/' + key + '.json';
        await makeDbRequest(collectionElem, REST_PUT, {
            ...user,
            id: localId
        });
        console.log('Set user id after inital login:\n' +
            'id: ' + localId + '\n' +
            'email: ' + user.email);
    }

    const fetchSingleUser = async (localId) => {
        let user;
        const response = await fetch(FIREBASE_COLLECTION_BASE_URL + 'users.json')
        if (!response.ok) {
            handleError('Error while fetching single User, response: ' + response);
        }
        const responseData = await response.json();
        console.log('Fetched Users from Database.')

        if (responseData == null) {
            return;
        }
        for (const key in responseData) {
            if (responseData[key].email === emailState.value) {
                user = responseData[key];
                if (user.id === ID_UNCONFIRMED) {
                    await updateUserId(key, user, localId);
                }
            }
        }
        console.log('User ' + emailState.value + ' has user: ')
        console.log(user);
        return user;
    }

    const fetchAllUsers = (body) => {
        makeDbRequest('users.json', REST_POST, body);
    }

    const makeAuthCall = async (operation, body) => {
        return await makeAuthRequest(operation, REST_POST, body, {
            'Content-Type': 'application/json'
        });
    };

    const onReceivedDataSubmit = (data) => {
        if (data && data.expiresIn) {
            const expirationTime = new Date((new Date().getTime() + (+data.expiresIn * 1000)));
            if (data && data.email) {
                fetchSingleUser(data.localId).then(user => {
                    if (user) {
                        data = {...data, role: user.role};
                    }
                    setIsLoading(false);
                    props.onSubmitted({...data, expirationTime});
                });
            } else {
                setIsLoading(false);
                props.onSubmitted({...data, expirationTime});
            }
        }
    }

    const handleError = (errorMessage) => {
        props.onRequestError(errorMessage)
    }

    const submitHandler = event => {
        event.preventDefault();
        setIsLoading(true);

        let operation;
        if (props.isLoginMode) {
            operation = 'accounts:signInWithPassword?key=';
        } else {
            operation = 'accounts:signUp?key=';
        }

        makeAuthCall(operation, {
            email: emailState.value,
            password: passwordState.value,
            returnSecureToken: true
        }).then(res => {
            if (res.ok) {
                if (!props.isLoginMode) {
                    fetchAllUsers({
                        id: ID_UNCONFIRMED,
                        email: emailState.value,
                        role: ROLE_USER,
                    });
                }
                return res.json();
            } else {
                res.json().then(data => {
                    let errorMessage = 'Authentication Failed!\n' +
                        'code: ' + data.error.code + '\n' +
                        'message: ' + data.error.message;
                    handleError(errorMessage);
                });
            }
        }).then(data => {
            setIsLoading(false);
            onReceivedDataSubmit(data);
        })
            .catch(err => {
                setIsLoading(false);
                handleError(err.toString());
            });
    };

        return (
            <form onSubmit={submitHandler}>
                <div className={`${classes.control} ${emailState.isValid ? classes.invalid : ''}`}>
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={validateEmailHandler}
                    />
                </div>
                <div className={`${classes.control} ${passwordState.isValid ? classes.invalid : ''}`}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading &&
                    <Button type="submit"
                            disabled={!formIsValid}>{props.isLoginMode ? 'Login' : 'Account erstellen'}</Button>}
                    {isLoading && <Spinner/>}
                </div>
            </form>
        );
    }
;

export default AuthForm;