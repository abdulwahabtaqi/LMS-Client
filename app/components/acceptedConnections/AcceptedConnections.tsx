import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import getUser from '../../context/server/users/getUser';
import dp from './../../../public/images/user.png';
import Image from 'next/image';

interface Connection {
    id: string;
    senderId: string;
    receiverId: string;
}

interface User {
    id: string;
    name: string;
    profilePicture?: string;
}

interface AcceptedConnectionsProps {
    acceptedConnections: Connection[];
    userId: string;
    removeConnectionHandler: (connectionId: string) => void;
}

const AcceptedConnections: React.FC<AcceptedConnectionsProps> = ({ acceptedConnections, userId, removeConnectionHandler }) => {
    const [userInfos, setUserInfos] = useState<{ [key: string]: User }>({});

    useEffect(() => {
        const fetchUserInfo = async (userId: string) => {
            try {
                const response = await getUser(userId);
                const userInfo = response.result.data; // Access user info from the correct part of the response
                setUserInfos((prev) => ({ ...prev, [userId]: userInfo })); // Update the state with user data
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        // Loop over connections to fetch the other user's info
        acceptedConnections.forEach((connection) => {
            const otherUserId = connection.receiverId === userId ? connection.senderId : connection.receiverId;
            if (!userInfos[otherUserId]) {
                fetchUserInfo(otherUserId); // Fetch user info if not already fetched
            }
        });
    }, [acceptedConnections, userId, userInfos]);

    return (
        <div>
            <h3>Accepted Connections</h3>
            {acceptedConnections.length > 0 ? (
                <div style={styles.cardContainer}>
                    {acceptedConnections.map((connection) => {
                        const otherUserId = connection.receiverId === userId ? connection.senderId : connection.receiverId;
                        const userInfo = userInfos[otherUserId]; // Get user info for this connection

                        return (
                            <div key={connection.id} style={styles.card}>
                                <Image
                                    src={userInfo?.profilePicture || dp}
                                    alt={userInfo?.name || 'user'}
                                    style={styles.image} 
                                />
                                <div style={styles.info}>
                                    <h4 style={styles.name}>{userInfo?.name || 'Loading...'}</h4>
                                    <div style={styles.actions}>
                                        <Button icon="pi pi-user-minus" onClick={() => removeConnectionHandler(connection.id)} className="p-button-rounded p-button-text" aria-label="Remove Connection" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <Message severity="info" text="No accepted connections." />
            )}
        </div>
    );
};

// Define styles with type CSSProperties
const styles: { [key: string]: React.CSSProperties } = {
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Responsive grid
        gap: '1rem'
    },
    card: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column', // Stack image and info vertically
        alignItems: 'center',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        maxWidth: '300px', // Max width for cards
        margin: '0 auto' // Center single card
    },
    image: {
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        marginBottom: '1rem'
    },
    info: {
        textAlign: 'center' // Center the name and button
    },
    name: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem'
    },
    actions: {
        marginTop: '0.5rem' // Space between name and button
    }
};

export default AcceptedConnections;
