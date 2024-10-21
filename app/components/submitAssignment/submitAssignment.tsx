'use client';

import { useEffect, useState } from 'react';
import getSubmitAssign from '../../context/server/assignment/getSubmitAssignment';
import { verifyToken } from '../../shared/common';
import { User } from '../../shared/types';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import submitAssignment from '../../context/server/assignment/submitAssignment';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload'; // PrimeReact FileUpload component
import './SubmitAssignment.css';
import Analytics from './../analytics/Analytics';

// Helper function to convert file to Base64
const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

const SubmitAssignment = () => {
    const [user, setUser] = useState<User | null>(null);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [analytics, setAnalytics] = useState(false);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const fetchAssignments = async () => {
            const userData = verifyToken(localStorage?.getItem('lms-token') as string) as User;
            setUser(userData);

            const result = await getSubmitAssign(userData?.id);
            if (result?.status) {
                setAssignments(result.result.data || []);
                console.log(result);
            }
        };
        fetchAssignments();
    }, []);

    const handleFileUpload = (e: any) => {
        setSelectedFile(e.files[0]);
    };

    const handleSubmit = async (assignmentId: string) => {
        if (!selectedFile) {
            toast.current?.show({ severity: 'warn', summary: 'Warning', detail: 'Please select a file before submitting.', life: 3000 });
            return;
        }

        // Convert file to Base64
        const allowedFormats = ['.pdf', '.doc', '.docx'];
        const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();

        if (!allowedFormats.includes(fileExtension)) {
            toast.current?.show({ severity: 'warn', summary: 'Invalid Format', detail: 'Only .pdf, .doc, .docx files are allowed.', life: 3000 });
            return;
        }

        setSubmitting(true);

        try {
            const base64File = await convertFileToBase64(selectedFile);
            const result = await submitAssignment(user?.id as string, assignmentId, base64File);

            if (result?.status) {
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Assignment submitted successfully!', life: 3000 });
                setSelectedFile(null);
            } else {
                toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error submitting the assignment.', life: 3000 });
            }
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error submitting the file.', life: 3000 });
            console.error('Error submitting the file:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const uniqueGrades = [...new Set(assignments?.map((assignment: any) => assignment?.grade))];
    const uniqueSubjects = [...new Set(assignments?.map((assignment: any) => assignment?.subject))];

    const filteredAssignments = assignments?.filter((assignment) => {
        const matchesGrade = selectedGrade ? assignment.grade === selectedGrade : true;
        const matchesSubject = selectedSubject ? assignment.subject === selectedSubject : true;
        const matchesSearchTerm = assignment.titles.some((title: any) => title.name.toLowerCase().includes(searchTerm.toLowerCase()) || (title.description && title.description.toLowerCase().includes(searchTerm.toLowerCase())));
        const matchesStatus = selectedStatus === 'All' || assignment.status === selectedStatus;

        return matchesGrade && matchesSubject && matchesSearchTerm && matchesStatus;
    });

    const handleResetFilters = () => {
        setSelectedGrade(null);
        setSelectedSubject(null);
        setSearchTerm('');
        setSelectedStatus('All');
    };

    return (
        <div className="assignment-container">
            <Toast ref={toast} />
            <h1 className="page-title">Submit Assignments</h1>
            <div className="top-bar">
                {!analytics && (
                    <div className="filters">
                        <Dropdown value={selectedGrade} options={uniqueGrades.map((grade) => ({ label: grade, value: grade }))} onChange={(e) => setSelectedGrade(e.value)} placeholder="Select Grade" />
                        <Dropdown value={selectedSubject} options={uniqueSubjects.map((subject) => ({ label: subject, value: subject }))} onChange={(e) => setSelectedSubject(e.value)} placeholder="Select Subject" />
                        <Dropdown
                            value={selectedStatus}
                            options={[
                                { label: 'All', value: 'All' },
                                { label: 'Submitted', value: 'Submitted' },
                                { label: 'Pending', value: 'Pending' }
                            ]}
                            onChange={(e) => setSelectedStatus(e.value)}
                            placeholder="Select Status"
                        />
                        <InputText value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by title or description" />
                    </div>
                )}
                <div className="buttons my-4 flex gap-6">
                    {!analytics && <Button label="Reset Filters" onClick={handleResetFilters} className="reset-button p-button-outlined" />}
                    <Button label={analytics ? 'Back to Assignments' : 'View Analytics'} onClick={() => setAnalytics(!analytics)} className="analytics-button p-button-secondary" />
                </div>
            </div>
            {analytics ? (
                <Analytics assignments={assignments} />
            ) : (
                <>
                    {' '}
                    {filteredAssignments.length > 0 ? (
                        <div className="assignment-list">
                            {filteredAssignments.map((assignment) => {
                                const isPastDueDate = new Date() > new Date(assignment.lastSubmissionDate); // Check if the date has passed
                                return (
                                    <div key={assignment.id} className="assignment-item">
                                        <div className="assignment-header">
                                            {assignment.titles.map((title: any, index: number) => (
                                                <div key={index}>
                                                    <h3>{title.name}</h3>
                                                    {title.description && <p>{title.description}</p>}
                                                </div>
                                            ))}
                                            <span className={`assignment-status ${assignment.status.toLowerCase()}`}>{assignment.status}</span>
                                        </div>
                                        <div className="assignment-details">
                                            <p>
                                                <strong>Grade:</strong> {assignment.grade}
                                            </p>
                                            <p>
                                                <strong>Subject:</strong> {assignment.subject}
                                            </p>
                                            <p>
                                                <strong>Teacher:</strong> {assignment.teacher}
                                            </p>
                                            <p>
                                                <strong>Total Marks:</strong> {assignment.totalMarks}
                                            </p>
                                            <p>
                                                <strong>Last Submission Date:</strong> <span style={{ color: isPastDueDate ? 'red' : 'inherit' }}>{new Date(assignment.lastSubmissionDate).toLocaleDateString()}</span>
                                            </p>
                                            <p>
                                                <strong>Created At:</strong> {new Date(assignment.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                        {assignment.status === 'Submitted' ? (
                                            <div className="submitted-info">
                                                <p>
                                                    <strong>Submitted At:</strong> {new Date(assignment.submittedAt).toLocaleString()}
                                                </p>
                                                <p className="marks-container">
                                                    <strong>Marks Obtained:</strong>
                                                    <span className="marks-value">{assignment.marks} </span>
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                {!isPastDueDate ? ( // Only show if the date hasn't passed
                                                    <>
                                                        <FileUpload
                                                            name="file"
                                                            customUpload
                                                            auto
                                                            mode="basic"
                                                            chooseLabel="Upload Assignment"
                                                            uploadHandler={handleFileUpload}
                                                            className="file-upload"
                                                            accept=".pdf,.doc,.docx"
                                                            chooseOptions={{ icon: 'pi pi-file', label: 'Upload Assignment' }}
                                                        />
                                                        <Button
                                                            style={{ width: 'max-content', margin: 'auto' }}
                                                            label={submitting ? 'Submitting...' : 'Submit Assignment'}
                                                            onClick={() => handleSubmit(assignment.id)}
                                                            disabled={submitting}
                                                            className="submit-button my-2"
                                                        />
                                                    </>
                                                ) : (
                                                    <p style={{ color: 'red', fontWeight: 'bold' }}>Submission period has ended for this assignment.</p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p>No assignments available for submission.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default SubmitAssignment;
