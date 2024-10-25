'use client';

import { useEffect, useRef, useState } from 'react';
import getTeacherAssign from '../../../context/server/assignment/getTeacherAssignment';
import deleteAssignApi from '../../../context/server/assignment/deleteAssign';
import { verifyToken } from '../../../shared/common';
import { User } from '../../../shared/types';
import { Button } from 'primereact/button';
import './Assignment.css';
import { Toast } from 'primereact/toast';
import QuestionPaper from './questionPaper';
import { Dialog } from 'primereact/dialog';
import { Paginator } from 'primereact/paginator';
import { useRouter } from 'next/navigation'; // Import useRouter

const Assignment = () => {
    const [user, setUser] = useState<User | null>(null);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [visible, setVisible] = useState(false);
    const [confirmationVisible, setConfirmationVisible] = useState(false); // For confirmation dialog
    const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null); // Store assignment to delete
    const toast = useRef<Toast>(null);
    const router = useRouter(); // Initialize useRouter

    const [filteredQuestions, setFilteredQuestions] = useState<{
        mcq: any[];
        short: any[];
        long: any[];
        fillInTheBlanks: any[];
        multiFillInTheBlanks: any[];
        multipleShort: any[];
        sequence: any[];
        multipleTrueFalse: any[];
        multipleQuestionV2: any[];
    }>({
        mcq: [],
        short: [],
        long: [],
        fillInTheBlanks: [],
        multiFillInTheBlanks: [],
        multipleShort: [],
        sequence: [],
        multipleTrueFalse: [],
        multipleQuestionV2: []
    });

    const [currentPage, setCurrentPage] = useState(1);
    const assignmentsPerPage = 5;

    useEffect(() => {
        const getAssignments = async () => {
            const userData = verifyToken(localStorage?.getItem('lms-token') as string) as User;
            setUser(userData);

            const result = await getTeacherAssign(userData?.id);
            if (result?.status) {
                setAssignments(result.result.data || []);
            }
        };
        getAssignments();
    }, []);

    const solveAssign = (assignment: any) => {
        const newFilteredQuestions: any = {
            mcq: [],
            short: [],
            long: [],
            fillInTheBlanks: [],
            multiFillInTheBlanks: [],
            multipleShort: [],
            sequence: [],
            multipleTrueFalse: [],
            multipleQuestionV2: []
        };

        assignment?.questions?.forEach((question: any) => {
            switch (question.type) {
                case 'LONG':
                    newFilteredQuestions.long.push(question);
                    break;
                case 'FILLINTHEBLANK':
                    newFilteredQuestions.fillInTheBlanks.push(question);
                    break;
                case 'MULTIFILLINTHEBLANK':
                    newFilteredQuestions.multiFillInTheBlanks.push(question);
                    break;
                case 'MULTIPLSHORT':
                    newFilteredQuestions.multipleShort.push(question);
                    break;
                case 'MCQ':
                    newFilteredQuestions.mcq.push(question);
                    break;
                case 'SEQUENCE':
                    newFilteredQuestions.sequence.push(question);
                    break;
                case 'MULTIPLETRUEFALSE':
                    newFilteredQuestions.multipleTrueFalse.push(question);
                    break;
                case 'MULTIPLSHORTV2':
                    newFilteredQuestions.multipleQuestionV2.push(question);
                    break;
                default:
                    break;
            }
        });

        setFilteredQuestions(newFilteredQuestions);
        setVisible(true);
    };

    const indexOfLastAssignment = currentPage * assignmentsPerPage;
    const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
    const currentAssignments = assignments.slice(indexOfFirstAssignment, indexOfLastAssignment);

    const handlePageChange = (event: { first: number; rows: number }) => {
        setCurrentPage(event.first / event.rows + 1);
    };

    // Function to confirm deletion
    const confirmDelete = (assignment: any) => {
        setAssignmentToDelete(assignment);
        setConfirmationVisible(true);
    };

    // Function to delete assignment
    const deleteAssign = async () => {
        if (assignmentToDelete) {
            const result = await deleteAssignApi({ id: assignmentToDelete.id, teacherId: user?.id || '' });
            if (result?.status) {
                toast.current?.show({ severity: 'success', summary: 'Success', detail: result?.result?.message, life: 3000 });
                setAssignments(assignments.filter((assignment) => assignment.id !== assignmentToDelete.id));
            } else {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: result?.message || 'Failed to delete assignment', life: 3000 });
            }
            setConfirmationVisible(false); // Close confirmation dialog
            setAssignmentToDelete(null); // Reset assignment to delete
        }
    };

    return (
        <div className="assignment-container">
            <Toast ref={toast} />
            <div className="flex justify-content-between">
                <h1>Assignments</h1>

                <Button label="Back" icon="pi pi-arrow-left" onClick={() => router.back()} className="p-button-secondary mb-4" />
            </div>

            {currentAssignments.length > 0 ? (
                <div className="assignment-list">
                    {currentAssignments.map((assignment) => (
                        <div key={assignment.id} className="assignment-item">
                            <div className="assignment-header">
                                <h3>{assignment.name}</h3>
                            </div>

                            <div className="assignment-details">
                                <p>
                                    <strong>Grade:</strong> {assignment?.grade?.grade}
                                </p>
                                <div className="divider"></div>
                                <p>
                                    <strong>Topic:</strong> {assignment?.topic?.topic}
                                </p>
                                <div className="divider"></div>
                                <p>
                                    <strong>SubTopic:</strong> {assignment?.subTopic?.subTopic}
                                </p>
                                <div className="divider"></div>
                                <p>
                                    <strong>School:</strong> {assignment?.school?.type}
                                </p>
                                <div className="divider"></div>
                                <p>
                                    <strong>Assigned by:</strong> {assignment?.user?.name}
                                </p>
                            </div>
                            <div className="w-full flex justify-content-end gap-4">
                                <Button label="View" onClick={() => solveAssign(assignment)} />
                                <Button label="Delete" onClick={() => confirmDelete(assignment)} className="p-button-danger" icon="pi pi-times" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No assignments available for submission.</p>
            )}

            <Paginator first={(currentPage - 1) * assignmentsPerPage} rows={assignmentsPerPage} totalRecords={assignments.length} onPageChange={handlePageChange} />

            <Dialog header="Confirm Deletion" visible={confirmationVisible} style={{ width: '30vw' }} onHide={() => setConfirmationVisible(false)}>
                <div>
                    <p>Are you sure you want to delete this assignment?</p>
                    <div className="flex justify-content-end">
                        <Button label="No" onClick={() => setConfirmationVisible(false)} className="p-button-text" />
                        <Button label="Yes" onClick={deleteAssign} className="p-button-danger" />
                    </div>
                </div>
            </Dialog>

            <Dialog header="Assignment" visible={visible} maximizable style={{ width: '80vw', height: '100vh' }} onHide={() => setVisible(false)}>
                <QuestionPaper
                    filteredMcqQuestions={filteredQuestions.mcq}
                    filteredShortQuestions={filteredQuestions.short}
                    filteredLongQuestions={filteredQuestions.long}
                    filteredFillInTheBlanksQuestions={filteredQuestions.fillInTheBlanks}
                    filteredMultiFillInTheBlanksQuestions={filteredQuestions.multiFillInTheBlanks}
                    filteredMultipleShortQuestions={filteredQuestions.multipleShort}
                    filteredSequenceQuestions={filteredQuestions.sequence}
                    filteredMultipleTrueFalseQuestions={filteredQuestions.multipleTrueFalse}
                    filteredMultipleQuestionV2Questions={filteredQuestions.multipleQuestionV2}
                />
            </Dialog>
        </div>
    );
};

export default Assignment;
