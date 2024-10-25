import React, { useEffect, useRef, useState } from 'react';
import { Question } from '../../shared/types';
import _ from 'lodash';
import { Button } from 'primereact/button';
type ProcessedStrings = [string, string];
interface QuestionPaperProps {
    filteredMcqQuestions: Question[];
    filteredShortQuestions: Question[];
    filteredLongQuestions: Question[];
    filteredFillInTheBlanksQuestions: Question[];
    filteredMultiFillInTheBlanksQuestions: Question[];
    filteredMultipleShortQuestions: Question[];
    filteredSequenceQuestions: Question[];
    filteredMultipleTrueFalseQuestions: Question[];
    filteredMultipleQuestionV2Questions: Question[];
    download?: boolean;
    mode?: boolean;
    exportName?: string;
    setVisible?: any;
}
let counter = 0;
const QuestionPaper: React.FC<QuestionPaperProps> = ({
    mode,
    filteredFillInTheBlanksQuestions,
    filteredLongQuestions,
    filteredMcqQuestions,
    filteredMultiFillInTheBlanksQuestions,
    filteredMultipleShortQuestions,
    filteredMultipleTrueFalseQuestions,
    filteredSequenceQuestions,
    filteredShortQuestions,
    filteredMultipleQuestionV2Questions,
    setVisible
}) => {
    const [globalCounter, setGlobalCounter] = useState<number>(0);

    const processInputStringV2 = (inputString: string): [string, string] => {
        const extractedPattern = inputString.match(/--\s*(.*?)\s*--/)?.[1] || '';
        const modifiedPattern = extractedPattern.replace(/d22/g, '_');
        const cleanedString = inputString.replace(/--\s*(.*?)\s*--/, '').replace(/d22/g, '_');
        return [modifiedPattern, cleanedString];
    };
    // const [isDownloadFirstTime, setIsDownloadFirstTime] = useState<boolean>(false);
    // const downloadable = useRef<HTMLDivElement>(null);
    const extractWordsBetweenMarkers = (inputString: string): string[] => {
        // Regular expression to match words between "-- --"
        const regex = /--\s*(.*?)\s*--/g;

        // Set to store unique words
        const uniqueWords = new Set<string>();

        let match: RegExpExecArray | null;
        const uniqueWordsArray: string[] = [];
        while ((match = regex.exec(inputString)) !== null) {
            match?.[1]?.split(',')?.forEach((word) => {
                const trimmedWord = word?.trim();
                if (trimmedWord !== '') {
                    uniqueWordsArray?.push(trimmedWord);
                }
            });
        }
        return uniqueWordsArray;
    };
    const processInputString = (inputString: string): ProcessedStrings => {
        const matches = inputString?.match(/DASH(\d+)/g) || [];

        let originalString: string = inputString;
        let modifiedString: string = inputString;
        let getAnswers = extractWordsBetweenMarkers(inputString);

        matches?.forEach((match: string, index: number) => {
            let replacement = getAnswers[index];
            originalString = originalString?.replace(match, replacement);
            modifiedString = modifiedString?.replace(match, '__________________');
        });

        modifiedString = modifiedString?.replace(/--\s*(.*?)\s*--/g, ''); // Remove words between '--'
        originalString = originalString?.replace(/--\s*(.*?)\s*--/g, ''); // Remove words between '--' in the original string as well

        return [modifiedString, originalString];
    };
    const CreateMcqQuestion = () => {
        const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
        const [correctAnswers, setCorrectAnswers] = useState(0);
        const [incorrectAnswers, setIncorrectAnswers] = useState(0);
        const [totalScore, setTotalScore] = useState(0);

        const isMultipleChoice = (type: any) => type.includes('MCQ');

        const handleAnswerChange = (questionId: string, answer: any, isMultiple: boolean) => {
            setSelectedAnswers((prevSelectedAnswers) => {
                const newAnswers = { ...prevSelectedAnswers, [questionId]: answer.answer };

                // Check if the answer is correct
                if (answer.isCorrect) {
                    if (!prevSelectedAnswers[questionId]) {
                        setCorrectAnswers((prev) => prev + 1);
                        setTotalScore((prevScore) => prevScore + 1);
                    }
                } else {
                    if (!prevSelectedAnswers[questionId]) {
                        setIncorrectAnswers((prev) => prev + 1);
                    }
                }

                console.log('Selected Answers:', newAnswers);
                console.log('Correct Answers:', correctAnswers + (answer.isCorrect ? 1 : 0));
                console.log('Incorrect Answers:', incorrectAnswers + (!answer.isCorrect ? 1 : 0));
                console.log('Total Score:', totalScore + (answer.isCorrect ? 1 : 0));

                return newAnswers;
            });
        };

        return (
            <>
                {filteredMcqQuestions?.map((question, questionIndex) => {
                    const isMultiple = isMultipleChoice(question.type);

                    return (
                        <div key={question.id}>
                            <div className="flex w-full" style={{ justifyContent: 'space-between' }}>
                                <h5 style={{ color: '#000' }}>
                                    {questionIndex + 1}. {question.question}
                                </h5>
                                {question.questionImage && <img src={question.questionImage} width={100} height={100} alt="" />}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                {question.answers.map((answer, ansIndex) => (
                                    <div key={answer.id} style={{ width: '47.99%', marginBottom: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type={isMultiple ? 'checkbox' : 'radio'}
                                                name={`question-${question.id}`}
                                                value={answer.answer}
                                                checked={selectedAnswers[question.id] === answer.answer}
                                                onChange={() => handleAnswerChange(question.id, answer, isMultiple)}
                                                style={{ cursor: 'pointer', marginRight: '10px' }}
                                            />
                                            <label style={{ cursor: 'pointer', lineHeight: '15px' }}>{answer.answer}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };

    // const CreateSequenceQuestion = () => {
    //     return (
    //         <>
    //             {filteredSequenceQuestions?.flatMap((question, index) => {
    //                 return (
    //                     <>
    //                         <div className="flex w-full " style={{ width: '100%', justifyContent: 'space-between' }} key={index}>
    //                             <h4 style={{ color: '#000' }}>
    //                                 {index + 1 + (filteredMcqQuestions?.length || 0)}. {question?.question}
    //                             </h4>
    //                             <img src={question?.questionImage} width={100} height={100} alt="" />
    //                         </div>
    //                         <div key={index} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
    //                             {question?.answers?.map((answer, ansIndex) => {
    //                                 return (
    //                                     <>
    //                                         <div key={ansIndex} style={{ width: '47.99%', marginBottom: '10px' }}>
    //                                             <img
    //                                                 src={!_?.isEmpty(answer?.answerImage) ? answer?.answerImage : 'https://cdni.iconscout.com/illustration/premium/thumb/dna-sequence-cloning-and-recombination-biotechnology-2974924-2477355.png?f=webp'}
    //                                                 alt="Description"
    //                                                 style={{ width: '80%' }}
    //                                             />
    //                                             <div style={{ display: 'flex' }}>
    //                                                 <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}>
    //                                                     <b style={{ color: 'skyblue' }}>{mode ? String(answer?.sequenceNo) : ''}</b>
    //                                                 </div>
    //                                                 <label style={{ marginLeft: '10px', lineHeight: '25px' }}>{answer?.answer}</label>
    //                                             </div>
    //                                         </div>
    //                                     </>
    //                                 );
    //                             })}
    //                         </div>
    //                     </>
    //                 );
    //             })}
    //         </>
    //     );
    // };
    const CreateSequenceQuestion = () => {
        const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string[] }>({});

        const handleAnswerChange = (questionId: string, answer: string, isCorrect: boolean) => {
            setSelectedAnswers((prevSelectedAnswers) => {
                const currentAnswers = prevSelectedAnswers[questionId] || [];
                const isAnswerSelected = currentAnswers.includes(answer);

                // Update the selected answers
                const newAnswers = isAnswerSelected
                    ? currentAnswers.filter((a) => a !== answer) // Remove if already selected
                    : [...currentAnswers, answer]; // Add if not selected

                // Log correct and incorrect selections
                logSelections(questionId, newAnswers);

                return { ...prevSelectedAnswers, [questionId]: newAnswers };
            });
        };

        const logSelections = (questionId: string, selected: any) => {
            const question = filteredSequenceQuestions.find((q: any) => q.id === questionId);
            if (!question) return;

            // Get the correct answers
            const correctAnswers = question.answers.filter((answer: any) => answer.isCorrect).map((answer: any) => answer.answer);

            const correctSelections = selected.filter((answer: any) => correctAnswers.includes(answer));
            const incorrectSelections = selected.filter((answer: any) => !correctAnswers.includes(answer));

            console.log(`Question ID: ${questionId}`);
            console.log(`Selected Answers: ${selected}`);
            console.log(`Correct Answers Selected: ${correctSelections}`);
            console.log(`Incorrect Answers Selected: ${incorrectSelections}`);
        };

        return (
            <>
                {filteredSequenceQuestions?.map((question: any, index: any) => {
                    return (
                        <div className="question-container" key={question.id}>
                            <div className="flex w-full" style={{ justifyContent: 'space-between' }}>
                                <h4 style={{ color: '#000' }}>
                                    {index + 1}. {question?.question}
                                </h4>
                                {question?.questionImage && <img src={question.questionImage} width={100} height={100} alt="Question" />}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                {question?.answers?.map((answer: any, ansIndex: any) => {
                                    const isChecked = selectedAnswers[question.id]?.includes(answer.answer);
                                    return (
                                        <div key={ansIndex} style={{ width: '47.99%', marginBottom: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <input type="checkbox" checked={isChecked} onChange={() => handleAnswerChange(question.id, answer.answer, answer.isCorrect)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                                                <label style={{ lineHeight: '25px' }}>{answer.answer}</label>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };

    const CreateMultiFillInTheBlanks = () => {
        return (
            <>
                {filteredMultiFillInTheBlanksQuestions?.flatMap((question, index) => {
                    return (
                        <>
                            <div className="flex w-full " style={{ width: '100%', justifyContent: 'space-between' }} key={index}>
                                <h5 style={{ color: '#000' }}>
                                    {index + 1 + (filteredMcqQuestions?.length || 0) + (filteredSequenceQuestions?.length || 0)}. {question?.question}
                                </h5>
                                <img src={question?.questionImage} width={100} height={100} alt="" />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    {question?.answers?.map((answer, ansIndex) => {
                                        const [modifiedString, originalString] = processInputStringV2(answer?.answer || '');
                                        return (
                                            <>
                                                <p style={{ color: '#000', marginBottom: '20px' }}>
                                                    {ansIndex + 1}.{' '}
                                                    {mode ? (
                                                        <>
                                                            {modifiedString}
                                                            <hr />
                                                        </>
                                                    ) : (
                                                        originalString
                                                    )}
                                                </p>
                                            </>
                                        );
                                    })}
                                </div>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    <img src={question?.questionImage} alt="Description" style={{ width: '50%' }} />
                                </div>
                            </div>
                        </>
                    );
                })}
            </>
        );
    };
    // const CreateMultipleTrueFalseQuestion = () => {
    //     return (
    //         <>
    //             {filteredMultipleTrueFalseQuestions?.flatMap((question, index) => {
    //                 return (
    //                     <>
    //                         <div className="flex w-full " style={{ width: '100%', justifyContent: 'space-between' }} key={index}>
    //                             <h5 style={{ color: '#000' }}>
    //                                 {index + 1 + (filteredMcqQuestions?.length || 0) + (filteredSequenceQuestions?.length || 0) + (filteredMultiFillInTheBlanksQuestions?.length || 0)}. {question?.question}
    //                             </h5>
    //                             <img src={question?.questionImage} width={100} height={100} alt="" />
    //                         </div>
    //                         <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
    //                             <div style={{ width: '47.99%', marginBottom: '10px' }}>
    //                                 {question?.answers?.map((answer, ansIndex) => {
    //                                     return (
    //                                         <>
    //                                             <p style={{ color: '#000', marginBottom: '20px' }}>
    //                                                 {ansIndex + 1}. {answer?.answer}
    //                                             </p>
    //                                         </>
    //                                     );
    //                                 })}
    //                             </div>
    //                             <div style={{ width: '47.99%', marginBottom: '10px', marginTop: '-31px' }}>
    //                                 <div style={{ display: 'flex' }}>
    //                                     <h4 style={{ marginRight: '10px', marginBottom: '8px' }}>Right</h4>
    //                                     <h4 style={{ marginLeft: '10px', marginBottom: '8px' }}>Wrong</h4>
    //                                 </div>

    //                                 {question?.answers?.map((answer, ansIndex) => {
    //                                     return (
    //                                         <>
    //                                             <div style={{ display: 'flex' }}>
    //                                                 <div className="my-1" style={{ width: '20px', height: '20px', border: '2px solid #000' }}>
    //                                                     <span style={{ color: 'skyBlue' }}>{mode ? `${answer?.isCorrect ? '✔' : ''}` : ``}</span>
    //                                                 </div>
    //                                                 <div style={{ width: '20px', height: '20px', border: '2px solid #000', marginLeft: '35px' }}>
    //                                                     <span style={{ color: 'red' }}>{mode ? `${answer?.isCorrect ? '' : '✘'}` : ``}</span>
    //                                                 </div>
    //                                             </div>
    //                                         </>
    //                                     );
    //                                 })}
    //                             </div>
    //                         </div>
    //                     </>
    //                 );
    //             })}
    //         </>
    //     );
    // };

    const CreateMultipleTrueFalseQuestion = () => {
        const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: { [answerId: string]: string } }>({});

        const handleAnswerChange = (questionId: string, answerId: string, selection: string) => {
            setSelectedAnswers((prevSelectedAnswers) => ({
                ...prevSelectedAnswers,
                [questionId]: {
                    ...prevSelectedAnswers[questionId],
                    [answerId]: selection
                }
            }));
            console.log(selectedAnswers);
        };

        return (
            <>
                {filteredMultipleTrueFalseQuestions?.map((question, index) => (
                    <div className="question-container" key={question.id}>
                        <div className="flex w-full" style={{ justifyContent: 'space-between' }}>
                            <h5 style={{ color: '#000' }}>
                                {index + 1}. {question?.question}
                            </h5>
                            {question?.questionImage && <img src={question.questionImage} width={100} height={100} alt="Question" />}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {question?.answers?.map((answer, ansIndex) => (
                                <div key={ansIndex} style={{ marginBottom: '10px', display: 'flex', width: '100%', gap: '30%', alignItems: 'center' }}>
                                    <p style={{ color: '#000' }}>
                                        {ansIndex + 1}. {answer.answer}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label style={{ marginRight: '15px' }}>
                                            <input
                                                type="radio"
                                                name={`answer-${question.id}-${answer.id}`} // Group by question and answer
                                                value="Right"
                                                checked={selectedAnswers[question.id]?.[answer.id] === 'Right'}
                                                onChange={() => handleAnswerChange(question.id, answer.id, 'Right')}
                                            />
                                            Right
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`answer-${question.id}-${answer.id}`} // Group by question and answer
                                                value="Wrong"
                                                checked={selectedAnswers[question.id]?.[answer.id] === 'Wrong'}
                                                onChange={() => handleAnswerChange(question.id, answer.id, 'Wrong')}
                                            />
                                            Wrong
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </>
        );
    };

    // const CreateShortQuestion = () => {
    //     return (
    //         <>
    //             {filteredShortQuestions?.flatMap((question, index) => {
    //                 return (
    //                     <>
    //                         <div className="flex w-full " style={{ width: '100%', justifyContent: 'space-between' }} key={index}>
    //                             <h6 style={{ color: '#000' }}>
    //                                 {index + 1 + (filteredMcqQuestions?.length || 0) + (filteredSequenceQuestions?.length || 0) + (filteredMultiFillInTheBlanksQuestions?.length || 0) + (filteredMultipleTrueFalseQuestions?.length || 0)}.{' '}
    //                                 {question?.question}
    //                             </h6>
    //                             <img src={question?.questionImage} width={100} height={100} alt="" />
    //                         </div>
    //                         <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
    //                             <div style={{ width: '47.99%', marginBottom: '10px' }}>
    //                                 {question?.answers?.map((answer, ansIndex) => {
    //                                     return (
    //                                         <>
    //                                             <p style={{ color: '#000', marginBottom: '20px' }}>
    //                                                 {' '}
    //                                                 {mode ? (
    //                                                     <>
    //                                                         {' '}
    //                                                         {answer?.answer}{' '}
    //                                                         <b>
    //                                                             <hr />
    //                                                         </b>
    //                                                     </>
    //                                                 ) : (
    //                                                     '_____________________________________________________________________'
    //                                                 )}
    //                                             </p>
    //                                         </>
    //                                     );
    //                                 })}
    //                             </div>
    //                         </div>
    //                     </>
    //                 );
    //             })}
    //         </>
    //     );
    // };

    const CreateShortQuestion = () => {
        const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});

        const handleAnswerChange = (questionId: string, value: string) => {
            setUserAnswers((prevAnswers) => ({
                ...prevAnswers,
                [questionId]: value
            }));
        };

        return (
            <>
                {filteredShortQuestions?.flatMap((question, index) => (
                    <div key={question.id} className="question-container">
                        <div className="flex w-full" style={{ justifyContent: 'space-between' }}>
                            <h6 style={{ color: '#000' }}>
                                {index + 1 + (filteredMcqQuestions?.length || 0) + (filteredSequenceQuestions?.length || 0) + (filteredMultiFillInTheBlanksQuestions?.length || 0) + (filteredMultipleTrueFalseQuestions?.length || 0)}.{' '}
                                {question?.question}
                            </h6>
                            {question?.questionImage && <img src={question.questionImage} width={100} height={100} alt="Question" />}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                            {question?.answers?.map((answer, ansIndex) => (
                                <div key={ansIndex} style={{ marginBottom: '15px' }}>
                                    <input
                                        type="text"
                                        placeholder="Enter your answer here"
                                        value={userAnswers[question.id] || ''}
                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </>
        );
    };

    // const CreateLongQuestion = () => {
    //     return (
    //         <>
    //             {filteredLongQuestions?.flatMap((question, index) => {
    //                 return (
    //                     <>
    //                         <div className="flex w-full " style={{ width: '100%', justifyContent: 'space-between' }} key={index}>
    //                             <h6 style={{ color: '#000' }}>
    //                                 {index +
    //                                     1 +
    //                                     (filteredMcqQuestions?.length || 0) +
    //                                     (filteredSequenceQuestions?.length || 0) +
    //                                     (filteredMultiFillInTheBlanksQuestions?.length || 0) +
    //                                     (filteredMultipleTrueFalseQuestions?.length || 0) +
    //                                     (filteredShortQuestions?.length || 0)}
    //                                 . {question?.question}
    //                             </h6>
    //                             <img src={question?.questionImage} width={100} height={100} alt="" />
    //                         </div>
    //                         <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
    //                             <div style={{ width: '47.99%', marginBottom: '10px' }}>
    //                                 {question?.answers?.map((answer, ansIndex) => {
    //                                     return (
    //                                         <>
    //                                             <p style={{ color: '#000', marginBottom: '20px' }}>
    //                                                 {' '}
    //                                                 {mode ? (
    //                                                     <>
    //                                                         {' '}
    //                                                         {answer?.answer}{' '}
    //                                                         <b>
    //                                                             <hr />
    //                                                         </b>
    //                                                     </>
    //                                                 ) : (
    //                                                     '_____________________________________________________________________'
    //                                                 )}
    //                                             </p>
    //                                         </>
    //                                     );
    //                                 })}
    //                             </div>
    //                         </div>
    //                     </>
    //                 );
    //             })}
    //         </>
    //     );
    // };
    const CreateLongQuestion = () => {
        const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});

        const handleAnswerChange = (questionId: any, value: any) => {
            setUserAnswers((prevAnswers) => ({
                ...prevAnswers,
                [questionId]: value
            }));
        };

        return (
            <>
                {filteredLongQuestions?.map((question, index) => (
                    <div className="question-container" key={question.id}>
                        <div className="flex w-full" style={{ justifyContent: 'space-between' }}>
                            <h6 style={{ color: '#000' }}>
                                {index +
                                    1 +
                                    (filteredMcqQuestions?.length || 0) +
                                    (filteredSequenceQuestions?.length || 0) +
                                    (filteredMultiFillInTheBlanksQuestions?.length || 0) +
                                    (filteredMultipleTrueFalseQuestions?.length || 0) +
                                    (filteredShortQuestions?.length || 0)}
                                . {question?.question}
                            </h6>
                            {question?.questionImage && <img src={question.questionImage} width={100} height={100} alt="Question" />}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                            {question?.answers?.map((answer, ansIndex) => (
                                <textarea
                                    key={ansIndex}
                                    style={{ width: '100%', height: '100px', marginBottom: '15px', padding: '10px' }}
                                    placeholder="Write your answer here..."
                                    value={userAnswers[question.id] || ''}
                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </>
        );
    };

    const CreateMultipleShortQuestion = () => {
        return (
            <>
                {filteredMultipleShortQuestions?.flatMap((question, index) => {
                    counter++;
                    return (
                        <>
                            <div className="flex w-full " style={{ width: '100%', justifyContent: 'space-between' }} key={index}>
                                <h4 style={{ color: '#000' }}>
                                    {globalCounter}. {question?.question}
                                </h4>
                                <img src={question?.questionImage} width={100} height={100} alt="" />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    {question?.answers?.map((answer, ansIndex) => {
                                        return (
                                            <>
                                                <p style={{ color: '#000', marginBottom: '20px' }}>
                                                    {ansIndex + 1}.{' '}
                                                    {mode ? (
                                                        <>
                                                            {' '}
                                                            {answer?.answer}{' '}
                                                            <b>
                                                                <hr />
                                                            </b>
                                                        </>
                                                    ) : (
                                                        '_________________________________________'
                                                    )}
                                                </p>
                                            </>
                                        );
                                    })}
                                </div>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    <img src={question?.questionImage} alt="Description" style={{ width: '50%' }} />
                                </div>
                            </div>
                        </>
                    );
                })}
            </>
        );
    };
    const CreateFillInTheBlanksShortQuestion = () => {
        return (
            <>
                {filteredFillInTheBlanksQuestions?.flatMap((question, index) => {
                    counter++;
                    return (
                        <>
                            <div className="flex w-full " style={{ width: '100%', justifyContent: 'space-between' }} key={index}>
                                <h4 style={{ color: '#000' }}>
                                    {globalCounter}. {question?.question}
                                </h4>
                                <img src={question?.questionImage} width={50} height={50} alt="" />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    {question?.answers?.map((answer, ansIndex) => {
                                        const [modifiedString, originalString] = processInputString(answer?.answer || '');
                                        return (
                                            <>
                                                <p style={{ color: '#000', marginBottom: '20px', lineHeight: '33px' }}>
                                                    {ansIndex + 1}.{' '}
                                                    {mode ? (
                                                        <>
                                                            {originalString}
                                                            <hr />
                                                        </>
                                                    ) : (
                                                        modifiedString
                                                    )}
                                                </p>
                                            </>
                                        );
                                    })}
                                </div>
                                <div style={{ width: '25.99%', marginBottom: '5px' }}>
                                    <img
                                        src={!_?.isEmpty(question?.questionImage) ? question?.questionImage : 'https://www.freepnglogos.com/uploads/thinking-png/thinking-get-started-with-marketing-for-new-retail-business-owners-8.png'}
                                        alt="Description"
                                        style={{ width: '50%' }}
                                    />
                                </div>
                            </div>
                        </>
                    );
                })}
            </>
        );
    };
    const CreateMultipleShortQuestionV2 = () => {
        return (
            <>
                {filteredMultipleQuestionV2Questions?.flatMap((question, index) => {
                    // setGlobalCounter(globalCounter + 1);
                    counter++;
                    return (
                        <>
                            <div className="flex w-full " style={{ width: '100%', justifyContent: 'space-between' }} key={index}>
                                <h4 style={{ color: '#000' }}>
                                    {globalCounter}. {question?.question}
                                </h4>
                                <img src={question?.questionImage} width={100} height={100} alt="" />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                    <div style={{ width: '120%', marginBottom: '10px' }}>
                                        {question?.answers?.map((answer, ansIndex) => {
                                            return (
                                                <>
                                                    <p style={{ color: '#000', marginBottom: '20px' }}>
                                                        {ansIndex + 1}. {answer?.answer}
                                                    </p>
                                                    <p style={{ color: '#000', marginBottom: '20px' }}>
                                                        {mode ? (
                                                            <>
                                                                <hr />
                                                                {answer?.additional}
                                                            </>
                                                        ) : (
                                                            '___________________________________________________________________________'
                                                        )}
                                                    </p>
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}
            </>
        );
    };

    useEffect(() => {
        setGlobalCounter(counter);
    }, []);
    // useEffect(() => {
    //     if (isDownloadFirstTime) {
    //         const printable = downloadable?.current?.innerHTML;
    //         const printWindow = window.open('', '', 'height=400,width=800');
    //         printWindow?.document.write('<html><head><title>Question Paper</title>');
    //         printWindow?.document.write('</head><body >');
    //         printWindow?.document.write(printable || '');
    //         printWindow?.document.write('</body></html>');
    //         printWindow?.print();
    //         printWindow?.document.close();
    //         if (printable) {
    //             const blob = new Blob([printable], { type: 'text/html' });
    //             const url = URL.createObjectURL(blob);
    //             const a = document.createElement('a');
    //             a.style.display = 'none';
    //             a.href = url;
    //             a.download = `questionPaper/${exportName}`;
    //             document.body.appendChild(a);
    //             a.click();
    //             URL.revokeObjectURL(url);
    //             document.body.removeChild(a); // Clean up
    //         }
    //     }
    //     setIsDownloadFirstTime(true);

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [download]);
    return (
        <>
            <div>
                <div contentEditable={true} style={{ position: 'sticky', top: 0, zIndex: 1000, width: '850px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #a6a6a6' }}>
                        <p style={{ color: '#a6a6a6', fontWeight: 600 }}>Way in LISTENING</p>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <p style={{ color: '#a6a6a6', fontWeight: 600 }}>LISTENING</p>
                            <p style={{ color: '#a6a6a6', fontWeight: 600, border: '3px solid #a6a6a6', borderRadius: '100%', padding: '5px 10px', marginLeft: '20px', marginRight: '30px', marginBottom: '-30px', background: '#fff' }}>2</p>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ color: '#000' }}>Name: ____________________________</p>
                        <p style={{ color: '#000' }}>Class: __________________</p>
                        <p style={{ color: '#000' }}>Date: __________________</p>
                    </div>
                    <CreateMcqQuestion />
                    <br />
                    <CreateSequenceQuestion />
                    <br />
                    <CreateMultiFillInTheBlanks />
                    <br />
                    <CreateMultipleTrueFalseQuestion />
                    <br />
                    <CreateShortQuestion />
                    <br />
                    <CreateLongQuestion />
                    <br />
                    {/* <CreateFillInTheBlanksShortQuestion /> */}
                    <br />
                    {/* <CreateMultipleShortQuestion /> */}
                    <br />
                    {/* <CreateMultipleShortQuestionV2 /> */}
                </div>
            </div>
            <Button label="Submit" onClick={() => setVisible(false)} />
        </>
    );
};

export default QuestionPaper;
