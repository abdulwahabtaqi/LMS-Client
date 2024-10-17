'use client';
import React, { useEffect, useState } from 'react';
import { verifyToken } from '../../shared/common';
import { User } from '../../shared/types';
import { useParams } from 'next/navigation';
import getAssignDetail from '../../context/server/assignment/getAssignmentDet';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css'; // Choose a theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons

const SingleAssignment = () => {
    const [user, setUser] = useState<User | null>(null); // Initialize as null
    const { id } = useParams();
    const [assignmentDetail, setAssignmentDetail] = useState<any>(null); // Store assignment details
    const [loading, setLoading] = useState(true); // Loading state

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'lms-server-production-3667.up.railway.app';
    console.log();

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

                if (result.status) {
                    setAssignmentDetail(result.result.data);
                } else {
                    console.error(result.message);
                }
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchAssignment();
    }, [user]); // Add user as a dependency

    if (loading) return <div>Loading...</div>; // Show loading indicator while fetching

    if (!assignmentDetail) {
        return <div>No assignment found.</div>; // Handle case where no assignment details are found
    }

    console.log(assignmentDetail);
    return (
        <div>
            <h2>{assignmentDetail.title}</h2>
            <p>{assignmentDetail.description}</p>
            <p>
                <strong>Subject:</strong> {assignmentDetail.subject}
            </p>
            <p>
                <strong>Grade:</strong> {assignmentDetail.grade}
            </p>
            <p>
                <strong>Created At:</strong> {new Date(assignmentDetail.createdAt).toLocaleString()}
            </p>
            <p>
                <strong>Updated At:</strong> {new Date(assignmentDetail.updatedAt).toLocaleString()}
            </p>

            <h3>Submissions</h3>
            <DataTable value={assignmentDetail.submissions} tableStyle={{ minWidth: '50rem' }}>
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
            </DataTable>
        </div>
    );
};

export default SingleAssignment;
