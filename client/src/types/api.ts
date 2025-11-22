export interface ApiError {
    error: string;
    message?: string;
    id?: number;
}

export interface ApiResponse<T> {
    data: T;
}

