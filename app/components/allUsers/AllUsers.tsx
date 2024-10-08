'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast'; // Import Toast
import getAllUsers from '../../context/server/users/getUsers';
import { useRouter } from 'next/navigation';
import deleteUser from '../../context/server/users/deleteUser';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

const AllUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();
    const toastRef = useRef<Toast>(null); // Reference for Toast

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await getAllUsers();
                setUsers(result.result.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    const viewProfile = (userId: string) => {
        router.push(`/lms/admin/users/${userId}`);
    };

    const deleteProfile = async (userId: string) => {
        try {
            const result = await deleteUser(userId);
            console.log(result);
            setUsers(users.filter((user) => user.id !== userId));
            // Show success toast
            toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'User deleted successfully!', life: 3000 });
        } catch (err) {
            console.error(err);
            // Show error toast
            toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete user!', life: 3000 });
        }
    };

    const viewProfileTemplate = (rowData: User) => <Button label="View" icon="pi pi-user" className="p-button-info" onClick={() => viewProfile(rowData.id)} />;

    const deleteTemplate = (rowData: User) => <Button label="Delete" icon="pi pi-times" className="p-button-danger" onClick={() => deleteProfile(rowData.id)} />;

    const localDateTemplate = (rowData: User) => {
        const localDate = new Date(rowData.createdAt).toLocaleString();
        return <span>{localDate}</span>;
    };

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    return (
        <div className="card">
            <Toast ref={toastRef} /> {/* Add Toast component */}
            <DataTable
                value={users}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}
            >
                <Column field="name" header="Name" style={{ width: '20%' }} />
                <Column field="email" header="Email" style={{ width: '25%' }} />
                <Column field="role" header="Role" style={{ width: '15%' }} />
                <Column body={localDateTemplate} header="Created At" style={{ width: '20%' }} />
                <Column body={viewProfileTemplate} header="View Profile" style={{ width: '10%' }} />
                <Column body={deleteTemplate} header="Delete" style={{ width: '10%' }} />
            </DataTable>
        </div>
    );
};

export default AllUsers;
