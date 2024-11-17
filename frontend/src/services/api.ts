import { env } from '../config/env';
import type { ApiResponse } from '../types/api';
import type { AuthResponse, User } from '../types/auth';

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const headers = {
                'Content-Type': 'application/json',
                ...options.headers,
            };

            const response = await fetch(url, {
                ...options,
                headers,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred');
            }

            return { data };
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : 'An error occurred',
            };
        }
    }

    async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
        return this.request<AuthResponse>('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    async signup(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
        return this.request<AuthResponse>('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    async getProfile(token: string): Promise<ApiResponse<{ user: User }>> {
        return this.request<{ user: User }>('/api/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    async logout(token: string): Promise<ApiResponse<void>> {
        return this.request('/api/logout', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export const api = new ApiClient(env.apiUrl);