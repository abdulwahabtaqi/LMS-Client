import React from 'react';
import Assignment from '../../../../components/teacher/assignment/assignment';

const Assignments = () => {
    return (
        <>
            <div className="p-grid">
                <div className="p-col-12">
                    <h1>Assignments</h1>
                    <Assignment />
                </div>
            </div>
        </>
    );
};

export default Assignments;
