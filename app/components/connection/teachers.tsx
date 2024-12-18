'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';
import AcceptedConnections from '../acceptedConnections/AcceptedConnections';

import getAllTeachers from '../../context/server/connection/getAllTeacher';
import { verifyToken } from '../../shared/common';
import { User } from '../../shared/types';
import sendConnection from '../../context/server/connection/sendConnection';
import getSendPending from '../../context/server/connection/getSentPendingReq';
import getTotalConn from '../../context/server/connection/getTotalConn';
import deleteConnection from '../../context/server/connection/deleteConnection';
import Image from 'next/image';
import dp from './../../../public/images/user.png';

const Teachers = () => {
    const [teachers, setTeachers] = useState([] as any[]);
    const [user, setUser] = useState({} as User);
    const [filteredTeachers, setFilteredTeachers] = useState([] as any[]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [totalConnections, setTotalConnections] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [pendingConnections, setPendingConnections] = useState([] as any[]);
    const [acceptedConnections, setAcceptedConnections] = useState([] as any[]);
    const [showAcceptedConnections, setShowAcceptedConnections] = useState(false);
    const [showAllTeachers, setShowAllTeachers] = useState(true);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        const userData = verifyToken(localStorage?.getItem('lms-token') as string) as User;
        setUser(userData);
    }, []);

    useEffect(() => {
        const getTeachers = async () => {
            const result = await getAllTeachers(user.id);
            setTeachers(result.result.data);
            setFilteredTeachers(result?.result?.data);
            setTotalMembers(result?.result?.data?.length);
        };
        getTeachers();
    }, [user.id]);

    useEffect(() => {
        const fetchPendingConnections = async () => {
            if (user?.id) {
                const result = await getSendPending(user.id);
                setPendingConnections(result?.result?.data || []);
            }
        };

        if (user?.id) {
            fetchPendingConnections();
        }
    }, [user]);

    useEffect(() => {
        const fetchTotalConnections = async () => {
            if (user?.id) {
                const result = await getTotalConn(user.id);
                setTotalConnections(result?.result?.data?.length || 0);
            }
        };

        fetchTotalConnections();
    }, [user]);

    useEffect(() => {
        const filtered = teachers?.filter((teacher: any) => teacher.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredTeachers(filtered);
    }, [searchTerm, teachers]);

    // const sendConnectionRequest = async (teacherId: string) => {
    //     try {
    //         const result = await sendConnection({ senderId: user.id, receiverId: teacherId });

    //         if (result.success) {
    //             toast.current?.show({ severity: 'success', summary: 'Success', detail: result.message, life: 3000 });

    //             const refreshedConnections = await getSendPending(user.id);
    //             setPendingConnections(refreshedConnections?.result?.data || []);
    //         }
    //     } catch (error) {
    //         toast.current?.show({ severity: 'error', summary: 'Error', detail: 'An error occurred', life: 3000 });
    //     }
    // };

    const sendConnectionRequest = async (teacherId: string) => {
        try {
            const isPending = pendingConnections.some((item) => teacherId === item.receiverId);

            if (!isPending) {
                // Send connection request
                const result = await sendConnection({ senderId: user.id, receiverId: teacherId });

                if (result.success) {
                    toast.current?.show({ severity: 'success', summary: 'Success', detail: result.message, life: 3000 });

                    // Ensure a proper update to the state
                    setPendingConnections((prevPendingConnections) => [...prevPendingConnections, { receiverId: teacherId }]);
                }
            } else {
                // Withdraw the connection request
                await deleteConnection(teacherId);

                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Connection request withdrawn.', life: 3000 });

                // Remove from pending connections
                setPendingConnections((prevPendingConnections) => prevPendingConnections.filter((item) => item.receiverId !== teacherId));
            }
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'An error occurred', life: 3000 });
        }
    };

    const chatWithTeacher = (id: string) => {
        console.log(`Chat started with ${id}`);
    };

    const fetchAcceptedConnections = async () => {
        if (user?.id) {
            const result = await getTotalConn(user.id);
            setAcceptedConnections(result.result.data || []);
            setShowAcceptedConnections(true);
            setShowAllTeachers(false);
        }
    };

    const removeConnectionHandler = async (connectionId: string) => {
        try {
            await deleteConnection(connectionId);
            const updatedConnections = acceptedConnections.filter((connection) => connection.id !== connectionId);
            setAcceptedConnections(updatedConnections);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Connection removed successfully.', life: 3000 });
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'An error occurred while removing the connection.', life: 3000 });
        }
    };

    const showAllTeachersList = () => {
        setShowAllTeachers(true);
        setShowAcceptedConnections(false);
    };

    return (
        <div>
            <InputText value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search teachers" />
            <div className="my-4 flex gap-4">
                <p style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={showAllTeachersList}>
                    <span className={`${showAllTeachers ? 'under' : ''}`}>All Members </span>
                    <span
                        style={{
                            background: 'black',
                            borderRadius: '2px',
                            color: 'white',
                            display: 'inline-block',
                            minWidth: '30px',
                            textAlign: 'center'
                        }}
                    >
                        {totalMembers}
                    </span>
                </p>
                <p style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={fetchAcceptedConnections}>
                    <span className={`${showAcceptedConnections ? 'under' : ''}`}>My Connections </span>
                    <span
                        style={{
                            background: 'black',
                            borderRadius: '2px',
                            color: 'white',
                            display: 'inline-block',
                            minWidth: '30px',
                            textAlign: 'center'
                        }}
                    >
                        {totalConnections}
                    </span>
                </p>
            </div>

            <Toast ref={toast} />
            {showAllTeachers && filteredTeachers?.length === 0 ? (
                <Message severity="info" text="No members found." />
            ) : (
                showAllTeachers && (
                    <div className="card-container">
                        {filteredTeachers?.map((teacher: any) => (
                            <div className="teacher-card" key={teacher.id}>
                                <Image width={100} height={100} src={teacher?.profileImage || dp} alt="user" className="teacher-image" />
                                <div className="teacher-info">
                                    <h4 className="text-lg">{teacher.name}</h4>
                                    <p>Joined at: {new Date(teacher.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                                    <div className="teacher-actions">
                                        {!pendingConnections.some((item) => teacher.id == item.receiverId) ? (
                                            <Button icon="pi pi-user-plus" onClick={() => sendConnectionRequest(teacher.id)} className="p-button-rounded p-button-text" aria-label="Send Connection Request" />
                                        ) : (
                                            <Button icon="pi pi-user-minus" onClick={() => sendConnectionRequest(teacher.id)} className="p-button-rounded p-button-text" aria-label="Withdraw request" />
                                        )}
                                        <Button icon="pi pi-comments" onClick={() => chatWithTeacher(teacher.id)} className="p-button-rounded p-button-text" aria-label="Chat with Teacher" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
            {showAcceptedConnections && <AcceptedConnections acceptedConnections={acceptedConnections} userId={user.id} removeConnectionHandler={removeConnectionHandler} />}
            <style jsx>{`
                .card-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                }
                .teacher-card {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 10px;
                    text-align: center;
                    width: 200px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .teacher-image {
                    border-radius: 50%;
                    width: 100px;
                    height: 100px;
                    margin-bottom: 10px;
                }
                .teacher-actions {
                    display: flex;
                    justify-content: space-around;
                }
                .under {
                    position: relative;
                    display: inline-block;
                }

                .under::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -2px;
                    width: 100%;
                    height: 2px;
                    background-color: black;
                }
            `}</style>
        </div>
    );
};

export default Teachers;
