'use client';

import { useEffect, useRef, useState } from 'react';
import { verifyToken } from '../../../shared/common';
import { User } from '../../../shared/types';
import getUser from '../../../context/server/users/getUser';
import updateProfile from '../../../context/server/users/updateProfile';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import './Profile.css';
import image from './../../../../public/images/user.png';
import Image from 'next/image';

const Profile = () => {
    const [user, setUser] = useState({} as User);
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const token = localStorage.getItem('lms-token');
        const userData = verifyToken(token as string) as User;

        const fetchUser = async () => {
            const userDetail = await getUser(userData?.id);
            if (userDetail?.result?.data) {
                setUser(userDetail?.result?.data);
            }
        };

        if (userData?.id) {
            fetchUser();
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        let profileImageBase64 = null;

        if (profileImage) {
            profileImageBase64 = await convertFileToBase64(profileImage);
        }

        const updatedData = {
            userId: user.id,
            name: user.name,
            email: user.email,
            password,
            profileImage: profileImageBase64
        };

        try {
            const result = await updateProfile(updatedData);
            if (result) {
                setToastMessage('User updated successfully');
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'User updated successfully', life: 3000 });
            }
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Error updating user', life: 3000 });
        } finally {
            setShowToast(true);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser) => ({ ...prevUser, name: e.target.value }));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser) => ({ ...prevUser, email: e.target.value }));
    };

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            <form onSubmit={handleUpdate} className="profile-form">
                <div className="profile-image-container">
                    <Image src={user?.profileImage || image} alt="Profile" width={150} height={150} className="profile-image" style={{ borderRadius: '50%' }} />
                    <label htmlFor="file-input" className="profile-image-overlay">
                        <i className="pi pi-camera" style={{ fontSize: '2em', color: '#007ad9' }}></i>
                    </label>
                    <input id="file-input" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                </div>
                <div>
                    <label>Name:</label>
                    <InputText type="text" value={user.name || ''} onChange={handleNameChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <InputText type="email" value={user.email || ''} onChange={handleEmailChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <InputText type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" placeholder="Enter new password" />
                </div>
                <Button type="submit" label="Update Profile" />
            </form>
            <Toast ref={toast} />
        </div>
    );
};

export default Profile;
