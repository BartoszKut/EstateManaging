import React, { useCallback, useEffect, useState } from 'react';
import { calculateRemainingTime } from '../helpers/calculateRemainingTime';
import { retriveStoredToken } from '../helpers/retriveStoredToken';

let logoutTimer;

const AuthContext = React.createContext({
    token: '',
    userIsLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

export const AuthContextProvider = (props) => {
    const tokenData = retriveStoredToken();

    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }
    
    const [token, setToken] = useState(initialToken);
    
    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime) => {
        setToken(token)
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime)
    }

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        userIsLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;
