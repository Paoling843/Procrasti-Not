import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userName: string;
    setUserName: (name: string) => void;
    login: (name?: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserNameState] = useState(localStorage.getItem('userName') || 'User');

    const login = (name?: string) => {
        setIsAuthenticated(true);
        if (name) {
            setUserNameState(name);
            localStorage.setItem('userName', name);
        }
    };
    
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('userName');
    };
    
    const setUserName = (name: string) => {
        setUserNameState(name);
        localStorage.setItem('userName', name);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userName, setUserName, login, logout }}>
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