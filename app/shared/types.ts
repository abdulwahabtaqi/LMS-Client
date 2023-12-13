import { TableColumns } from "./components/Datatable/types";

export interface School{
    id:string,
    type:string,
    grades:Grade[],
    createdAt:string,
    updatedAt:string,
    action?:React.ReactNode
}

export interface Grade{
    id:string,
    type:string,
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface DatatableWithSearchProps<T> {
    tableColumns: TableColumns[];
    data: T[];
    loading?: boolean;
}

export interface Toaster {
    severity: "success" | "info" | "warn" | "error";
    summary: string;
    detail: string;
    life?: number;

}