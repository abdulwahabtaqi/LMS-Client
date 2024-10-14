'use client';
import { Fragment, useEffect, useState } from 'react';
import getUser from '../../../../../context/server/users/getUser';
import updateUser from '../../../../../context/server/users/updateUser';
import './User.css';
import Loader from '../../../../../components/loader/Loader';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';

interface UserParams {
    params: {
        id: string;
    };
}

const User = ({ params }: UserParams) => {
    const router = useRouter();
    const { id } = params;
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [password, setPassword] = useState<string>('');
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
            const updateData = { name, email, role, password };
            if (password) {
                updateData.password = password;
            }
            await updateUser(id, updateData);
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
            <div className="">
                <div style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row-reverse' }} className="flex ">
                    <Button className="p-button-sm" onClick={() => router.back()}>
                        Back
                    </Button>
                    {user && (
                        <h1 className="text-xl">
                            Users/ <span className="text-gray-800">{name}</span>
                        </h1>
                    )}
                </div>
                <h1 className="user-title">User Details</h1>
                {user ? (
                    <div className="user-card mx-auto">
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
                        <div className="form-group">
                            <label htmlFor="password">Password (optional):</label> {/* New password field */}
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter new password" />
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
