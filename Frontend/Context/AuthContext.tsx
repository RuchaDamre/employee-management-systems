'use client'
import { API_URL } from "@/app/api";
import React from "react";

type Props = {
    children: React.ReactNode,
}

export type User = {
    role: string,
    email: string,
}

export type Context = {
    user: User | null,
    login: (user: User) => void,
    logout: () => void,
    loading: boolean,
    pathID: string,
    setPathID: (id: string) => void,
}

export const authContext = React.createContext<Context | null>(null);

function AuthContext({ children }: Props) {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [pathID, setPathID] = React.useState<string>('');

    // User can't visit ${API_URL}/dashboard without logging, if he tried it will redirect to login page
    React.useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${API_URL}/auth/verify`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (data.success) {
                    setUser(data.user);
                }
            }
            catch (error) {
                setUser(null);
            }
            finally {
                setLoading(false);
            }
        }
        verifyUser();
    }, []);

    const login = (user: User) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
    }

    return (<authContext.Provider value={{ user, login, logout, loading, pathID, setPathID }}>
        {children}
    </authContext.Provider>)
}

export const useAuthContext = () => {
    const content = React.useContext(authContext);
    if (!content) {
        throw new Error('Login must be used inside AuthProvider')
    }
    return content;
}

export default AuthContext;