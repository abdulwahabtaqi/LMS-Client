import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import FormFieldWithLabel from '../../shared/components/FormFieldWithLabel/FormFieldWithLabel';
import { TextField } from '../../shared/components/TextField/TextField';
import { Button } from 'primereact/button';
import { useAppContext } from '../../../layout/context/layoutcontext';
import { Question, SubTopic } from '../../shared/types';
import updateQuestionHandler from '../../context/server/question/updateQuestionHandler';
import createQuestionHandler from '../../context/server/question/createQuestionHandler';
import fetchSubTopicsHandler from '../../context/server/subTopic/fetchSubTopicsHandler';
import { Dropdown } from 'primereact/dropdown';
import { ErrorMessage } from '../../shared/components/ErrorMessage/ErrorMessage';

interface AddAndEditQuestionProps {
    question?: Question;
    isNew: boolean;
}

const AddAndEditQuestion: React.FC<AddAndEditQuestionProps> = (props) => {
    const [subTopics, setSubTopics] = useState<SubTopic[]>([] as SubTopic[]);
    const [image, setImage] = useState<string>('');
    const [answerText, setAnswerText] = useState<string>('');
    const questionTypes = [
        { label: 'MCQ', value: 'MCQ' },
        { label: 'SHORT', value: 'SHORT' },
        { label: 'LONG', value: 'LONG' }
    ];
    const difficultyLevel = [
        { label: 'EASY', value: 'EASY' },
        { label: 'MEDIUM', value: 'MEDIUM' },
        { label: 'HARD', value: 'HARD' }
    ];

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors: QuestionErrors }
    } = useForm<Question>({
        mode: 'onBlur'
    });

    const editAnswer = (e: any) => {
        setAnswerText(e);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const g = useAppContext();
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

    const updateQuestion = async (question: Question) => {
        console.log(answerText);
        await updateQuestionHandler({ ...question, questionImages: image, answer: answerText }, question?.id);
    };

    const submitForm: SubmitHandler<Question> = async (question: Question) => {
        try {
            if (props?.isNew) {
                await createQuestionHandler({ ...question, questionImages: image });
            } else {
                await updateQuestion(question);
            }
        } catch (error) {
            g?.setToaster({ severity: 'error', summary: 'Error', detail: 'Something went wrong, Please try again later' });
        }
    };

    useEffect(() => {
        if (props?.question) {
            setValue('question', props?.question?.question);
            setValue('id', props?.question?.id);
            reset(props.question);
            setAnswerText(props?.question?.answers?.[0]?.answer || '');

            setImage(props?.question?.questionImage || '');
        }
    }, [props.question, reset, setValue]);

    useEffect(() => {
        fetchSubTopics();
    }, []);

    return (
        <>
            <div className="card">
                <h5>{props?.isNew ? 'New Question' : 'Update Question'}</h5>
                <div className="grid p-fluid mt-3">
                    <div className="field col-12 md:col-5">
                        <Controller
                            name="question"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Question name is required' }}
                            render={({ field }) => (
                                <FormFieldWithLabel
                                    label="Question Name"
                                    showCharLimit={false}
                                    showOptionalText={false}
                                    formField={<TextField placeholder="eg. What is pending state in promise" dataAttribute="brand_name" errorMessage={QuestionErrors?.question?.message} value={field?.value} onChange={field.onChange} />}
                                />
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-5">
                        <Controller
                            name="type"
                            control={control}
                            rules={{ required: 'Select Question Type' }}
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
                                                className={`w-100 ${QuestionErrors?.type?.message ? 'p-invalid' : ''}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={QuestionErrors?.type?.message} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-5">
                        <Controller
                            name="difficultyLevel"
                            control={control}
                            rules={{ required: 'Select Difficulty Level' }}
                            render={({ field }) => (
                                <>
                                    <FormFieldWithLabel
                                        label="Select Difficulty Level"
                                        showCharLimit={false}
                                        showOptionalText={false}
                                        formField={
                                            <Dropdown
                                                value={field?.value}
                                                onChange={field?.onChange}
                                                options={difficultyLevel}
                                                optionLabel="label"
                                                optionValue="value"
                                                placeholder="Select Difficulty Level"
                                                filter
                                                className={`w-100 ${QuestionErrors?.difficultyLevel?.message ? 'p-invalid' : ''}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={QuestionErrors?.difficultyLevel?.message} />
                                </>
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-5">
                        <Controller
                            name="marks"
                            control={control}
                            rules={{ required: 'Question marks required' }}
                            render={({ field }) => (
                                <FormFieldWithLabel
                                    label="Question Marks"
                                    showCharLimit={false}
                                    showOptionalText={false}
                                    formField={<TextField type="number" placeholder="eg. 5" errorMessage={QuestionErrors?.marks?.message} value={String(field?.value)} onChange={field.onChange} />}
                                />
                            )}
                        />
                    </div>
                    <div className="field col-12 md:col-5">
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
                                                onChange={field?.onChange}
                                                options={subTopics}
                                                optionLabel="subTopic"
                                                optionValue="id"
                                                placeholder="Select Sub Topic"
                                                filter
                                                className={`w-100 ${QuestionErrors?.subTopicId?.message ? 'p-invalid' : ''}`}
                                            />
                                        }
                                    />
                                    <ErrorMessage text={QuestionErrors?.subTopicId?.message} />
                                </>
                            )}
                        />
                    </div>

                    {!props.isNew && props.question?.type === 'LONG' && (
                        <div className="field col-12 md:col-5">
                            <FormFieldWithLabel label="Answer" formField={<TextField placeholder="Provide the answer here" errorMessage="Error updating answer" value={answerText} onChange={(e) => editAnswer(e)} />} />
                        </div>
                    )}
                </div>
                <div className="field col-4">
                    <label htmlFor="file-upload" className="p-button " style={{ cursor: 'pointer' }}>
                        <span className=" text-white font-bold">Choose Image</span>
                        <input id="file-upload" type="file" accept="image/*" multiple onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                    {image.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                            <div style={{ marginRight: '10px', marginBottom: '10px' }}>
                                <img src={image} alt={`Preview `} style={{ maxWidth: '100px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
                            </div>
                        </div>
                    )}
                </div>
                <div className="gap-2 flex">
                    <Button label={`${props?.isNew ? 'Save' : 'Update'}`} onClick={handleSubmit(submitForm)} icon="pi pi-check" />
                </div>
            </div>
        </>
    );
};

export default AddAndEditQuestion;
