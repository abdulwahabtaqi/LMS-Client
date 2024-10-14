import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { verifyToken } from '../../shared/common';
import { User } from '../../shared/types';
import getPendingConnections from '../../context/server/connection/getPendingConnections';
import { Message } from 'primereact/message';
import getUser from '../../context/server/users/getUser';

const Notification = () => {
    const [user, setUser] = useState({} as User);
    const [pendingRequests, setPendingRequests] = useState([] as any[]);
    const [senderNames, setSenderNames] = useState<Record<string, string>>({}); // To store sender names by their IDs

    useEffect(() => {
        const userData = verifyToken(localStorage?.getItem('lms-token') as string) as User;
        setUser(userData);
    }, []);

    useEffect(() => {
        const fetchPendingRequests = async () => {
            if (user?.id) {
                const result = await getPendingConnections(user.id);
                setPendingRequests(result.result.data || []);

                // Fetch sender names for each pending request
                result.result.data.forEach(async (request: any) => {
                    const userDetail = await getUser(request.senderId);
                    setSenderNames((prevNames) => ({
                        ...prevNames,
                        [request.senderId]: userDetail?.result?.data?.name || 'Unknown User'
                    }));
                });
            }
        };

        if (user?.id) {
            fetchPendingRequests();
        }
    }, [user]);

    return (
        <div>
            <h3>Notifications</h3>
            {pendingRequests.length > 0 ? (
                <ul>
                    {pendingRequests.map((request: any) => (
                        <li style={{ listStyle: 'none' }} key={request.id}>
                            <Message severity="info" text={`${senderNames[request.senderId] || 'Someone'} has sent you a connection request.`} className="notification-message" />
                            <Link href={`/lms/connection/${request.id}`}>
                                <p>View Request</p>
                            </Link>
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

export default Notification;
