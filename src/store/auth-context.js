import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {
    },
    logout: () => {
    },
});

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null)
    let userIsLoggedIn = !!token;

    //
    // useEffect(() => {
    //     const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    //
    //     if (storedUserLoggedInInformation === '1') {
    //         setIsLoggedIn(true);
    //     }
    // }, []);


    const loginHandler = (token) => {
        // check email and password
        // localStorage.setItem('isLoggedIn', '1');
        console.log('token: ' + token);
        setToken(token);
    };

    const logoutHandler = () => {
        // localStorage.removeItem('isLoggedIn');
        setToken(null);
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>);
};

export default AuthContext;