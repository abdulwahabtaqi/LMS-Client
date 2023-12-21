import React, { useState } from 'react'
import FormFieldWithLabel from '../../../shared/components/FormFieldWithLabel/FormFieldWithLabel'
import { TextField } from '../../../shared/components/TextField/TextField'
import { useForm, Controller, SubmitHandler, } from 'react-hook-form'
import { ExportAnswers, Grade, School, SubTopic, Subject, Topic } from '../../../shared/types'
import { Dropdown } from 'primereact/dropdown'
import { ErrorMessage } from '../../../shared/components/ErrorMessage/ErrorMessage'
import { useAppContext } from '../../../../layout/context/layoutcontext'
import fetchSchoolsHandler from '../../../context/server/school/fetchSchoolsHandler'
import fetchGradesHandler from '../../../context/server/grade/fetchGradesHandler'
import fetchSubjectsHandler from '../../../context/server/subject/fetchSubjectsHandler'
import fetchTopicsHandler from '../../../context/server/topic/fetchTopicsHandler'
import fetchSubTopicsHandler from '../../../context/server/subTopic/fetchSubTopicsHandler'

const Export = () => {
    const g = useAppContext();
    const { control, handleSubmit, reset, setValue, formState: { errors: ExportErrors, isSubmitted, isValid, isDirty, isSubmitSuccessful, isSubmitting }, setError, clearErrors } = useForm<ExportAnswers>({
        mode: 'onBlur',
    });
    const [schools, setSchools] = useState<School[]>([] as School[]);
    const [grades, setGrades] = useState<Grade[]>([] as Grade[]);
    const [subjects, setSubjects] = useState<Subject[]>([] as Subject[]);
    const [topics, setTopics] = useState<Topic[]>([] as Topic[]);
    const [subTopics, setSubTopics] = useState<SubTopic[]>([] as SubTopic[]);
    const questionTypes = [
        { label: 'MCQ', value: 'MCQ' },
        { label: 'SHORT', value: 'SHORT' },
        { label: 'LONG', value: 'LONG' },
    ];
    const dificultyLevel = [
        { label: 'EASY', value: 'EASY' },
        { label: 'MEDIUM', value: 'MEDIUM' },
        { label: 'HARD', value: 'HARD' },
    ];

    const fetchSchools = async () => {
        try {
            const response = await fetchSchoolsHandler();
            if (response?.status) {
                setSchools(response?.result?.data as School[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Schools" });
        }
    };
    const fetchGrades = async () => {
        try {
            const response = await fetchGradesHandler();
            if (response?.status) {
                setGrades(response?.result?.data as Grade[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Subjects" });
        }
    };
    const fetchSubjects = async () => {
        try {
            const response = await fetchSubjectsHandler();
            if (response?.status) {
                setSubjects(response?.result?.data as Subject[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Topics" });
        }
    };
    const fetchTopics = async () => {
        try {
            const response = await fetchTopicsHandler();
            if (response?.status) {
                setTopics(response?.result?.data as Topic[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching SubTopics" });
        }
    };
    const fetchSubTopics = async () => {
        try {
            const response = await fetchSubTopicsHandler();
            if (response?.status) {
                setSubTopics(response?.result?.data as SubTopic[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: "Something Went Wrong While Fetching Questions" });
        }
    };
    return (
        <>
            <div className="card">
                <h5>Export Answers</h5>
                <div className="field col-12 md:col-6">
                    <Controller
                        name='schoolId'
                        control={control}
                        defaultValue=""
                        rules={{ required: "Select School" }}
                        render={({ field }) => (
                            <FormFieldWithLabel
                                label="Select School"
                                showCharLimit={false}
                                showOptionalText={false}
                                formField={
                                    <>
                                        <Dropdown
                                            value={field?.value}
                                            onChange={field?.onChange}
                                            options={schools}
                                            optionLabel="type"
                                            optionValue="id"
                                            placeholder="Select a School"
                                            filter
                                            className={`w-100 ${ExportErrors?.schoolId?.message ? "p-invalid" : ""}`}
                                        />
                                        <ErrorMessage text={ExportErrors?.schoolId?.message} />
                                    </>
                                }
                            />
                        )}
                    />
                </div>
                <div className="field col-12 md:col-6">
                    <Controller
                        name='gradeId'
                        control={control}
                        defaultValue=""
                        rules={{ required: "Select Grade" }}
                        render={({ field }) => (
                            <FormFieldWithLabel
                                label="Select Grade"
                                showCharLimit={false}
                                showOptionalText={false}
                                formField={
                                    <>
                                        <Dropdown
                                            value={field?.value}
                                            onChange={field?.onChange}
                                            options={grades}
                                            optionLabel="grade"
                                            optionValue="id"
                                            placeholder="Select a Grade"
                                            filter
                                            className={`w-100 ${ExportErrors?.gradeId?.message ? "p-invalid" : ""}`}
                                        />
                                        <ErrorMessage text={ExportErrors?.gradeId?.message} />
                                    </>
                                }
                            />
                        )}
                    />

                </div>
                <div className="field col-12 md:col-6">
                    <Controller
                        name='subjectId'
                        control={control}
                        defaultValue=""
                        rules={{ required: "Select Subject" }}
                        render={({ field }) => (
                            <>
                                <FormFieldWithLabel
                                    label="Select Subject"
                                    showCharLimit={false}
                                    showOptionalText={false}
                                    formField={
                                        <Dropdown
                                            value={field?.value}
                                            onChange={field?.onChange}
                                            options={subjects}
                                            optionLabel="subject"
                                            optionValue="id"
                                            placeholder="Select a Subject"
                                            filter
                                            className={`w-100 ${ExportErrors?.subjectId?.message ? "p-invalid" : ""}`}
                                        />
                                    }
                                />
                                <ErrorMessage text={ExportErrors?.subjectId?.message} />
                            </>
                        )}
                    />

                </div>
                <div className="field col-12 md:col-5">
                    <Controller
                        name='type'
                        control={control}
                        rules={{ required: "Select Question Type" }}
                        render={({ field }) => (
                            <>
                                <FormFieldWithLabel
                                    label="Select Question Type"
                                    showCharLimit={false}
                                    showOptionalText={false}
                                    formField={
                                        <Dropdown
                                            value={field?.value}
                                            onChange={field?.onChange}
                                            options={questionTypes}
                                            optionLabel="label"
                                            optionValue="value"
                                            placeholder="Select Type"
                                            filter
                                            className={`w-100 ${ExportErrors?.type?.message ? "p-invalid" : ""}`}
                                        />
                                    }
                                />
                                <ErrorMessage text={ExportErrors?.type?.message} />
                            </>
                        )}
                    />
                </div>
                <div className="field col-12 md:col-5">
                    <Controller
                        name='difficultyLevel'
                        control={control}
                        rules={{ required: "Select Dificulty Level" }}
                        render={({ field }) => (
                            <>
                                <FormFieldWithLabel
                                    label="Select Dificulty Level"
                                    showCharLimit={false}
                                    showOptionalText={false}
                                    formField={
                                        <Dropdown
                                            value={field?.value}
                                            onChange={field?.onChange}
                                            options={dificultyLevel}
                                            optionLabel="label"
                                            optionValue="value"
                                            placeholder="Select Dificulty Level"
                                            filter
                                            className={`w-100 ${ExportErrors?.difficultyLevel?.message ? "p-invalid" : ""}`}
                                        />
                                    }
                                />
                                <ErrorMessage text={ExportErrors?.difficultyLevel?.message} />
                            </>
                        )}
                    />
                </div>
                <div className="field col-12 md:col-6">
                    <Controller
                        name='topicId'
                        control={control}
                        defaultValue=""
                        rules={{ required: "Select Topic" }}
                        render={({ field }) => (
                            <>
                                <FormFieldWithLabel
                                    label="Select Topic"
                                    showCharLimit={false}
                                    showOptionalText={false}
                                    formField={
                                        <Dropdown
                                            value={field?.value}
                                            onChange={field?.onChange}
                                            options={topics}
                                            optionLabel="topic"
                                            optionValue="id"
                                            placeholder="Select a Topic"
                                            filter
                                            className={`w-100 ${ExportErrors?.topicId?.message ? "p-invalid" : ""}`}
                                        />
                                    }
                                />
                                <ErrorMessage text={ExportErrors?.topicId?.message} />
                            </>
                        )}
                    />
                </div>
               
                <div className="field col-12 md:col-5">
                    <Controller
                        name='subTopicId'
                        control={control}
                        rules={{ required: "Select Sub Topic" }}
                        render={({ field }) => (
                            <>
                                <FormFieldWithLabel
                                    label="Select Sub Topic"
                                    showCharLimit={false}
                                    showOptionalText={false}
                                    formField={
                                        <Dropdown
                                            value={field?.value}
                                            onChange={field?.onChange}
                                            options={subTopics}
                                            optionLabel="subTopic"
                                            optionValue="id"
                                            placeholder="Select Sub Topic"
                                            filter
                                            className={`w-100 ${ExportErrors?.subTopicId?.message ? "p-invalid" : ""}`}
                                        />
                                    }
                                />
                                <ErrorMessage text={ExportErrors?.subTopicId?.message} />
                            </>
                        )}
                    />
                </div>
            </div>
        </>
    )
}

export default Export