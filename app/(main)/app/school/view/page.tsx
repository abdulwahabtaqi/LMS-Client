import React, { useEffect, useState } from 'react'
import PageHeader from '../../../../components/pageHeader'
import { School } from '../../../../shared/types'
import DataTableRenderer from '../../../../shared/components/Datatable/DatatableRenderer'
import { TableColumns } from '../../../../shared/components/Datatable/types'


const ViewSchool = () => {
    const [schools, setSchools] = useState<School[]>([] as School[]);

    const tableColumns: TableColumns[] = [
        {
            header: 'School Type',
            field: 'type',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Created Date',
            field: 'createdAt',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Updated Date',
            field: 'updatedAt',
            sortable: true,
            style: { width: '15rem' },
        },
    ];
    useEffect(() => {
        setSchools([
            {
                id: "abc",
                grades: [],
                type: "demo",
                createdAt: '14-Nov-2023',
                updatedAt: '14-Nov-2023',
            },
            {
                id: "abc",
                grades: [],
                type: "demo",
                createdAt: '14-Nov-2023',
                updatedAt: '14-Nov-2023',
            },
            {
                id: "abc",
                grades: [],
                type: "demo",
                createdAt: '14-Nov-2023',
                updatedAt: '14-Nov-2023',
            },
            {
                id: "abc",
                grades: [],
                type: "demo",
                createdAt: '14-Nov-2023',
                updatedAt: '14-Nov-2023',
            },
            {
                id: "abc",
                grades: [],
                type: "demo",
                createdAt: '14-Nov-2023',
                updatedAt: '14-Nov-2023',
            },
            {
                id: "abc",
                grades: [],
                type: "demo",
                createdAt: '14-Nov-2023',
                updatedAt: '14-Nov-2023',
            },
            {
                id: "abc",
                grades: [],
                type: "demo",
                createdAt: '14-Nov-2023',
                updatedAt: '14-Nov-2023',
            },
            {
                id: "abc",
                grades: [],
                type: "demo",
                createdAt: '14-Nov-2023',
                updatedAt: '14-Nov-2023',
            },
        ]);
    }, [])
    return (
        <>
            <div className="grid">
                {/* <PageHeader title="School / Add" /> */}
                <div className="col-12">
                    {schools.length > 0 && <DataTableRenderer<School> data={schools} tableColumns={tableColumns} />}
                </div>
            </div>
        </>
    )
}

export default ViewSchool