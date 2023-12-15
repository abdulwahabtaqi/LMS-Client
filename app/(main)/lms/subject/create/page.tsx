'use client';

import React from 'react';
import PageHeader from '../../../../components/pageHeader';
import ViewSubject from '../view/page';
import AddAndEditSubject from '../../../../components/subject/addAndEditSubject';

const AddSubject = () => {
    return (
        <div className="grid">
            <PageHeader title="Grade" />
            <div className="col-12">
                <AddAndEditSubject isNew={true} />
            </div>
            <div className="col-12">
                <ViewSubject />
            </div>
        </div>
    );
};

export default AddSubject;
