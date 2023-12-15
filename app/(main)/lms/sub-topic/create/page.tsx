'use client';

import React from 'react';
import PageHeader from '../../../../components/pageHeader';
import ViewTopic from '../view/page';
import AddAndEditSubTopic from '../../../../components/subTopic/addAndEditSubTopic';

const AddSubTopic = () => {
    return (
        <div className="grid">
            <PageHeader title="Grade" />
            <div className="col-12">
                <AddAndEditSubTopic isNew={true} />
            </div>
            <div className="col-12">
                <ViewTopic />
            </div>
        </div>
    );
};

export default AddSubTopic;
