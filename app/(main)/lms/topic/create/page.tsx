'use client';

import React from 'react';
import PageHeader from '../../../../components/pageHeader';
import ViewSubject from '../view/page';
import AddAndEditTopic from '../../../../components/topic/addAndEditTopic';
import ViewTopic from '../view/page';

const AddTopic = () => {
    return (
        <div className="grid">
            <PageHeader title="Grade" />
            <div className="col-12">
                <AddAndEditTopic isNew={true} />
            </div>
            <div className="col-12">
                <ViewTopic />
            </div>
        </div>
    );
};

export default AddTopic;
