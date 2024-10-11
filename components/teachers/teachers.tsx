'use client';
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

import getAllTeachers from '../../app/context/server/connection/getAllTeacher';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [totalMembers, setTotalMembers] = useState(0);
    const [totalConnections, setTotalConnections] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getTeachers = async () => {
            const result = await getAllTeachers();
            setTeachers(result.result.data);
            setFilteredTeachers(result.result.data);
            setTotalMembers(result.result.data.length);
        };
        getTeachers();
    }, []);

    useEffect(() => {
        const filtered = teachers.filter((teacher: any) => teacher.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredTeachers(filtered);
    }, [searchTerm, teachers]);

    const sendConnectionRequest = (id: any) => {
        console.log(`Connection request sent to ${id}`);
    };

    const chatWithTeacher = (id: any) => {
        console.log(`Chat started with ${id}`);
    };

    return (
        <div>
            <InputText value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search teachers" />
            <h3>Total Members: {totalMembers}</h3>
            <h3>Total Connections: {totalConnections}</h3>
            <Toast />
            {filteredTeachers.length === 0 ? (
                <Message severity="info" text="No members found." />
            ) : (
                <div className="card-container">
                    {filteredTeachers.map((teacher: any) => (
                        <div className="teacher-card" key={teacher.id}>
                            <img src="https://via.placeholder.com/100" alt="user" className="teacher-image" />
                            <div className="teacher-info">
                                <h4 className="text-lg">{teacher.name}</h4>
                                <p>Joined at: {new Date(teacher.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                                <div className="teacher-actions">
                                    <Button icon="pi pi-user-plus" onClick={() => sendConnectionRequest(teacher.id)} className="p-button-rounded p-button-text" aria-label="Send Connection Request" />
                                    <Button icon="pi pi-comments" onClick={() => chatWithTeacher(teacher.id)} className="p-button-rounded p-button-text" aria-label="Chat with Teacher" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <style jsx>{`
                .card-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
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
            `}</style>
        </div>
    );
};

export default Teachers;
