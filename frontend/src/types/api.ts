export interface ApiResponse<T = any> {
    data?: T;
    error?: string;
    status?: number;
    message?: string;
}

export interface ApiError {
    message: string;
    code?: string;
    status?: number;
}

export interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
    withAuth?: boolean;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
