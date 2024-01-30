import React, { useState } from 'react'
import { TreeNode } from 'primereact/treenode';
import { Question } from '../../../shared/types';
import { Button } from 'primereact/button';

interface QuestionPaperProps {
    filteredMcqQuestions: Question[],
    filteredShortQuestions: Question[],
    filteredLongQuestions: Question[],
    filteredFillInTheBlanksQuestions: Question[],
    filteredMultiFillInTheBlanksQuestions: Question[],
    filteredMultipleShortQuestions: Question[],
    filteredSequenceQuestions: Question[],
    filteredMultipleTrueFalseQuestions: Question[],
}
const QuestionPaper: React.FC<QuestionPaperProps> = ({ filteredFillInTheBlanksQuestions, filteredLongQuestions, filteredMcqQuestions, filteredMultiFillInTheBlanksQuestions, filteredMultipleShortQuestions, filteredMultipleTrueFalseQuestions, filteredSequenceQuestions, filteredShortQuestions }) => {
    const [mode, setMode] = useState<string>('teacherPreview');
    const [globalCounter, setGlobalCounter] = useState<number>(0);
    const CreateSequenceQuestion = () => {
        return (
            <>
                {filteredSequenceQuestions?.flatMap((question, index) => {
                    // setGlobalCounter(globalCounter + 1);
                    return (
                        <>
                            <div key={index}>
                                <h4 style={{ color: '#000' }}>{globalCounter}. {question?.question}</h4>
                            </div>
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                {
                                    question?.answers?.map((answer, ansIndex) => {
                                        return (
                                            <>
                                                <div key={ansIndex} style={{ width: '47.99%', marginBottom: '10px' }}>
                                                    <img src={answer?.answerImage} alt="Description" style={{ width: '100%' }} />
                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}><b style={{ color: "skyblue" }}>{mode === "teacherPreview" ? String(answer?.sequenceNo) : ''}</b></div>
                                                        <label style={{ marginLeft: '10px', lineHeight: '25px' }}>{answer?.answer}</label>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </>
                    )
                })}
            </>
        )
    }
    const CreateMultipleShortQuestion = () => {
        return (
            <>
                {filteredMultipleShortQuestions?.flatMap((question, index) => {
                    // setGlobalCounter(globalCounter + 1);
                    return (
                        <>
                            <div key={index}>
                                <h4 style={{ color: '#000' }}>{globalCounter}. {question?.question}</h4>
                            </div>
                          
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                    <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                        {
                                            question?.answers?.map((answer, ansIndex) => {
                                                return (
                                                    <>
                                                        <p style={{ color: '#000', marginBottom: '20px' }}>{ansIndex + 1}. {mode === "teacherPreview" ? <> {answer?.answer} <b><hr /></b></> : "_________________________________________"}</p>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    <div style={{ width: '47.99%', marginBottom: '10px' }}>
                                        <img src="/images/7.png" alt="Description" style={{ width: '50%' }} />
                                    </div>
                                </div>
                        </>
                    )
                })}
            </>
        )
    }


    return (
        <>
           <div className="container">
            <Button label='Teacher Preview'/>
           </div>
            <div contentEditable={true} style={{ width: '1100px', marginLeft: 'auto', marginRight: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #a6a6a6' }}>
                    <p style={{ color: '#a6a6a6', fontWeight: 600 }}>Way in LISTENING</p>
                    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                        <p style={{ color: '#a6a6a6', fontWeight: 600 }}>LISTENING</p>
                        <p style={{ color: '#a6a6a6', fontWeight: 600, border: '3px solid #a6a6a6', borderRadius: '100%', padding: '5px 10px', marginLeft: '20px', marginRight: '30px', marginBottom: '-30px', background: '#fff' }}>2</p>
                    </div>
                </div>
                <br /><br />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ color: '#000' }}>Name: ____________________________</p>
                    <p style={{ color: '#000' }}>Class: __________________</p>
                    <p style={{ color: '#000' }}>Date: __________________</p>
                </div>
                <br />
                <h1 style={{ color: '#000' }}>Listening</h1>
                <CreateSequenceQuestion />
                <CreateMultipleShortQuestion />
                {/* <div>
                    <h2 style={{ color: '#000' }}>An activity weekend in Cardiff</h2>

                    <h4 style={{ color: '#000' }}>1 Listen to the radio programme and put the photos in the right order.</h4>
                </div> */}
                {/* <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div style={{ width: '47.99%', marginBottom: '10px' }}>
                        <img src="/images/1.png" alt="q1" style={{ width: '100%' }} />
                        <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                    </div>
                    <div style={{ width: '47.99%', marginBottom: '10px' }}>
                        <img src="/images/2.png" alt="q2" style={{ width: '100%' }} />
                        <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                    </div>
                    <div style={{ width: '47.99%', marginBottom: '10px' }}>
                        <img src="/images/3.png" alt="q3" style={{ width: '100%' }} />
                        <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                    </div>
                    <div style={{ width: '47.99%', marginBottom: '10px' }}>
                        <img src="/images/4.png" alt="q4" style={{ width: '100%' }} />
                        <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                    </div>
                    <div style={{ width: '47.99%', marginBottom: '10px' }}>
                        <img src="/images/5.png" alt="q5" style={{ width: '100%' }} />
                        <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                    </div>
                    <div style={{ width: '47.99%', marginBottom: '10px' }}>
                        <img src="/images/6.png" alt="q6" style={{ width: '100%' }} />
                        <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                    </div>
                </div> */}

                {/* <div>
                    <h4 style={{ color: '#000' }}>2 What can you do at the activity weekend in Cardiff? Write down five sports.</h4>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div style={{ width: '47.99%', marginBottom: '10px' }}>
                        <p style={{ color: '#000', marginBottom: '20px' }}>1. _______________________________________________</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>2. _______________________________________________</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>3. _______________________________________________</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>4. _______________________________________________</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>5. _______________________________________________</p>
                    </div>
                    <div style={{ width: '47.99%', marginBottom: '10px' }}>
                        <img src="/images/7.png" alt="Description" style={{ width: '50%' }} />
                    </div>
                </div>

                <div>
                    <h4 style={{ color: '#000' }}>3 Listen again. Right or wrong? Tick (&#10003;) the correct box for each sentence.</h4>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <div style={{ width: '47.99%', marginBottom: '10px' }}>
                            <p style={{ color: '#000', marginBottom: '20px' }}>1. The radio programme has the best tips for the weekend</p>
                            <p style={{ color: '#000', marginBottom: '20px' }}>2. Maisie Reedman is part of the radio team.</p>
                            <p style={{ color: '#000', marginBottom: '20px' }}>3. The zip line in Cardiff is the longest in Europe.</p>
                            <p style={{ color: '#000', marginBottom: '20px' }}>4. They will close some roads in the city centre</p>
                            <p style={{ color: '#000', marginBottom: '20px' }}>5. You need a helmet for some sports.</p>
                        </div>
                        <div style={{ width: '47.99%', marginBottom: '10px', marginTop: '-31px' }}>
                            <div style={{ display: 'flex' }}>
                                <h4 style={{ marginRight: '10px', marginBottom: '8px' }}>Right</h4>
                                <h4 style={{ marginLeft: '10px', marginBottom: '8px' }}>Wrong</h4>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000', marginLeft: '30px' }}></div>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000', marginLeft: '30px' }}></div>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000', marginLeft: '30px' }}></div>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000', marginLeft: '30px' }}></div>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000', marginLeft: '30px' }}></div>
                            </div>
                        </div>
                    </div>

                </div>

                <div>
                    <h4 style={{ color: '#000' }}>4 Complete the sentences with the right information.</h4>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <div style={{ width: '47.99%', marginBottom: '10px' }}>
                            <p style={{ color: '#000', marginBottom: '20px', lineHeight: '33px' }}>1. There will be an activity weekend in the ____________________________________ of Wales.</p>
                            <p style={{ color: '#000', marginBottom: '20px', lineHeight: '33px' }}>2. You can try lots of different ____________________________________ there</p>
                            <p style={{ color: '#000', lineHeight: '33px' }}>3. You can try out water sports like ____________________________________</p>
                        </div>
                        <div style={{ width: '47.99%', marginBottom: '10px' }}>
                            <img src="/images/8.png" alt="Description" style={{ width: '50%' }} />
                        </div>
                        <div style={{ width: '100%' }}>
                            <p style={{ color: '#000', marginBottom: '20px', lineHeight: '33px' }}>4. Lots of ____________________________________ will be there to help and answer questions.</p>
                            <p style={{ color: '#000', marginBottom: '20px', lineHeight: '33px' }}>5. They hope that lots of ____________________________________ will come.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 style={{ color: '#000' }}>5 Answer the questions. Write complete sentences.</h4>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div style={{ width: '100%', marginBottom: '10px' }}>
                        <p style={{ color: '#000', marginBottom: '20px' }}>1. Why is it a good idea to visit Cardiff this weekend?</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>________________________________________________________________________________________________</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>2. What’s so special about the zip line near Mount Snowdon?</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>________________________________________________________________________________________________</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>3. Why is it safe to ride your bike or skateboard in the city centre?</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>________________________________________________________________________________________________</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>4. What can you do there if you don’t want to do sports?</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>________________________________________________________________________________________________</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>5. How do you know where you can find which activity?</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>________________________________________________________________________________________________</p>

                        <img src="/images/9.png" alt="Description" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '40%' }}>
                        <p style={{ color: '#000', marginBottom: '20px' }}>Your points: ___ / XX</p>
                        <p style={{ color: '#000', marginBottom: '20px' }}>Mark ___</p>
                    </div>
                </div>
                <div style={{ marginTop: '200px' }}>
                    <h1 style={{ color: '#000' }}>Diff corner</h1>
                    <p style={{ color: '#a6a6a6', fontWeight: 600 }}>_______________________ Parallelaufgabe zu S.1</p>
                    <h4 style={{ color: '#000' }}>1 Listen to the radio programme and put the photos in the right order.</h4>

                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <div style={{ width: '47.99%', marginBottom: '10px' }}>
                            <img src="/images/1.png" alt="Description" style={{ width: '100%' }} />
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <label style={{ marginLeft: '10px', lineHeight: '25px' }}>a zip line</label>
                            </div>
                        </div>
                        <div style={{ width: '47.99%', marginBottom: '10px' }}>
                            <img src="/images/2.png" alt="Description" style={{ width: '100%' }} />
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <label style={{ marginLeft: '10px', lineHeight: '25px' }}>a sign</label>
                            </div>
                        </div>
                        <div style={{ width: '47.99%', marginBottom: '10px' }}>
                            <img src="/images/3.png" alt="Description" style={{ width: '100%' }} />
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <label style={{ marginLeft: '10px', lineHeight: '25px' }}>a skateboard park</label>
                            </div>
                        </div>
                        <div style={{ width: '47.99%', marginBottom: '10px' }}>
                            <img src="/images/4.png" alt="Description" style={{ width: '100%' }} />
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <label style={{ marginLeft: '10px', lineHeight: '25px' }}>the radio studio</label>
                            </div>
                        </div>
                        <div style={{ width: '47.99%', marginBottom: '10px' }}>
                            <img src="/images/5.png" alt="Description" style={{ width: '100%' }} />
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <label style={{ marginLeft: '10px', lineHeight: '25px' }}>drinks and snacks</label>
                            </div>
                        </div>
                        <div style={{ width: '47.99%', marginBottom: '10px' }}>
                            <img src="/images/6.png" alt="Description" style={{ width: '100%' }} />
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <label style={{ marginLeft: '10px', lineHeight: '25px' }}>rafting</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 style={{ color: '#000' }}>2 What can you do at the activity weekend in Cardiff? Write down five sports.</h4>

                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <div style={{ width: '40.99%', marginBottom: '10px' }}>
                            <p style={{ color: '#000', marginBottom: '20px' }}>1. <span style={{ textDecoration: 'underline' }}>z</span> _ _ <span style={{ textDecoration: 'underline' }}>l</span> _ _ _</p>
                            <p style={{ color: '#000', marginBottom: '20px' }}>2. <span style={{ textDecoration: 'underline' }}>c</span> <span style={{ textDecoration: 'underline' }}>a</span> _ _ _ _ _ _</p>
                            <p style={{ color: '#000', marginBottom: '20px' }}>3. <span style={{ textDecoration: 'underline' }}>r</span> <span style={{ textDecoration: 'underline' }}>a</span> _ _ _ _ _</p>
                            <p style={{ color: '#000', marginBottom: '20px' }}>4. <span style={{ textDecoration: 'underline' }}>t</span> _ _ _ _ <span style={{ textDecoration: 'underline' }}>t</span> _ _ _ _</p>
                            <p style={{ color: '#000', marginBottom: '20px' }}>5. <span style={{ textDecoration: 'underline' }}>n </span> _ _ <span style={{ textDecoration: 'underline' }}>b</span> _ _ _</p>
                        </div>
                        <div style={{ width: '57.99%', marginBottom: '10px' }}>
                            <img src="/images/10.png" alt="Description" style={{ width: '75%' }} />
                        </div>
                    </div>
                </div>
                <div>
                    <h4 style={{ color: '#000' }}>3 Listen again. Right or wrong? Tick (&#10003;) the correct box for each sentence.</h4>

                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        <div style={{ width: '47.99%', marginBottom: '10px' }}>
                            <p style={{ color: '#000', marginBottom: '20px' }}>1. The radio programme has the best <span style={{ textDecoration: 'underline' }}>tips for the weekend</span>.</p>
                            <p style={{ color: '#000', marginBottom: '20px' }}>2. Maisie Reedman is part of the<span style={{ textDecoration: 'underline' }}> radio team</span>.</p>
                            <p style={{ color: '#000', marginBottom: '20px' }}>3. The zip line <span style={{ textDecoration: 'underline' }}>in Cardiff </span> is the longest in Europe.</p>
                            <p style={{ color: '#000', marginBottom: '20px' }}>4. They will <span style={{ textDecoration: 'underline' }}>close </span> some roads in the city centre</p>
                            <p style={{ color: '#000', marginBottom: '20px' }}>5. You need a <span style={{ textDecoration: 'underline' }}>helmet </span> for some sports.</p>
                        </div>
                        <div style={{ width: '47.99%', marginBottom: '10px', marginTop: '-31px' }}>
                            <div style={{ display: 'flex' }}>
                                <h4 style={{ marginBottom: '8px' }}>Right</h4>
                                <h4 style={{ marginLeft: '10px', marginBottom: '8px' }}>Wrong</h4>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000', marginLeft: '30px' }}></div>

                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000', marginLeft: '30px' }}></div>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000', marginLeft: '30px' }}></div>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000', marginLeft: '30px' }}></div>
                            </div>
                            <div style={{ display: 'flex', marginTop: '10px' }}>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000' }}></div>
                                <div style={{ width: '20px', height: '20px', border: '2px solid #000', marginLeft: '30px' }}></div>
                            </div>
                        </div>
                    </div>
                </div> */}

            </div>
        </>
    )
}

export default QuestionPaper