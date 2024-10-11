import { Fragment } from 'react';
import Teachers from '../../../../../components/teachers/teachers';

const Connection = () => {
    return (
        <Fragment>
            <div className="p-grid">
                <div className="p-col-12">
                    <h1>Connections</h1>
                    <Teachers />
                </div>
            </div>
        </Fragment>
    );
};

export default Connection;
