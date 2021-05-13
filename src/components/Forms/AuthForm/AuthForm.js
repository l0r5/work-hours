import {useEffect, useReducer, useState} from 'react';

import classes from './AuthForm.module.css';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';
import {
    FIREBASE_AUTH_BASE_URL,
    FIREBASE_COLLECTION_BASE_URL,
    ROLE_USER
} from '../../../consts/consts';

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
                console.log('Checking form validity');
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

        const fetchUserRole = async () => {
            let role;
            const response = await fetch(FIREBASE_COLLECTION_BASE_URL + 'users.json')
            if (!response.ok) {
                // TODO Error handling
                throw new Error('Something went wrong!');
            }

            const responseData = await response.json();
            console.log('Fetched Users from Database.')

            for (const key in responseData) {
                if (responseData[key].email === emailState.value) {
                    role = responseData[key].role;

                }
            }

            console.log(responseData)
            console.log(emailState.value)
            console.log('User ' + emailState.value + ' has role: ' + role)
            return role;
        }

        const submitHandler = event => {
                event.preventDefault();

                setIsLoading(true);
                let url;
                if (props.isLoginMode) {
                    url = FIREBASE_AUTH_BASE_URL + 'accounts:signInWithPassword?key=' + process.env.REACT_APP_GOOGLE_FIREBASE_API_KEY;
                } else {
                    url = FIREBASE_AUTH_BASE_URL + 'accounts:signUp?key=' + process.env.REACT_APP_GOOGLE_FIREBASE_API_KEY;
                }

                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: emailState.value,
                        password: passwordState.value,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                    .then(res => {
                        setIsLoading(false);
                        if (res.ok) {
                            if (!props.isLoginMode) {
                                fetch(FIREBASE_COLLECTION_BASE_URL + 'users.json', {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        email: emailState.value,
                                        role: ROLE_USER,
                                    })
                                }).then(() => {
                                        console.log("Added new element with email " + emailState.value);
                                    }
                                );
                            }
                            return res.json();
                        } else {
                            res.json().then(data => {
                                console.log(data.error)
                                let errorMessage = 'Authentication Failed!\n' +
                                    'code: ' + data.error.code + '\n' +
                                    'message: ' + data.error.message;
                                props.onRequestError(errorMessage)
                            });
                        }
                    })
                    .then(data => {
                        if (data && data.expiresIn) {
                            const expirationTime = new Date((new Date().getTime() + (+data.expiresIn * 1000)));

                            if (data && data.email) {
                                fetchUserRole().then(role => {
                                    data = {...data, role};
                                    console.log(role)
                                    props.onSubmitted({...data, expirationTime, role});
                                });
                            } else {
                                props.onSubmitted({...data, expirationTime});
                            }
                        }
                    })
                    .catch(err => {
                        console.log('error');

                        console.log(err)
                        props.onRequestError(err.toString())
                    });
            }
        ;

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