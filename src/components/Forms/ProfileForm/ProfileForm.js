import {useContext, useEffect, useReducer, useState} from 'react';

import classes from './ProfileForm.module.css';
import AuthContext from '../../../store/auth-context';
import Button from '../../UI/Button/Button';

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return {value: action.val, isValid: action.val.trim().length > 6};
    }
    if (action.type === 'INPUT_BLUR') {
        return {value: state.value, isValid: state.value.trim().length > 6};
    }
    return {value: '', isValid: false};
};

const ProfileForm = (props) => {
    const authCtx = useContext(AuthContext);
    const [formIsValid, setFormIsValid] = useState(false);

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: false
    });

    const {isValid: passwordIsValid} = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            console.log('Checking form validity');
            setFormIsValid(
                passwordIsValid
            );
        }, 500);
        return () => {
            clearTimeout(identifier);
        };
    }, [passwordIsValid]);

    const passwordChangeHandler = (event) => {
        dispatchPassword({type: 'USER_INPUT', val: event.target.value});
    };

    const validatePasswordHandler = () => {
        dispatchPassword({type: 'INPUT_BLUR'});
    };

    const submitHandler = event => {
        event.preventDefault();
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + process.env.REACT_APP_GOOGLE_FIREBASE_API_KEY, {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                password: passwordState.value,
                returnSecureToken: false
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                res.json().then(data => {
                    console.log(data.error)
                    let errorMessage = 'Password Change Failed!\n' +
                        'code: ' + data.error.code + '\n' +
                        'message: ' + data.error.message;
                    props.onRequestError(errorMessage)
                });
            }
        })
            .then(data => {
                if (data) {
                    const expirationTime = new Date((new Date().getTime() + (3600 * 1000)));
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
            <div>
                <Button type="submit" disabled={!formIsValid}>Change Password</Button>
            </div>
        </form>
    );
}

export default ProfileForm;
