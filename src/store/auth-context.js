import React, {useCallback, useEffect, useState} from 'react';
import {FIREBASE_COLLECTION_BASE_URL} from '../consts/consts';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    role: '',
    login: (email, token) => {
    },
    logout: () => {
    },
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    return adjExpirationTime - currentTime;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('auth-token');
    const storedExpirationTime = localStorage.getItem('auth-expiration-time');

    const remainingTime = calculateRemainingTime(storedExpirationTime);

    if (remainingTime <= 60000) {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-expiration-time');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime
    };
};

const retrieveRole = async (email) => {

    // fetch role

    const response = await fetch(FIREBASE_COLLECTION_BASE_URL + 'users.json');
    if (!response.ok) {
        // TODO Error handling
        throw new Error('Something went wrong!');
    }

    const responseData = await response.json();
    console.log('Fetched Users from Database.')
    console.log(responseData)
    console.log(email)

    let role;
    for (const key in responseData) {
        if (responseData[key].email === email) {
            role = responseData[key].role;
        }
    }

    await console.log('User ' + email + ' has role: ' + role)
    return role
}


export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;

    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);
    const [role, setRole] = useState(null);
    let userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        setRole(null);
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-expiration-time');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (email, token, expirationTime) => {
        console.log('auth-token: ');
        console.log(token);
        setToken(token);
        localStorage.setItem('auth-token', token);
        localStorage.setItem('auth-expiration-time', expirationTime);
        setRole(retrieveRole(email));
        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        role: role,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>);
};

export default AuthContext;