import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dropdown } from 'primereact/dropdown';
import FormFieldWithLabel from '../../shared/components/FormFieldWithLabel/FormFieldWithLabel';
import { ErrorMessage } from '../../shared/components/ErrorMessage/ErrorMessage';
import createAssignment from '../../context/server/assignment/createAssigment';
import fetchSchoolsHandler from '../../context/server/school/fetchSchoolsHandler';
import fetchGradeBySchoolIdHandler from '../../context/server/grade/fetchGradeBySchoolIdHandler';
import fetchSubjectByGradeIdHandler from '../../context/server/subject/fetchSubjectByGradeIdHandler';
import fetchTopicBySubjectIdHandler from '../../context/server/topic/fetchTopicBySubjectIdHandler';
import { verifyToken } from '../../shared/common';
import { useAppContext } from '../../../layout/context/layoutcontext';
import './NewAssignment.css';
import { Toast } from 'primereact/toast';

const NewAssignment = () => {
    const [user, setUser] = useState<any>(null);
    const g = useAppContext();
    const [schools, setSchools] = useState<any[]>([]);
    const [grades, setGrades] = useState<any[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [topics, setTopics] = useState<any[]>([]);
    const toastRef = useRef<Toast>(null);

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors: ExportErrors },
        register,
        getValues,
        watch
    } = useForm<any>({
        mode: 'onBlur'
    });

    const [assignmentTitles, setAssignmentTitles] = useState([{ name: '', description: '' }]); // Initialize with one title

    const fetchSchools = async () => {
        try {
            const response: any = await fetchSchoolsHandler();
            if (response?.status && response.result?.data) {
                setSchools(response.result.data);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong While Fetching Schools' });
        }
    };

    const onSchoolChange = async (e: any, field: any) => {
        if (!e) return;
        field?.onChange(e);
        try {
            const response: any = await fetchGradeBySchoolIdHandler(e);
            if (response?.status && response.result?.data) {
                if (!response.result.data.length) {
                    setValue('gradeId', '');
                    setValue('subjectId', '');
                    setValue('topicId', '');
                }
                setGrades(response.result.data);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong While Fetching Grades' });
        }
    };

    const onChangeGrade = async (e: any, field: any) => {
        if (!e) return;
        field?.onChange(e);
        try {
            const response: any = await fetchSubjectByGradeIdHandler(e);
            if (response?.status && response.result?.data) {
                if (!response.result.data.length) {
                    setValue('subjectId', '');
                    setValue('topicId', '');
                }
                setSubjects(response.result.data);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong While Fetching Subjects' });
        }
    };

    const onChangeSubject = async (e: any, field: any) => {
        if (!e) return;
        field?.onChange(e);
        try {
            const response: any = await fetchTopicBySubjectIdHandler(e);
            if (response?.status && response.result?.data) {
                if (!response.result.data.length) {
                    setValue('topicId', '');
                }
                setTopics(response.result.data);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong While Fetching Topics' });
        }
    };

    const handleAddTitle = () => {
        setAssignmentTitles([...assignmentTitles, { name: '', description: '' }]);
    };

    const handleRemoveTitle = (index: number) => {
        const newTitles = assignmentTitles.filter((_, i) => i !== index);
        setAssignmentTitles(newTitles);
    };

    const onSubmit = async (data: any) => {
        const { gradeId, subjectId, totalMarks, lastSubmissionDate } = data;
        const teacherId = user?.id;

        if (!teacherId) return;

        const titles = assignmentTitles.map((title) => ({
            name: title.name,
            description: title.description
        }));

        const response = await createAssignment({
            titles,
            teacherId,
            subjectId,
            gradeId,
            totalMarks,
            lastSubmissionDate
        });

        if (response.status) {
            toastRef.current?.show({ severity: 'success', summary: 'Success', detail: 'Assignment created successfully' });
            reset();
            setAssignmentTitles([{ name: '', description: '' }]); // Reset titles to initial state
        } else {
            toastRef.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to create assignment' });
        }
    };

    useEffect(() => {
        fetchSchools();
        const userData = verifyToken(localStorage?.getItem('lms-token') as string) as any;
        setUser(userData);
    }, []);

    return (
        <div className="new-assignment-container">
            <Toast ref={toastRef} />

            <h2 className="new-assignment-title">Create New Assignment</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="assignment-form">
                <div className="form-grid">
                    <div className="form-field">
                        <Controller
                            name="schoolId"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Select School' }}
                            render={({ field }) => (
                                <FormFieldWithLabel
                                    label="Select School"
                                    formField={
                                        <Dropdown
                                            value={field.value}
                                            onChange={(e) => onSchoolChange(e.value, field)}
                                            options={schools}
                                            optionLabel="type"
                                            optionValue="id"
                                            placeholder="Select a School"
                                            filter
                                            className={`dropdown ${ExportErrors?.schoolId?.message ? 'p-invalid' : ''}`}
                                        />
                                    }
                                />
                            )}
                        />
                        <ErrorMessage text={(ExportErrors?.schoolId?.message as string) || ''} />
                    </div>
                    <div className="form-field">
                        <Controller
                            name="gradeId"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Select Grade' }}
                            render={({ field }) => (
                                <FormFieldWithLabel
                                    label="Select Grade"
                                    formField={
                                        <Dropdown
                                            value={field.value}
                                            onChange={(e) => onChangeGrade(e.value, field)}
                                            options={grades}
                                            optionLabel="grade"
                                            optionValue="id"
                                            placeholder="Select a Grade"
                                            filter
                                            className={`dropdown ${ExportErrors?.gradeId?.message ? 'p-invalid' : ''}`}
                                        />
                                    }
                                />
                            )}
                        />
                        <ErrorMessage text={(ExportErrors?.gradeId?.message as string) || ''} />
                    </div>
                    <div className="form-field">
                        <Controller
                            name="subjectId"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Select Subject' }}
                            render={({ field }) => (
                                <FormFieldWithLabel
                                    label="Select Subject"
                                    formField={
                                        <Dropdown
                                            value={field.value}
                                            onChange={(e) => onChangeSubject(e.value, field)}
                                            options={subjects}
                                            optionLabel="subject"
                                            optionValue="id"
                                            placeholder="Select a Subject"
                                            filter
                                            className={`dropdown ${ExportErrors?.subjectId?.message ? 'p-invalid' : ''}`}
                                        />
                                    }
                                />
                            )}
                        />
                        <ErrorMessage text={(ExportErrors?.subjectId?.message as string) || ''} />
                    </div>
                </div>
                {/* Dynamic Titles Input */}
                {assignmentTitles.map((title, index) => (
                    <div key={index} className="title-input-group">
                        <FormFieldWithLabel
                            label={`Assignment Title ${index + 1}`}
                            formField={
                                <input
                                    type="text"
                                    value={title.name}
                                    onChange={(e) => {
                                        const newTitles = [...assignmentTitles];
                                        newTitles[index].name = e.target.value;
                                        setAssignmentTitles(newTitles);
                                    }}
                                    className={`input ${(ExportErrors as any)?.titles?.[index]?.name ? 'p-invalid' : ''}`}
                                    required
                                />
                            }
                        />
                        <ErrorMessage text={(ExportErrors as any)?.titles?.[index]?.name?.message} />
                        <FormFieldWithLabel
                            label={`Assignment Description ${index + 1}`}
                            formField={
                                <textarea
                                    value={title.description}
                                    onChange={(e) => {
                                        const newTitles = [...assignmentTitles];
                                        newTitles[index].description = e.target.value;
                                        setAssignmentTitles(newTitles);
                                    }}
                                    className={`textarea ${(ExportErrors as any)?.titles?.[index]?.description ? 'p-invalid' : ''}`}
                                    required
                                />
                            }
                        />
                        <ErrorMessage text={(ExportErrors as any)?.titles?.[index]?.description?.message} />
                        <button type="button" onClick={() => handleRemoveTitle(index)} className="remove-button">
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddTitle} className="add-button">
                    Add More Titles
                </button>

                <FormFieldWithLabel label="Total Marks" formField={<input type="number" {...register('totalMarks', { required: 'Total Marks is required' })} className={`input ${ExportErrors?.totalMarks?.message ? 'p-invalid' : ''}`} />} />
                <ErrorMessage text={ExportErrors?.totalMarks?.message as string} />

                <FormFieldWithLabel
                    label="Last Submission Date"
                    formField={<input type="date" {...register('lastSubmissionDate', { required: 'Last Submission Date is required' })} className={`input ${ExportErrors?.lastSubmissionDate?.message ? 'p-invalid' : ''}`} />}
                />
                <ErrorMessage text={ExportErrors?.lastSubmissionDate?.message as string} />

                <button type="submit" className="submit-button">
                    Create Assignment
                </button>
            </form>
        </div>
    );
};

export default NewAssignment;
