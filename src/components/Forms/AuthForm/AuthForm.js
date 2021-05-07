import {useEffect, useReducer, useState} from 'react';

import classes from './AuthForm.module.css';
import Spinner from '../../UI/Spinner/Spinner';
import Button from '../../UI/Button/Button';

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

    const submitHandler = event => {
        event.preventDefault();

        setIsLoading(true);
        let url;
        if (props.isLoginMode) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.REACT_APP_GOOGLE_FIREBASE_API_KEY;
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_GOOGLE_FIREBASE_API_KEY;
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
                console.log('data');
                console.log(data);
                if (data && data.expiresIn) {
                    const expirationTime = new Date((new Date().getTime() + (+data.expiresIn * 1000)));
                    props.onSubmitted({...data, expirationTime});
                }
            })
            .catch(err => {
                console.log('error');

                console.log(err)
                props.onRequestError(err.toString())
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
};

export default AuthForm;