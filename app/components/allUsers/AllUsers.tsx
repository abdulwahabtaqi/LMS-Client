'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import getAllUsers from '../../context/server/users/getUsers';
import { useRouter } from 'next/navigation';
import deleteUser from '../../context/server/users/deleteUser';
import { Dialog } from 'primereact/dialog';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    approved: boolean;
}

const AllUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [visible, setVisible] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
    const router = useRouter();
    const toastRef = useRef<Toast>(null);

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

    const deleteProfile = async () => {
        if (userIdToDelete) {
            try {
                await deleteUser(userIdToDelete);
                setUsers(users.filter((user) => user.id !== userIdToDelete));
                toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'User deleted successfully!', life: 3000 });
            } catch (err) {
                console.error(err);
                toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete user!', life: 3000 });
            }
            setVisible(false); // Hide dialog after deletion
        }
    };

    const confirmDelete = (userId: string) => {
        setUserIdToDelete(userId);
        setVisible(true); // Show confirmation dialog
    };

    const viewProfileTemplate = (rowData: User) => <Button label="View" icon="pi pi-user" className="p-button-info" onClick={() => viewProfile(rowData.id)} />;

    const deleteTemplate = (rowData: User) => <Button label="Delete" icon="pi pi-times" className="p-button-danger" onClick={() => confirmDelete(rowData.id)} />;

    const localDateTemplate = (rowData: User) => {
        const localDate = new Date(rowData.createdAt).toLocaleString();
        return <span>{localDate}</span>;
    };

    const approvalStatusTemplate = (rowData: User) => {
        const status = rowData.approved ? 'Approved' : 'Pending';
        const bgColor = rowData.approved ? 'green' : 'orange';
        const textColor = 'white';

        return (
            <span
                style={{
                    backgroundColor: bgColor,
                    color: textColor,
                    width: '5rem',
                    height: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}
            >
                {status}
            </span>
        );
    };

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    return (
        <div className="card">
            <Toast ref={toastRef} />
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
                <Column body={approvalStatusTemplate} header="Status" style={{ width: '15%' }} />
                <Column body={viewProfileTemplate} header="View Profile" style={{ width: '10%' }} />
                <Column body={deleteTemplate} header="Delete" style={{ width: '10%' }} />
            </DataTable>

            <Dialog header="Confirm Deletion" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
                <p>Are you sure you want to delete this user?</p>
                <div className="flex justify-content-end">
                    <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
                    <Button label="Yes" icon="pi pi-check" onClick={deleteProfile} autoFocus />
                </div>
            </Dialog>
        </div>
    );
};

export default AllUsers;
