import React, {useCallback, useEffect, useState} from 'react';

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




export const AuthContextProvider = (props) => {
    const tokenData = retrieveStoredToken();
    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }

    console.log('AuthContextProvider: ');
    console.log(props);


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

    const loginHandler = (role, token, expirationTime) => {
        console.log('auth-token: ');
        console.log(token);
        setToken(token);
        localStorage.setItem('auth-token', token);
        localStorage.setItem('auth-expiration-time', expirationTime);
        setRole(role);
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