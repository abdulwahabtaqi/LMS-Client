import { Fragment } from 'react';
import AllUsers from './../../../../components/allUsers/AllUsers';

const Users = () => {
    return (
        <Fragment>
            <div className="p-grid">
                <div className="p-col-12">
                    <h1>Users</h1>
                    <AllUsers />
                </div>
            </div>
        </Fragment>
    );
};

export default Users;
