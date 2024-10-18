'use client';
import React, { useEffect, useState, useRef } from 'react';
import { verifyToken } from '../../shared/common';
import { User } from '../../shared/types';
import { useParams } from 'next/navigation';
import getAssignDetail from '../../context/server/assignment/getAssignmentDet';
import gradeAssignment from '../../context/server/assignment/gradeAssigment';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber'; // For marks input
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast'; // Import Toast component

const SingleAssignment = () => {
    const [user, setUser] = useState<User | null>(null); // Initialize as null
    const { id } = useParams();
    const [assignmentDetail, setAssignmentDetail] = useState<any>(null); // Store assignment details
    const [loading, setLoading] = useState(true); // Loading state
    const [submissions, setSubmissions] = useState<any[]>([]); // Store updated submissions with marks
    const [marksState, setMarksState] = useState<{ [key: string]: number }>({}); // Store temporary marks for each student

    const toastRef = useRef<Toast>(null); // Create a ref for Toast

    useEffect(() => {
        const userData = verifyToken(localStorage?.getItem('lms-token') as string) as User;
        setUser(userData);
    }, []);

    useEffect(() => {
        const fetchAssignment = async () => {
            if (user) {
                const result = await getAssignDetail({
                    assignmentId: id,
                    userId: user.id
                });
                console.log(result.result.data);

                if (result.status) {
                    setAssignmentDetail(result.result.data);
                    setSubmissions(result.result.data.submissions);
                } else {
                    console.error(result.message);
                }
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchAssignment();
    }, [user]);

    const handleGrade = async (submissionId: string) => {
        const marks = marksState[submissionId]; // Get the marks from local state
        if (marks === undefined || marks === null) return; // Ensure marks are provided

        // Check if marks exceed total marks
        if (marks > assignmentDetail.totalMarks) {
            toastRef.current?.show({ severity: 'error', summary: 'Error', detail: `Marks cannot exceed ${assignmentDetail.totalMarks}`, life: 3000 });
            return; // Prevent submission if marks exceed total
        }

        // Send the grading request to the server
        const result = await gradeAssignment({
            assignmentId: id,
            studentId: submissionId,
            marks
        });

        if (result.status) {
            setSubmissions((prevSubmissions) => prevSubmissions.map((sub) => (sub.studentId === submissionId ? { ...sub, marks } : sub)));
            toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'Marks assigned successfully', life: 3000 });
        } else {
            console.error(result.message);
            // toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to assign marks', life: 3000 });
        }
    };

    const handleMarksChange = (studentId: string, value: number) => {
        setMarksState((prevState) => ({
            ...prevState,
            [studentId]: value // Update the marks for a specific student
        }));
    };

    if (loading) return <div>Loading...</div>;

    if (!assignmentDetail) {
        return <div>No assignment found.</div>;
    }

    return (
        <div>
            <Toast ref={toastRef} /> {/* Add Toast component */}
            <h2>{assignmentDetail.titles[0].name}</h2>
            <p>{assignmentDetail.titles[0].description}</p>
            <p>
                <strong>Subject:</strong> {assignmentDetail.subject}
            </p>
            <p>
                <strong>Grade:</strong> {assignmentDetail.grade}
            </p>
            <p>
                <strong>Total Marks:</strong> {assignmentDetail.totalMarks}
            </p>
            <p>
                <strong>Last Submission Date:</strong> {new Date(assignmentDetail.lastSubmissionDate).toLocaleDateString()}
            </p>
            <h3>Submissions</h3>
            <DataTable value={submissions} tableStyle={{ minWidth: '50rem' }}>
                <Column field="studentName" header="Submitted By" />
                <Column field="submittedAt" header="Submission Time" body={(rowData) => new Date(rowData.submittedAt).toLocaleString()} />
                <Column
                    header="Download"
                    body={(rowData) => (
                        <a href={`${rowData.fileUrl}`} download>
                            <i className="pi pi-download"></i> Download
                        </a>
                    )}
                />
                <Column
                    header="Marks"
                    body={(rowData) => (
                        <InputNumber
                            value={marksState[rowData.studentId] ?? (rowData.marks || 0)} // Display saved or default marks
                            onChange={(e) => handleMarksChange(rowData.studentId, e.value ?? 0)} // Save the marks in local state
                            min={0}
                            max={assignmentDetail.totalMarks} // Set the max to totalMarks
                        />
                    )}
                />
                <Column
                    body={(rowData) => (
                        <Button
                            label="Submit Marks"
                            onClick={() => handleGrade(rowData.studentId)} // Submit marks only on button click
                        />
                    )}
                />
            </DataTable>
        </div>
    );
};

export default SingleAssignment;
