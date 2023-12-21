import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import FormFieldWithLabel from '../../shared/components/FormFieldWithLabel/FormFieldWithLabel';
import { Button } from 'primereact/button';
import { ImportAnswers, SubTopic } from '../../shared/types';
import { Dropdown } from 'primereact/dropdown';
import { ErrorMessage } from '../../shared/components/ErrorMessage/ErrorMessage';
import { useAppContext } from '../../../layout/context/layoutcontext';
import fetchSubTopicsHandler from '../../context/server/subTopic/fetchSubTopicsHandler';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';

const ImportAnswer: React.FC = () => {
    const g = useAppContext();
    // State to store the uploaded file
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // State for other form fields
    const [name, setName] = useState('');

    // Event handler for file upload
    const onFileUpload = (event: any) => {
        const file = event.files[0];
        setUploadedFile(file);
    };

    // Event handler for form submission
    const onSubmit = () => {
        // You can handle the form submission here
        console.log('Name:', name);
        console.log('File:', uploadedFile);

        // Add your logic for submitting the form data, e.g., sending it to the server
    };
    return (
        <>
            <div className="card">
                <div>
                    <h2>File Upload Form</h2>
                    <div>
                        <span>Name:</span>
                        <InputText value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <span>File:</span>
                        <FileUpload
                            mode="basic"
                            chooseLabel="Choose"
                            uploadLabel="Upload"
                            cancelLabel="Cancel"
                            customUpload
                            uploadHandler={onFileUpload}
                            emptyTemplate="No file chosen"
                        />
                    </div>
                    <div>
                        <Button label="Submit" onClick={onSubmit} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ImportAnswer;
