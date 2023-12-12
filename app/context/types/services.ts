export interface ApiResponse {
    status: boolean;
    message: string;
    data: [] | {} | null;
}
export interface ServiceResponse {
    status: boolean,
    result:ApiResponse
}