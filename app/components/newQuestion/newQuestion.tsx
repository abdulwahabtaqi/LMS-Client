'use client';
import React, { useEffect, useRef, useState } from 'react';
import FormFieldWithLabel from '../../shared/components/FormFieldWithLabel/FormFieldWithLabel';
import { TextField } from '../../shared/components/TextField/TextField';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ExportAnswers, Grade, Question, School, SubTopic, Subject, Topic } from '../../shared/types';
import { Dropdown } from 'primereact/dropdown';
import { ErrorMessage } from '../../shared/components/ErrorMessage/ErrorMessage';
import { useAppContext } from '../../../layout/context/layoutcontext';
import fetchSchoolsHandler from '../../context/server/school/fetchSchoolsHandler';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Toast } from 'primereact/toast';
import fetchGradeBySchoolIdHandler from '../../context/server/grade/fetchGradeBySchoolIdHandler';
import fetchSubjectByGradeIdHandler from '../../context/server/subject/fetchSubjectByGradeIdHandler';
import fetchTopicBySubjectIdHandler from '../../context/server/topic/fetchTopicBySubjectIdHandler';
import fetchSubTopicBySubTopicIdHandler from '../../context/server/subTopic/fetchSubTopicBySubTopicIdHandler';
import _, { set } from 'lodash';
import { useRouter } from 'next/navigation';
const Export: React.FC = () => {
    const g = useAppContext();
    const router = useRouter();

    const toast = useRef<Toast>(null);
    const {
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors: ExportErrors, isSubmitted, isValid, isDirty, isSubmitSuccessful, isSubmitting },
        setError,
        clearErrors
    } = useForm<ExportAnswers>({
        mode: 'onBlur'
    });
    const [schools, setSchools] = useState<School[]>([] as School[]);
    const [grades, setGrades] = useState<Grade[]>([] as Grade[]);
    const [subjects, setSubjects] = useState<Subject[]>([] as Subject[]);
    const [topics, setTopics] = useState<Topic[]>([] as Topic[]);
    const [subTopics, setSubTopics] = useState<SubTopic[]>([] as SubTopic[]);
    const [MCQVisible, setMCQVisible] = useState<boolean>(false);
    const [shortQuestionVisible, setShortQuestionVisible] = useState<boolean>(false);
    const [longQuestionVisible, setLongQuestionVisible] = useState<boolean>(false);
    const [practiceMode, setPracticeMode] = useState<boolean>(false);
    const [fillInTheBlanksVisible, setFillInTheBlanksVisible] = useState<boolean>(false);
    const [multiFillInTheBlanksVisible, setMultiFillInTheBlanksVisible] = useState<boolean>(false);
    const [multipleShortVisible, setMultipleShortVisible] = useState<boolean>(false);
    const [sequenceVisible, setSequenceVisible] = useState<boolean>(false);
    const [multipleTrueFalseVisible, setMultipleTrueFalseVisible] = useState<boolean>(false);
    const [multipleQuestionV2Visible, setMultipleQuestionV2Visible] = useState<boolean>(false);

    const [selectedData, setSelectedData] = useState({
        schoolId: '',
        gradeId: '',
        subjectId: '',
        topicId: '',
        subTopicId: '',
        mcq: MCQVisible,
        shortQuestion: shortQuestionVisible,
        multiFillInTheBlanks: multiFillInTheBlanksVisible,
        multipleShort: multipleShortVisible,
        fillInTheBlanks: fillInTheBlanksVisible,
        sequence: sequenceVisible,
        multipleTrueFalse: multipleTrueFalseVisible,
        multipleQuestionV2: multipleQuestionV2Visible,
        longQuestionVisible: longQuestionVisible
    });

    const submitForm: SubmitHandler<ExportAnswers> = async (ExportAnswers: ExportAnswers) => {
        try {
            console.log('selectedData', selectedData);
            if (!MCQVisible && !shortQuestionVisible && !longQuestionVisible && !fillInTheBlanksVisible && !multiFillInTheBlanksVisible && !multipleShortVisible && !sequenceVisible && !multipleTrueFalseVisible) {
                toast?.current?.show({ severity: 'warn', summary: 'Warning', detail: 'Please select at least one type of question', life: 3000 });
                return;
            }

            const queryParams = new URLSearchParams(
                Object.entries(ExportAnswers)
                    .filter(([, value]) => value)
                    .map(([key, value]) => [key, String(value)])
            ).toString();

            router.push(`/lms/admin/question/new/create?${queryParams}`);

            console.log('ExportAnswers====>', ExportAnswers);
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something went wrong, Please try again later' });
        }
    };
    const fetchSchools = async () => {
        try {
            const response = await fetchSchoolsHandler();
            if (response?.status) {
                setSchools(response?.result?.data as School[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong While Fetching Schools' });
        }
    };

    const onSchoolChange = async (e: string, field: any) => {
        try {
            field?.onChange(e);
            setSelectedData((prev) => ({
                ...prev,
                schoolId: e
            }));
            const response = await fetchGradeBySchoolIdHandler(e as string);
            if (response?.status) {
                if (_?.isEmpty(response?.result?.data)) {
                    setValue('gradeId', '');
                    setValue('subjectId', '');
                    setValue('topicId', '');
                    setValue('subTopicId', '');
                }
                setGrades(response?.result?.data as Grade[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong While Fetching Topics' });
        }
    };

    const onChangeGrade = async (e: string, field: any) => {
        try {
            field?.onChange(e);
            setSelectedData((prev) => ({
                ...prev,
                gradeId: e
            }));
            const response = await fetchSubjectByGradeIdHandler(e as string);
            if (response?.status) {
                if (_?.isEmpty(response?.result?.data)) {
                    setValue('subjectId', '');
                    setValue('topicId', '');
                    setValue('subTopicId', '');
                }
                setSubjects(response?.result?.data as Subject[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong While Fetching SubTopics' });
        }
    };
    const onChangeSubject = async (e: string, field: any) => {
        try {
            field?.onChange(e);
            setSelectedData((prev) => ({
                ...prev,
                subjectId: e
            }));
            const response = await fetchTopicBySubjectIdHandler(e as string);
            if (response?.status) {
                if (_?.isEmpty(response?.result?.data)) {
                    setValue('topicId', '');
                    setValue('subTopicId', '');
                }
                setTopics(response?.result?.data as Topic[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong While Fetching SubTopics' });
        }
    };

    const onChangeTopic = async (e: string, field: any) => {
        try {
            field?.onChange(e);
            setSelectedData((prev) => ({
                ...prev,
                topicId: e
            }));
            const response = await fetchSubTopicBySubTopicIdHandler(e as string);
            if (response?.status) {
                if (_?.isEmpty(response?.result?.data)) {
                    setValue('subTopicId', '');
                }
                setSubTopics(response?.result?.data as SubTopic[]);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong While Fetching SubTopics' });
        }
    };
    const onChangeSubtopic = async (e: string, field: any) => {
        try {
            field?.onChange(e);
            setSelectedData((prev) => ({
                ...prev,
                subTopicId: e
            }));
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something Went Wrong While Fetching SubTopics' });
        }
    };
    console.log(MCQVisible);

    useEffect(() => {
        fetchSchools();
        setValue('MCQVisible', MCQVisible);
        setValue('shortQuestionVisible', shortQuestionVisible);
        setValue('longQuestionVisible', longQuestionVisible);
        setValue('fillInTheBlanksVisible', fillInTheBlanksVisible);
        setValue('multiFillInTheBlanksVisible', multiFillInTheBlanksVisible);
        setValue('multipleShortVisible', multipleShortVisible);
        setValue('sequenceVisible', sequenceVisible);
        setValue('multipleTrueFalseVisible', multipleTrueFalseVisible);
        setValue('multipleQuestionV2Visible', multipleQuestionV2Visible);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setValue('MCQVisible', MCQVisible);
        setValue('shortQuestionVisible', shortQuestionVisible);
        setValue('longQuestionVisible', longQuestionVisible);
        setValue('fillInTheBlanksVisible', fillInTheBlanksVisible);
        setValue('multiFillInTheBlanksVisible', multiFillInTheBlanksVisible);
        setValue('multipleShortVisible', multipleShortVisible);
        setValue('sequenceVisible', sequenceVisible);
        setValue('multipleTrueFalseVisible', multipleTrueFalseVisible);
        setValue('multipleQuestionV2Visible', multipleQuestionV2Visible);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [MCQVisible, shortQuestionVisible, longQuestionVisible, fillInTheBlanksVisible, multiFillInTheBlanksVisible, multipleShortVisible, sequenceVisible, multipleTrueFalseVisible, multipleQuestionV2Visible]);

    return (
        <>
            <Toast ref={toast} />

            <h5>Create Questions</h5>
            <div className="card">
                <div className="grid p-fluid mt-3">
                    <div className="field col-12 md:col-3">
                        <Controller
                            name="schoolId"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Select School' }}
                            render={({ field }) => (
                                <FormFieldWithLabel
                                    label="Select School"
                                    showCharLimit={false}
                                    showOptionalText={false}
                                    formField={
                                        <>
                                            <Dropdown
                                                value={field?.value}
                                                onChange={(e) => {
                                                    onSchoolChange(e?.value, field);
                                                }}
                                                options={schools}
                                                optionLabel="type"
                                                optionValue="id"
                                                placeholder="Select a School"
                                                filter
                                                className={`w-100 ${ExportErrors?.schoolId?.message ? 'p-invalid' : ''}`}
                                            />
                                            <ErrorMessage text={ExportErrors?.schoolId?.message} />
                                        </>
                                    }
                                />
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-3">
                        <Controller
                            name="gradeId"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Select Grade' }}
                            render={({ field }) => (
                                <FormFieldWithLabel
                                    label="Select Grade"
                                    showCharLimit={false}
                                    showOptionalText={false}
                                    formField={
                                        <>
                                            <Dropdown
                                                value={field?.value}
                                                onChange={(e) => {
                                                    onChangeGrade(e?.value, field);
                                                }}
                                                options={grades}
                                                optionLabel="grade"
                                                optionValue="id"
                                                placeholder="Select a Grade"
                                                filter
                                                className={`w-100 ${ExportErrors?.gradeId?.message ? 'p-invalid' : ''}`}
                                            />
                                            <ErrorMessage text={ExportErrors?.gradeId?.message} />
                                        </>
                                    }
                                />
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-3">
                        <Controller
                            name="subjectId"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Select Subject' }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Subject"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={(e) => onChangeSubject(e?.value, field)}
                                                options={subjects}
                                                optionLabel="subject"
                                                optionValue="id"
                                                placeholder="Select a Subject"
                                                filter
                                                className={`w-100 ${ExportErrors?.subjectId?.message ? 'p-invalid' : ''}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.subjectId?.message} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-3">
                        <Controller
                            name="topicId"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Select Topic' }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Topic"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={(e) => onChangeTopic(e?.value, field)}
                                                options={topics}
                                                optionLabel="topic"
                                                optionValue="id"
                                                placeholder="Select a Topic"
                                                filter
                                                className={`w-100 ${ExportErrors?.topicId?.message ? 'p-invalid' : ''}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.topicId?.message} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-16 md:col-6">
                        <Controller
                            name="subTopicId"
                            control={control}
                            rules={{ required: 'Select Sub Topic' }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Sub Topic"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={(e) => onChangeSubtopic(e?.value, field)}
                                                options={subTopics}
                                                optionLabel="subTopic"
                                                optionValue="id"
                                                placeholder="Select Sub Topic"
                                                filter
                                                className={`w-100 ${ExportErrors?.subTopicId?.message ? 'p-invalid' : ''}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={ExportErrors?.subTopicId?.message} />
                                </>
                            )}
                        />
                    </div>
                    <div className="w-full"></div>

                    <div className="field col-16 md:col-3">
                        <div className="flex align-items-center">
                            <label htmlFor="" className="mr-3 font-bold">
                                {' '}
                                {`Use MCQ's`}
                            </label>
                            <InputSwitch checked={MCQVisible} onChange={(e) => setMCQVisible(!MCQVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className="flex align-items-center">
                            <label htmlFor="" className="mr-3 font-bold">
                                {' '}
                                {`Use Short Question`}
                            </label>
                            <InputSwitch checked={shortQuestionVisible} onChange={(e) => setShortQuestionVisible(!shortQuestionVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className="flex align-items-center">
                            <label htmlFor="" className="mr-3 font-bold">
                                {' '}
                                {`Use Long Answer`}
                            </label>
                            <InputSwitch checked={longQuestionVisible} onChange={(e) => setLongQuestionVisible(!longQuestionVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className="flex align-items-center">
                            <label htmlFor="" className="mr-3 font-bold">
                                {' '}
                                {`File in the blanks`}
                            </label>
                            <InputSwitch checked={fillInTheBlanksVisible} onChange={(e) => setFillInTheBlanksVisible(!fillInTheBlanksVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className="flex align-items-center">
                            <label htmlFor="" className="mr-3 font-bold">
                                {' '}
                                {`Multiple Short Question`}
                            </label>
                            <InputSwitch checked={multipleShortVisible} onChange={(e) => setMultipleShortVisible(!multipleShortVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className="flex align-items-center">
                            <label htmlFor="" className="mr-3 font-bold">
                                {' '}
                                {`Sequence`}
                            </label>
                            <InputSwitch checked={sequenceVisible} onChange={(e) => setSequenceVisible(!sequenceVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className="flex align-items-center">
                            <label htmlFor="" className="mr-3 font-bold">
                                {' '}
                                {`Multiple True False`}
                            </label>
                            <InputSwitch checked={multipleTrueFalseVisible} onChange={(e) => setMultipleTrueFalseVisible(!multipleTrueFalseVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className="flex align-items-center">
                            <label htmlFor="" className="mr-3 font-bold">
                                {' '}
                                {`Multiple Fill in the blanks`}
                            </label>
                            <InputSwitch checked={multiFillInTheBlanksVisible} onChange={(e) => setMultiFillInTheBlanksVisible(!multiFillInTheBlanksVisible)} />
                        </div>
                    </div>
                    <div className="field col-16 md:col-3">
                        <div className="flex align-items-center">
                            <label htmlFor="" className="mr-3 font-bold">
                                {' '}
                                {`Group Short Question`}
                            </label>
                            <InputSwitch checked={multipleQuestionV2Visible} onChange={(e) => setMultipleQuestionV2Visible(!multipleQuestionV2Visible)} />
                        </div>
                    </div>
                </div>

                <div className="gap-2">
                    <Button label={`Apply`} onClick={handleSubmit(submitForm)} icon="pi pi-check" />
                </div>
            </div>
        </>
    );
};

export default Export;
