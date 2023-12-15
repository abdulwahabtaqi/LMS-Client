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
    school:School,
    schoolId:string,
    schoolName:string,
    grade:string,
    subjects:Subject[],
    createdAt:string,
    updatedAt:string,
    action?:React.ReactNode
}

export interface Subject {
    id: string,
    grade: Grade,
    gradeId: string,
    gradeName: string,
    subject: string,
    topics: Topic[],
    createdAt: string,
    updatedAt: string,
    action?: React.ReactNode
}
export interface Topic {
    id: string,
    subject: Subject,
    subjectId: string,
    subjectName: string,
    topic: string,
    subTopics: SubTopic[],
    createdAt: string,
    updatedAt: string,
    action?: React.ReactNode
}

export interface SubTopic {
    id: string,
    topic: Topic,
    topicId: string,
    topicName: string,
    subTopic: string,
    questions: Question[],
    createdAt: string,
    updatedAt: string,
    action?: React.ReactNode
}

export interface Question {
    id: string,
    subTopic: SubTopic,
    subTopicId: string,
    question: string,
    type:QuestionType[]
    answers: Answer[],
    createdAt: string,
    updatedAt: string,
    action?: React.ReactNode
}
export interface Answer {
    id: string,
    question: Question,
    questionId: string,
    answer: string,
    type:QuestionType[]
    createdAt: string,
    updatedAt: string,
    action?: React.ReactNode
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

export enum QuestionType {
    MCQ = "MCQ",
    SHORT = "SHORT",
    LONG = "LONG"
}

export enum  DifficultyLevel {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
}


export interface SchoolDropdownProps {
    name: string;
    label: string;
}