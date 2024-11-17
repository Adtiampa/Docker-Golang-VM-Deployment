export interface User {
    id: number;
    email: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    user?: User;
}

export interface AuthError {
    message: string;
}

export interface AuthProps {
    setIsAuthenticated: (value: boolean) => void;
}