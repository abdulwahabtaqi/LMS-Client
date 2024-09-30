import { Fragment } from 'react';
import Mcqimg from '../../../../../components/mcqimg/mcqimg';

const page = () => {
    return (
        <Fragment>
            <div className="p-grid">
                <div className="p-col-12">
                    <h1>Media</h1>
                    <Mcqimg />
                </div>
            </div>
        </Fragment>
    );
};

export default page;
