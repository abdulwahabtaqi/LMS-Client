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

const ImportAnswers: React.FC = () => {
    const g = useAppContext();
    const [importFiles, setImportFiles] = useState([] as any[])
    const [subTopics, setSubTopics] = useState<SubTopic[]>([]);
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors: ImportErrors },
        setError,
    } = useForm<ImportAnswers>({
        mode: 'onBlur',
    });

    const submitForm: SubmitHandler<ImportAnswers> = async (imports: ImportAnswers) => {
        try {
            console.log('imports====>', imports);
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something went wrong, Please try again later' });
        }
    };

    const fetchSubTopics = async () => {
        try {
            const response = await fetchSubTopicsHandler();
            if (response?.status) {
                setSubTopics(response?.result?.data as SubTopic[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong While Fetching Questions' });
        }
    };

    const handleFileUpload = async (file: any) => {
        if (!file || file?.length === 0) {
            setError('csvFile', {
                type: 'manual',
                message: 'Select a file',
            });
            return;
        }

        if (!file[0]?.name?.endsWith('.csv')) {
            setError('csvFile', {
                type: 'manual',
                message: 'File must be in CSV format',
            });
            return;
        }

        if (file[0]?.size > 5000000) {
            setError('csvFile', {
                type: 'manual',
                message: 'File size should be less than 5MB',
            });
            return;
        }

        setError('csvFile', {
            type: 'manual',
            message: '',
        });

        // Log the file to the console
        console.log('Uploaded File:', file);
    };

    useEffect(() => {
        fetchSubTopics();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const customBase64Uploader = async (event: FileUploadHandlerEvent) => {
        alert(event)
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        // let blob = await fetch(file?.objectURL).then((r) => r.blob()); //blob:url

        // reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };
    }
    return (
        <>
            <div className="card">
                <h5>Import</h5>
                <div className="grid p-fluid mt-3">
                    <div className="field col-12 md:col-5">
                        <Controller
                            name="subTopicId"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Sub Topic is required' }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Sub Topic"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={(e) => {
                                                    field?.onChange(e.value);
                                                    setValue('subTopicId', e.value);
                                                }}
                                                options={subTopics}
                                                optionLabel="subTopic"
                                                optionValue="id"
                                                placeholder="Select Sub Topic"
                                                filter
                                                className={`w-100 ${ImportErrors?.subTopicId?.message ? 'p-invalid' : ''}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ImportErrors?.subTopicId?.message} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-5">
                        <label htmlFor="">Upload File</label>
                        <FileUpload mode="basic" name="demo[]" accept="image/*" customUpload uploadHandler={customBase64Uploader} />
                        <ErrorMessage text={ImportErrors?.csvFile?.message} />
                    </div>
                </div>
                <div className="gap-2">
                    <Button
                        label={`Import Answers`}
                        onClick={() => {
                            console.log('imports====>', importFiles);
                            handleSubmit(submitForm)();
                        }}
                        icon="pi pi-check"
                    />
                </div>
            </div>
        </>
    );
};

export default ImportAnswers;
