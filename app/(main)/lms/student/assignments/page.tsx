import { Fragment } from 'react';
import SubmitAssignment from './../../../../components/submitAssignment/submitAssignment';

const Assignment = () => {
    return (
        <Fragment>
            <div className="p-grid">
                <div className="p-col-12">
                    <h1>Assigments</h1>
                    <SubmitAssignment />
                </div>
            </div>
        </Fragment>
    );
};

export default Assignment;
