import React, { useEffect, useState, createContext, useContext } from 'react';

import { Api } from 'utils/API';

export type User = {
    token: string;
    username: string;
    email: string;
    isActive: boolean;
    role: string;
    code: string;
    id: number;
    created_at: string;
    updated_at: string;
};

const USER_KEY = 'u_s';
const TOKEN_KEY = 't_k';

function AuthConfig(): AuthContextType {
    const [token, setToken] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User>();

    const register = async (username: string, email: string, pwd: string) => {
        setIsLoading(true);
        const res = await Api.register(username, email, pwd);
        setIsLoading(false);
        if (res.status == 200) {
            const user: User = res.user as User;
            const resToken = user.token;
            setUser(user);
            setToken(resToken);
            window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
            window.sessionStorage.setItem(TOKEN_KEY, resToken);
        } else {
            alert(res.error || res.message);
        }
    };

    const login = async (email: string, pwd: string) => {
        setIsLoading(true);
        const res = await Api.login(email, pwd);
        setIsLoading(false);
        if (res && res.status == 200) {
            setUser(res.user);
            setToken(res.user.token);
            window.sessionStorage.setItem(USER_KEY, JSON.stringify(res.user));
            window.sessionStorage.setItem(TOKEN_KEY, res.user.token);
        } else {
            alert('Failed to login, please try again with correct credential.');
        }
    };

    const logout = () => {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.removeItem(TOKEN_KEY);
        setUser(undefined);
        setToken(undefined);
        console.log('logout : ');
    };

    useEffect(() => {
        const userObj = window.sessionStorage.getItem(USER_KEY);
        const tokenS = window.sessionStorage.getItem(TOKEN_KEY);

        if (userObj) {
            setUser(JSON.parse(userObj));
        }
        console.log('get token from local : ', tokenS);
        if (tokenS) {
            setToken(tokenS);
        }
    }, []);

    return {
        isLoading,
        user,
        setUser,
        token,
        setToken,
        login,
        register,
        logout,
    };
}

export type AuthContextType = {
    isLoading: boolean;
    user: User | undefined | null;
    setUser: any;
    token: string | undefined | null;
    setToken: any;
    login: any;
    register: any;
    logout: any;
};

export const authContext = createContext<AuthContextType>({
    isLoading: false,
    user: undefined,
    setUser: undefined,
    token: undefined,
    setToken: undefined,
    login: undefined,
    register: undefined,
    logout: undefined,
});

export const AuthProvider: React.FC = ({ children }) => {
    const value = AuthConfig();
    return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
