import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Title {
    name?: string; // Optional
    description?: string; // Optional
}

interface Assignment {
    createdAt?: string; // Optional
    grade?: string; // Optional
    id?: string; // Optional
    lastSubmissionDate?: string; // Optional
    marks?: number; // Optional
    status?: string; // Optional
    subject?: string; // Optional
    submittedAt?: string; // Optional
    teacher?: string; // Optional
    titles?: Title[]; // Optional
    totalMarks?: number; // Optional
    updatedAt?: string; // Optional
}

interface AnalyticsProps {
    assignments: Assignment[]; // Expecting an array of Assignment
}

const Analytics: React.FC<AnalyticsProps> = ({ assignments }) => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const submittedCount = assignments.filter((a) => a.status === 'Submitted').length;
    const pendingCount = assignments.filter((a) => a.status !== 'Submitted').length;

    // Pie chart data
    const pieData = {
        labels: ['Submitted', 'Pending'],
        datasets: [
            {
                data: [submittedCount, pendingCount],
                backgroundColor: ['#42A5F5', '#FF6384'],
                hoverBackgroundColor: ['#64B5F6', '#FF6384']
            }
        ]
    };

    // Line chart data
    const lineData = {
        labels: assignments.map((a) => a.subject || 'Unknown'),
        datasets: [
            {
                label: 'Marks Obtained',
                data: assignments.map((a) => a.marks || 0),
                fill: true,
                backgroundColor: 'rgba(66, 165, 245, 0.2)',
                borderColor: '#42A5F5',
                tension: 0.3,
                pointRadius: 5
            },
            {
                label: 'Total Marks',
                data: assignments.map((a) => a.totalMarks || 0),
                fill: false,
                borderColor: '#FFA726',
                tension: 0.3,
                pointRadius: 5
            }
        ]
    };

    // Options for the line chart
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: !isMobile // Show title on larger screens
                },
                ticks: {
                    display: !isMobile, // Hide ticks on mobile
                    autoSkip: true,
                    maxTicksLimit: isMobile ? 2 : 5 // Limit ticks based on screen size
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Marks',
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                },
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        },
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        const subject = tooltipItem.label; // Get the subject label
                        const value = tooltipItem.raw; // Get the value
                        return `${subject}: ${value}`; // Display the subject and its value
                    }
                }
            }
        }
    };

    return (
        <div className="p-4">
            <h2>Analytics</h2>

            <div className="card" style={{ height: '400px', width: '100%' }}>
                <h3>Marks Overview</h3>
                <Chart type="line" data={lineData} options={lineOptions} />
            </div>

            <div className="card mt-4  ">
                <h3>Submission Status</h3>
                <div style={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Chart width={window.innerWidth < 768 ? '100%' : '20vw'} type="pie" data={pieData} />
                </div>
            </div>

            <h3 className="mt-4">Assignments Table</h3>
            <DataTable value={assignments} paginator rows={10} className="mt-2">
                <Column field="subject" header="Subject" />
                <Column field="status" header="Status" />
                <Column field="marks" header="Marks Obtained" />
                <Column field="totalMarks" header="Total Marks" />
                <Column field="submittedAt" header="Submitted At" />
            </DataTable>
        </div>
    );
};

export default Analytics;
