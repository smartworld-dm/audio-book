import React, { createContext, useState } from 'react';
import {useCookies} from "react-cookie";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['commmune-audio-book-token', 'commmune-audio-book-user']);

    const login = ({email, token}) => {
        setUser({email})
        setCookie("commmune-audio-book-token", token);
        setCookie("commmune-audio-book-user", email);
    };

    const logout = () => {
        setUser(null);
        removeCookie("commmune-audio-book-token");
        removeCookie("commmune-audio-book-user");
    };

    const cookieAlive = ()=> {
        if (cookies['commmune-audio-book-user'])
            return cookies['commmune-audio-book-user'];
        else
            return false;
    }

    return (
        <AuthContext.Provider value={{ login, logout, cookieAlive }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
