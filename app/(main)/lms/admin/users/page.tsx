'use client';
import { Fragment, useState } from 'react';
import AllUsers from './../../../../components/allUsers/AllUsers';
import Approval from './../../../../components/approval/Approval';
import { Button } from 'primereact/button';

const Users = () => {
    const [showUsers, setShowUsers] = useState(false);

    const handleToggle = (isUsers: boolean) => {
        setShowUsers(isUsers);
    };

    return (
        <Fragment>
            <div className="p-grid">
                <div className="p-col-12 flex justify-content-end mb-3">
                    <Button label="Users" onClick={() => handleToggle(true)} className="mr-2" />
                    <Button label="Approval" onClick={() => handleToggle(false)} />
                </div>
                <div className="p-col-12">{showUsers ? <AllUsers /> : <Approval />}</div>
            </div>
        </Fragment>
    );
};

export default Users;
