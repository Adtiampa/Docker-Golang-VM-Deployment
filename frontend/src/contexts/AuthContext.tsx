import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface AuthContextType {
    token: string | null;
    user: any | null;
    isAuthenticated: boolean;
    setToken: (token: string | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(() =>
        localStorage.getItem('token')
    );
    const [user, setUser] = useState<any | null>(null);

    const setToken = (newToken: string | null) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    };

    const logout = () => {
        console.log("hit logout")
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                const { data, error } = await api.getProfile(token);
                if (!error && data) {
                    setUser(data);
                } else {
                    logout();
                }
            }
        };

        loadUser();
    }, [token]);

    return (
        <AuthContext.Provider value={{
            token,
            user,
            isAuthenticated: !!token,
            setToken,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};