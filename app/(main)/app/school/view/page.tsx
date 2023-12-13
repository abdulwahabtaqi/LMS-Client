import React, { useEffect, useState } from 'react'
import { School } from '../../../../shared/types'
import DataTableRenderer from '../../../../shared/components/Datatable/DatatableRenderer'
import { TableColumns } from '../../../../shared/components/Datatable/types'
import { Dialog } from 'primereact/dialog'
import AddAndEditSchool from '../../../../components/school/addAndEditSchool'
import fetchSchoolsHandler from '../../../../context/server/school/fetchSchoolsHandler'
import { useAppContext } from '../../../../../layout/context/layoutcontext'
import { Button } from 'primereact/button'
import { convertTimeStamps } from '../../../../shared/common'


const ViewSchool = () => {
    const g = useAppContext();
    const [schools, setSchools] = useState<School[]>([] as School[]);
    const [school, setSchool] = useState<School>({} as School);
    const [visible, setVisible] = useState<boolean>(false);

    const editSchool = (school: School) => {
        setSchool(school);
        setVisible(true);
    };
    const fetchSchools = async () => {
        try {
            const response = await fetchSchoolsHandler();
            if (response?.status) {
                setSchools(response?.result?.data as School[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Schools" });
        }
    };
    const tableColumns: TableColumns[] = [
        {
            header: 'School Type',
            field: 'type',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Created At',
            field: 'createdAt',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Last Updated',
            field: 'updatedAt',
            sortable: true,
            style: { width: '15rem' },
        },
        {
            header: 'Action',
            field: 'action',
            style: { width: '15rem' },
        },
    ];
    useEffect(() => {
        fetchSchools();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        let newSchools = [] as School[];
        schools?.forEach(x => {
            newSchools?.push({ ...x, 
                action: <Button label="Edit" className="p-button-info" onClick={() => editSchool(x)
            } />, 
            createdAt: convertTimeStamps(x?.createdAt), 
            updatedAt: convertTimeStamps(x?.updatedAt)
        })
        });
        setSchools(newSchools);
    }, [schools]);
    return (
        <>
            <div className="grid">
                <Dialog visible={visible} maximizable style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <AddAndEditSchool schools={schools} setSchools={setSchools} isNew={false} school={school} />
                </Dialog>
                <div className="col-12">
                    {schools.length > 0 && <DataTableRenderer<School> data={schools} tableColumns={tableColumns} />}
                </div>
            </div>
        </>
    )
}

export default ViewSchool