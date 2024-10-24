'use client';

import React, { useEffect, useState } from 'react';
import { verifyToken } from '../../shared/common';
import { User } from '../../shared/types';
import getPendingConnections from '../../context/server/connection/getPendingConnections';
import getUser from '../../context/server/users/getUser';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import rejectReq from '../../context/server/connection/rejectRequest';
import acceptReq from '../../context/server/connection/acceptRequest';

const Connection = () => {
    const [user, setUser] = useState({} as User);
    const [pendingRequests, setPendingRequests] = useState([] as any[]);
    const [senderNames, setSenderNames] = useState<Record<string, any>>({});

    useEffect(() => {
        const userData = verifyToken(localStorage?.getItem('lms-token') as string) as User;
        setUser(userData);
    }, []);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            if (user?.id) {
                const result = await getPendingConnections(user.id);
                setPendingRequests(result.result.data || []);

                result.result.data.forEach(async (request: any) => {
                    const userDetail = await getUser(request.senderId);
                    setSenderNames((prevNames) => ({
                        ...prevNames,
                        [request.senderId]: {
                            name: userDetail?.result?.data?.name || 'Unknown User',
                            username: userDetail?.result?.data?.username || 'Unknown Username',
                            imageUrl: userDetail?.result?.data?.profileImage || 'https://via.placeholder.com/100'
                        }
                    }));
                });
            }
        };

        if (user?.id) {
            fetchPendingRequests();
        }
    }, [user]);

    const handleAccept = async (requestId: string) => {
        console.log(`Accepted request ID: ${requestId}`);
        const response = await acceptReq({ requestId });
        setPendingRequests((prev) => prev.filter((req) => req.id !== requestId));
        console.log(response);
        if (response.success) {
            // Optionally, you can remove the accepted request from the state or refetch
        } else {
            console.error('Error accepting request:', response.message);
        }
    };

    const handleReject = async (requestId: string) => {
        console.log(`Rejected request ID: ${requestId}`);
        const response = await rejectReq({ requestId });
        if (response.success) {
            // Optionally, you can remove the rejected request from the state or refetch
            setPendingRequests((prev) => prev.filter((req) => req.id !== requestId));
        } else {
            console.error('Error rejecting request:', response.message);
        }
    };

    return (
        <div>
            <h3>Pending Connection Requests</h3>
            {pendingRequests.length > 0 ? (
                <ul>
                    {pendingRequests.map((request: any) => (
                        <li style={{ listStyle: 'none', marginBottom: '20px', display: 'flex', alignItems: 'center' }} key={request.id}>
                            <img
                                src={senderNames[request.senderId]?.imageUrl || 'https://via.placeholder.com/100'}
                                alt={`${senderNames[request.senderId]?.name}'s profile`}
                                style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px' }}
                            />
                            <div style={{ flexGrow: 1 }}>
                                <Message severity="info" text={senderNames[request.senderId]?.name || 'Someone'} className="notification-message" />
                                <p>
                                    Sent at:{' '}
                                    {new Date(request.createdAt).toLocaleString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    })}
                                </p>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Button label="Accept" icon="pi pi-check" className="p-button-success" onClick={() => handleAccept(request.id)} />
                                    <Button label="Reject" icon="pi pi-times" className="p-button-danger" onClick={() => handleReject(request.id)} />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No pending connection requests.</p>
            )}

            <style jsx>{`
                .notification-message {
                    margin-bottom: 10px;
                }
            `}</style>
        </div>
    );
};

export default Connection;
