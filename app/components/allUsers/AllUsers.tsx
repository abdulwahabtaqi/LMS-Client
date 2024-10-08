'use client';
import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface User {
    name: string;
    country: {
        name: string;
    };
    company: string;
    representative: {
        name: string;
    };
}

const AllUsers: React.FC = () => {
    const [customers, setCustomers] = useState<User[]>([]);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    const usersData: User[] = [
        { name: 'John Doe', country: { name: 'USA' }, company: 'ABC Inc.', representative: { name: 'Jane Smith' } },
        { name: 'Anna Johnson', country: { name: 'Canada' }, company: 'XYZ Ltd.', representative: { name: 'Bob Brown' } },
        { name: 'Mike Lee', country: { name: 'UK' }, company: 'Tech Corp', representative: { name: 'Alice Green' } },
        { name: 'Sara White', country: { name: 'Germany' }, company: 'Global Ventures', representative: { name: 'David Blue' } },
        { name: 'Lucas King', country: { name: 'Australia' }, company: 'Oceanic Enterprises', representative: { name: 'Eve Black' } }
    ];

    useEffect(() => {
        setCustomers(usersData);
    }, []);

    return (
        <div className="card">
            <DataTable
                value={customers}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}
            >
                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                <Column field="country.name" header="Country" style={{ width: '25%' }}></Column>
                <Column field="company" header="Company" style={{ width: '25%' }}></Column>
                <Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    );
};

export default AllUsers;
