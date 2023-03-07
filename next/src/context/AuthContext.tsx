import axios from "axios";
import { createContext, useContext, ReactNode, useState } from "react";

type UserServer = {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: Date,
    updatedAt: Date,
}

type User = UserServer | null;

type authContextType = {
    user: User,
    accessToken: string | null,
    login: (email: string, password: string) => Promise<number>,
    refresh: () => Promise<number>,
    getUser: (accessToken: string) => Promise<number>,
    logout: () => void,
};

const authContextDefaultValues: authContextType = {
    user: null,
    accessToken: null,
    login: () => { return new Promise(() => 0) },
    refresh: () => { return new Promise(() => 0) },
    getUser: (accessToken: string) => { return new Promise(() => 0) },
    logout: () => { },
};


const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: ReactNode;
};

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<User>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const login = async (email: string, password: string): Promise<number> => {
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:1337/api/auth/local',
                withCredentials: true,
                data: {
                    identifier: email,
                    password: password
                }
            });
            if (res.status === 200) {
                setAccessToken(res.data.jwt);
            }
            setUser(res.data.user);
            return res.status;
        } catch (error) {
            console.log(error);
            return 0;
        }
    };

    const refresh = async () => {
        try {
            const res = await axios({
                method: 'POST',
                url: 'http://localhost:1337/api/token/refresh',
                withCredentials: true
            });
            if (res.status === 200) {
                console.log('refresh 200');

                setAccessToken(res.data.jwt);
            }
            return (res.status);
        } catch (error) {
            console.log(error);
            return 0;
        }
    };

    const getUser = async (accessToken: string) => {
        try {
            const res = await axios({
                headers: { Authorization: `Bearer ${accessToken}` },
                method: 'GET',
                url: 'http://localhost:1337/api/users/me',
            });
            if (res.status === 200) {
                console.log('200');
                setUser(res.data);
            }
            else if (res.status === 401) {
                console.log('401');

                const res = await refresh();
                if (res === 200) {
                    const res = await axios({
                        headers: { Authorization: `Bearer ${accessToken}` },
                        method: 'GET',
                        url: 'http://localhost:1337/api/users/me',
                    });
                    if (res.status === 200) {
                        setUser(res.data);
                    }
                }
            }
            return (res.status);
        } catch (error) {
            console.log(error);
            if (error.message === "Request failed with status code 401") {
                console.log('401');

                try {
                    const res = await axios({
                        method: 'POST',
                        url: 'http://localhost:1337/api/token/refresh',
                        withCredentials: true
                    });
                    if (res.status === 200) {
                        console.log('refresh 200');
                        setAccessToken(res.data.jwt);
                        const resUser = await axios({
                            headers: { Authorization: `Bearer ${res.data.jwt}` },
                            method: 'GET',
                            url: 'http://localhost:1337/api/users/me',
                        });
                        if (resUser.status === 200) {
                            setUser(resUser.data);
                        }
                        return resUser.status;
                    }
                    return (res.status);
                } catch (error) {
                    console.log(error);
                    return 0;
                }


            }
            return 0;
        }
    };

    const logout = async () => {
        setUser(null);
    };

    const value = {
        user,
        login,
        accessToken,
        refresh,
        getUser,
        logout,
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}