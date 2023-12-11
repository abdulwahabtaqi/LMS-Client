'use client';

import React, { useState } from 'react';
import AddAndEditSchool from '../../../../components/school/addAndEditSchool';
import PageHeader from '../../../../components/pageHeader';
import { SchoolModel } from '../../../../components/school/types/schoolModel';



const EditSchool = () => {
    const [school, setSchool] = useState<SchoolModel>({} as SchoolModel);
    return (
        <div className="grid">
            <PageHeader title="School / Add" />
            <div className="col-12">
                <AddAndEditSchool isNew={true} school={{type:"demo"}} />
            </div>
        </div>
    );
};

export default EditSchool;
