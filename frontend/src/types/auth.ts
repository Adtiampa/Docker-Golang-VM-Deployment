export interface User {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    token: string;
    user: User;
    message?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials extends LoginCredentials {
    confirmPassword?: string;
}

export interface AuthError {
    message: string;
    code?: string;
    status?: number;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    signup: (credentials: SignupCredentials) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
}
