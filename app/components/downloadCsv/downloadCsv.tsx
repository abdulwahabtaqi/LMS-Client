import React from 'react';
import { Button } from 'primereact/button';

const DownloadCsv: React.FC = () => {
    const downloadSampleCsv = () => {
        // window.location.href = 'http://localhost:4040/api/v1/csv/download';
        window.location.href = 'https://lms-server-production-505b.up.railway.app/api/v1/csv/download';
    };

    return (
        <>
            <div className=" mx-auto mt-4">
                <div className="grid p-fluid  d-flex justify-content-start   ">
                    <div className="field col-6 md:col-6 bg-info">
                        <Button label="Download Sample CSV" onClick={downloadSampleCsv} icon="pi pi-download" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default DownloadCsv;
