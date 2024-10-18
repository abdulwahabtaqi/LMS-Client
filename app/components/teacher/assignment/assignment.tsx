'use client';

import { useEffect, useState } from 'react';
import getTeacherAssign from '../../../context/server/assignment/getTeacherAssignment';
import { verifyToken } from '../../../shared/common';
import { User } from '../../../shared/types';
import NewAssignment from './../../../components/newAssignment/newAssignment';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import './Assignment.css';

const Assignment = () => {
    const [user, setUser] = useState<User | null>(null);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [showNewAssignment, setShowNewAssignment] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    useEffect(() => {
        const getAssignments = async () => {
            const userData = verifyToken(localStorage?.getItem('lms-token') as string) as User;
            setUser(userData);

            const result = await getTeacherAssign(userData?.id);
            console.log(result);
            if (result?.status) {
                setAssignments(result.result.data || []);
            }
        };
        getAssignments();
    }, []);

    const handleCreateAssignmentClick = () => {
        setShowNewAssignment(!showNewAssignment);
    };

    const handleViewAssignment = (assignmentId: string) => {
        router.push(`/lms/teacher/assignment/${assignmentId}`);
    };

    const handleDeleteAssignment = async (assignmentId: string) => {
        // Here, you should implement the delete logic, possibly sending a request to delete the assignment.
        setAssignments(assignments.filter((assignment) => assignment.id !== assignmentId));
    };

    const uniqueGrades = [...new Set(assignments.map((assignment: any) => assignment.grade))];
    const uniqueSubjects = [...new Set(assignments.map((assignment: any) => assignment.subject))];

    const filteredAssignments = assignments.filter((assignment) => {
        const matchesGrade = selectedGrade ? assignment.grade === selectedGrade : true;
        const matchesSubject = selectedSubject ? assignment.subject === selectedSubject : true;
        const matchesSearchTerm = searchTerm
            ? assignment.titles.some((title: any) => (title.name && title.name.toLowerCase().includes(searchTerm.toLowerCase())) || (title.description && title.description.toLowerCase().includes(searchTerm.toLowerCase())))
            : true;

        return matchesGrade && matchesSubject && matchesSearchTerm;
    });

    const handleResetFilters = () => {
        setSelectedGrade(null);
        setSelectedSubject(null);
        setSearchTerm('');
    };

    return (
        <div className="assignment-container">
            <h1>Assignments</h1>
            <div className="top-bar">
                <div className="filters ">
                    <Dropdown value={selectedGrade} options={uniqueGrades.map((grade) => ({ label: grade, value: grade }))} onChange={(e) => setSelectedGrade(e.value)} placeholder="Select Grade" />
                    <Dropdown value={selectedSubject} options={uniqueSubjects.map((subject) => ({ label: subject, value: subject }))} onChange={(e) => setSelectedSubject(e.value)} placeholder="Select Subject" />
                    <InputText value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by title or description" />
                </div>
                <div className="buttons my-4">
                    <Button label="Reset Filters" onClick={handleResetFilters} className="reset-button" />
                    <Button label={showNewAssignment ? 'Cancel' : 'Create Assignment'} icon="pi pi-plus" onClick={handleCreateAssignmentClick} className="create-button" />
                </div>
            </div>

            {filteredAssignments.length > 0 ? (
                <ul className="assignment-list">
                    {filteredAssignments.map((assignment) => (
                        <li key={assignment.id} className="assignment-item">
                            <h3>Titles:</h3>
                            {assignment.titles.length > 0 ? (
                                <ul>
                                    {assignment.titles.map((title: any, index: number) => (
                                        <p key={index}>
                                            {index + 1}. <span style={{ fontWeight: 'bold', fontSize: '17px' }}> {title.name}</span>
                                        </p>
                                    ))}
                                </ul>
                            ) : (
                                'No Title Available'
                            )}
                            <p>
                                <strong>Grade:</strong> {assignment.grade}
                            </p>
                            <p>
                                <strong>Subject:</strong> {assignment.subject}
                            </p>
                            <p>
                                <strong>Created At:</strong> {new Date(assignment.createdAt).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Last Date to Submit:</strong> {new Date(assignment.lastSubmissionDate).toLocaleDateString()} {/* Updated here */}
                            </p>
                            <p>
                                <strong>Total Marks:</strong> {assignment.totalMarks} {/* Display totalMarks here */}
                            </p>
                            <div className="assignment-buttons">
                                <Button label="View" onClick={() => handleViewAssignment(assignment.id)} className="view-button" />
                                <Button label="Delete" onClick={() => handleDeleteAssignment(assignment.id)} className="delete-button" severity="danger" />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No assignments available.</p>
            )}

            {showNewAssignment && (
                <>
                    <div className="modal-overlay" onClick={() => setShowNewAssignment(false)}></div>
                    <div className="new-assignment-modal">
                        <NewAssignment />
                    </div>
                </>
            )}
        </div>
    );
};

export default Assignment;
