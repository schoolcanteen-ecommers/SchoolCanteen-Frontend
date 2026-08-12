export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;

  error: {
    code?: string;
    message: string;
    errors?: Record<string, string[]>;
  };
}