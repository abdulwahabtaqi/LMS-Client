import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const DownloadCsv: React.FC = () => {
    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };

    const hideDialog = () => {
        setVisible(false);
    };

    return (
        <div className="mx-auto mt-4">
            <div className="grid p-fluid d-flex justify-content-start">
                <div className="field col-12 md:col-6 bg">
                    <Button className="w-max" label="Download Sample Files" onClick={showDialog} />
                </div>
            </div>

            <Dialog header="Download Sample Templates" visible={visible} onHide={hideDialog} style={{ width: '40vw' }} breakpoints={{ '960px': '75vw', '640px': '95vw' }}>
                <div className="grid p-fluid justify-content-center" style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
                    <div className="field col-12 md:col-6">
                        <a href="/csvFiles/fillintheblanks.csv" download>
                            <Button label="Fill in the Blanks Template" icon="pi pi-file" className="p-button mb-2 w-full" />
                        </a>
                        <a href="/csvFiles/longanswer.csv" download>
                            <Button label="Long Answer Template" icon="pi pi-file" className="p-button mb-2 w-full" />
                        </a>
                        <a href="/csvFiles/multiplechoicequestion.csv" download>
                            <Button label="Multiple Choice Template" icon="pi pi-file" className="p-button mb-2 w-full" />
                        </a>
                    </div>

                    <div className="field col-12 md:col-6">
                        <a href="/csvFiles/sequence.csv" download>
                            <Button label="Sequence Template" icon="pi pi-file" className="p-button mb-2 w-full" />
                        </a>
                        <a href="/csvFiles/shortanswer.csv" download>
                            <Button label="Short Answer Template" icon="pi pi-file" className="p-button mb-2 w-full" />
                        </a>
                        <a href="/csvFiles/singlechoicequestion.csv" download>
                            <Button label="Single Choice Template" icon="pi pi-file" className="p-button mb-2 w-full" />
                        </a>
                        <a href="/csvFiles/trueFalse.csv" download>
                            <Button label="True/False Template" icon="pi pi-file" className="p-button mb-2 w-full" />
                        </a>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default DownloadCsv;
