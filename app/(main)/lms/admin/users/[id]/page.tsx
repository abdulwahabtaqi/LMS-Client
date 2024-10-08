'use client';
import { Fragment, useEffect, useRef, useState } from 'react';
import getUser from '../../../../../context/server/users/getUser';
import updateUser from '../../../../../context/server/users/updateUser';
import './User.css'; // Importing the custom CSS file
import Loader from '../../../../../components/loader/Loader';

interface UserParams {
    params: {
        id: string;
    };
}

const User = ({ params }: UserParams) => {
    const { id } = params;
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [roles] = useState<string[]>(['USER', 'ADMIN', 'TEACHER']);
    const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await getUser(id);
                setUser(result.result.data);
                setName(result.result.data.name);
                setEmail(result.result.data.email);
                setRole(result.result.data.role);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await updateUser(id, { name, email, role });
            setToast({ show: true, message: 'User updated successfully!', type: 'success' });
            const updatedUser = { ...user, name, email, role };
            setUser(updatedUser);
        } catch (error) {
            console.log(error);
            setToast({ show: true, message: 'Failed to update user!', type: 'error' });
        }
    };

    return (
        <Fragment>
            <div className="user-container">
                <h1 className="user-title">User Details</h1>
                {toast && toast.show && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
                {user ? (
                    <div className="user-card">
                        <h2 className="user-info-title">User Information</h2>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role:</label>
                            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="form-control">
                                <option value="">Select Role</option>
                                {roles.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={handleUpdate} className="btn btn-success w-100">
                            Update
                        </button>
                    </div>
                ) : (
                    <Loader />
                )}
            </div>
        </Fragment>
    );
};

export default User;
