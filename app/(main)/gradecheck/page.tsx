/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import PageHeader from '../../components/pageHeader';
import ViewSchool from './view/view';
import AddAndEditGrade from '../../components/grade/addAndEditGrade';

const AddGrade = () => {
    return (
        <div className="grid">
            <PageHeader title="Grade" />
            <div className="col-12">
                <AddAndEditGrade isNew={true} />
            </div>
            <div className="col-12">
                <ViewSchool />
            </div>
        </div>
    );
};

export default AddGrade;
