'use client';
import { useEffect, useState, useRef } from 'react';
import getSubmitAssign from '../../context/server/assignment/getSubmitAssignment';
import { verifyToken } from '../../shared/common';
import { User } from '../../shared/types';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import './SubmitAssignment.css';
import QuestionPaper from './questionPaper';

const SubmitAssignment = () => {
    const [user, setUser] = useState<User | null>(null);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [visible, setVisible] = useState(false);
    const toast = useRef<Toast>(null);

    // Pagination state
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5); // Items per page

    const [filteredMcqQuestions, setFilteredMcqQuestions] = useState<any>([]);
    const [filteredShortQuestions, setFilteredShortQuestions] = useState<any>([]);
    const [filteredLongQuestions, setFilteredLongQuestions] = useState<any>([]);
    const [filteredFillInTheBlanksQuestions, setFilteredFillInTheBlanksQuestions] = useState<any>([]);
    const [filteredMultiFillInTheBlanksQuestions, setFilteredMultiFillInTheBlanksQuestions] = useState<any>([]);
    const [filteredMultipleShortQuestions, setFilteredMultipleShortQuestions] = useState<any>([]);
    const [filteredSequenceQuestions, setFilteredSequenceQuestions] = useState<any>([]);
    const [filteredMultipleTrueFalseQuestions, setFilteredMultipleTrueFalseQuestions] = useState<any>([]);
    const [filteredMultipleQuestionV2Questions, setFilteredMultipleQuestionV2Questions] = useState<any>([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            const userData = verifyToken(localStorage?.getItem('lms-token') as string) as User;
            setUser(userData);

            const result = await getSubmitAssign(userData?.id);
            if (result?.status) {
                setAssignments(result?.result.data || []);
            }
        };
        fetchAssignments();
    }, []);

    const solveAssign = (assignment: any) => {
        const newFilteredMcqQuestions: any = [];
        const newFilteredShortQuestions: any = [];
        const newFilteredLongQuestions: any = [];
        const newFilteredFillInTheBlanksQuestions: any = [];
        const newFilteredMultiFillInTheBlanksQuestions: any = [];
        const newFilteredMultipleShortQuestions: any = [];
        const newFilteredSequenceQuestions: any = [];
        const newFilteredMultipleTrueFalseQuestions: any = [];
        const newFilteredMultipleQuestionV2Questions: any = [];

        assignment?.questions?.forEach((question: any) => {
            switch (question.type) {
                case 'LONG':
                    newFilteredLongQuestions.push(question);
                    break;
                case 'FILLINTHEBLANK':
                    newFilteredFillInTheBlanksQuestions.push(question);
                    break;
                case 'SHORT':
                    newFilteredShortQuestions.push(question);
                    break;
                case 'MULTIFILLINTHEBLANK':
                    newFilteredMultiFillInTheBlanksQuestions.push(question);
                    break;
                case 'MULTIPLSHORT':
                    newFilteredMultipleShortQuestions.push(question);
                    break;
                case 'MCQ':
                    newFilteredMcqQuestions.push(question);
                    break;
                case 'SEQUENCE':
                    newFilteredSequenceQuestions.push(question);
                    break;
                case 'MULTIPLETRUEFALSE':
                    newFilteredMultipleTrueFalseQuestions.push(question);
                    break;
                case 'MULTIPLSHORTV2':
                    newFilteredMultipleQuestionV2Questions.push(question);
                    break;
                default:
                    break;
            }
        });

        setFilteredMcqQuestions(newFilteredMcqQuestions);
        setFilteredShortQuestions(newFilteredShortQuestions);
        setFilteredLongQuestions(newFilteredLongQuestions);
        setFilteredFillInTheBlanksQuestions(newFilteredFillInTheBlanksQuestions);
        setFilteredMultiFillInTheBlanksQuestions(newFilteredMultiFillInTheBlanksQuestions);
        setFilteredMultipleShortQuestions(newFilteredMultipleShortQuestions);
        setFilteredSequenceQuestions(newFilteredSequenceQuestions);
        setFilteredMultipleTrueFalseQuestions(newFilteredMultipleTrueFalseQuestions);
        setFilteredMultipleQuestionV2Questions(newFilteredMultipleQuestionV2Questions);

        setVisible(!visible);
    };

    // Handle pagination change
    const onPageChange = (e: any) => {
        setFirst(e.first);
        setRows(e.rows);
    };

    return (
        <div className="assignment-container">
            <Toast ref={toast} />
            <h1 className="page-title">Submit Assignments</h1>

            {assignments.length > 0 ? (
                <>
                    <div className="assignment-list">
                        {assignments.slice(first, first + rows).map((assignment) => (
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
                                <Button label="Solve" onClick={() => solveAssign(assignment)} />
                            </div>
                        ))}
                    </div>

                    <Paginator first={first} rows={rows} totalRecords={assignments.length} onPageChange={onPageChange} rowsPerPageOptions={[5, 10, 20]} />
                </>
            ) : (
                <p>No assignments available for submission.</p>
            )}

            <Dialog header="Assignment" visible={visible} maximizable style={{ width: '80vw', height: '100vh' }} onHide={() => setVisible(false)}>
                <QuestionPaper
                    filteredMcqQuestions={filteredMcqQuestions}
                    filteredShortQuestions={filteredShortQuestions}
                    filteredLongQuestions={filteredLongQuestions}
                    filteredFillInTheBlanksQuestions={filteredFillInTheBlanksQuestions}
                    filteredMultiFillInTheBlanksQuestions={filteredMultiFillInTheBlanksQuestions}
                    filteredMultipleShortQuestions={filteredMultipleShortQuestions}
                    filteredSequenceQuestions={filteredSequenceQuestions}
                    filteredMultipleTrueFalseQuestions={filteredMultipleTrueFalseQuestions}
                    filteredMultipleQuestionV2Questions={filteredMultipleQuestionV2Questions}
                    setVisible={setVisible}
                />
            </Dialog>
        </div>
    );
};

export default SubmitAssignment;
