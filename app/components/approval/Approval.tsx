'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import getPendingUsers from '../../context/server/users/getPendingUser';
import deleteUser from '../../context/server/users/deleteUser';
import approveUser from '../../context/server/users/approveUser'; // Assuming you have an approveUser function

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

const Approval = () => {
    const [pendingUsers, setPendingUsers] = useState<User[]>([]);
    const toastRef = useRef<Toast>(null);

    useEffect(() => {
        const fetchPendingUsers = async () => {
            try {
                const result = await getPendingUsers();
                setPendingUsers(result.result.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchPendingUsers();
    }, []);

    const approveUserProfile = async (userId: string) => {
        try {
            await approveUser(userId);
            setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
            toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'User approved successfully!', life: 3000 });
        } catch (error) {
            console.log(error);
            toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to approve user!', life: 3000 });
        }
    };

    const deleteProfile = async (userId: string) => {
        try {
            await deleteUser(userId);
            setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
            toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'User deleted successfully!', life: 3000 });
        } catch (error) {
            console.log(error);
            toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete user!', life: 3000 });
        }
    };

    const approveTemplate = (rowData: User) => <Button label="Approve" icon="pi pi-check" className="p-button-success" onClick={() => approveUserProfile(rowData.id)} />;

    const deleteTemplate = (rowData: User) => <Button label="Delete" icon="pi pi-times" className="p-button-danger" onClick={() => deleteProfile(rowData.id)} />;

    const localDateTemplate = (rowData: User) => {
        const localDate = new Date(rowData.createdAt).toLocaleString();
        return <span>{localDate}</span>;
    };

    return (
        <div className="card">
            <Toast ref={toastRef} />
            <DataTable
                value={pendingUsers}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
            >
                <Column field="name" header="Name" style={{ width: '25%' }} />
                <Column field="email" header="Email" style={{ width: '25%' }} />
                <Column field="role" header="Role" style={{ width: '20%' }} />
                <Column body={localDateTemplate} header="Created At" style={{ width: '20%' }} />
                <Column body={approveTemplate} header="Approve" style={{ width: '10%' }} />
                <Column body={deleteTemplate} header="Delete" style={{ width: '10%' }} />
            </DataTable>
        </div>
    );
};

export default Approval;
