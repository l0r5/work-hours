import React, {useCallback, useEffect, useState} from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    id: '',
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

    const [token, setToken] = useState(initialToken);
    const [id, setId] = useState();
    const [role, setRole] = useState();
    let userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setId(null)
        setToken(null);
        setRole(null);
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-expiration-time');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (id, role, token, expirationTime) => {
        setId(id)
        setRole(role);
        setToken(token);
        localStorage.setItem('auth-token', token);
        localStorage.setItem('auth-expiration-time', expirationTime);
        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
        console.log('Successfully logged in! \n' +
            'id: ' + id + '\n' +
            'role: ' + role + '\n' +
            'token: ' + token + '\n' +
            'expirationTime: ' + remainingTime);
    };

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        id: id,
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