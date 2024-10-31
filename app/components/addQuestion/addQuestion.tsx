import React, { useState, useEffect } from 'react';

const AddQuestion = ({ selectedData }: { selectedData: any }) => {
    // Specify expected prop type
    const [selectedOptions, setSelectedOptions] = useState({
        schoolId: selectedData.schoolId || '',
        gradeId: selectedData.gradeId || '',
        subjectId: selectedData.subjectId || '',
        topicId: selectedData.topicId || '',
        subTopicId: selectedData.subTopicId || ''
    });

    const [mcq, setMcq] = useState(selectedData.mcq || false);
    const [shortQuestion, setShortQuestion] = useState(selectedData.shortQuestion || false);
    const [longQuestion, setLongQuestion] = useState(selectedData.longQuestionVisible || false);
    const [fillInTheBlanks, setFillInTheBlanks] = useState(selectedData.fillInTheBlanks || false);
    const [multiFillInTheBlanks, setMultiFillInTheBlanks] = useState(selectedData.multiFillInTheBlanks || false);
    const [multipleShortQuestions, setMultipleShortQuestions] = useState(selectedData.multipleShort || false);
    const [sequence, setSequence] = useState(selectedData.sequence || false);
    const [multipleTrueFalse, setMultipleTrueFalse] = useState(selectedData.multipleTrueFalse || false);
    const [multipleQuestionV2, setMultipleQuestionV2] = useState(selectedData.multipleQuestionV2 || false);

    useEffect(() => {
        // Update state if selectedData changes
        setSelectedOptions({
            schoolId: selectedData.schoolId || '',
            gradeId: selectedData.gradeId || '',
            subjectId: selectedData.subjectId || '',
            topicId: selectedData.topicId || '',
            subTopicId: selectedData.subTopicId || ''
        });

        setMcq(selectedData.mcq || false);
        setShortQuestion(selectedData.shortQuestion || false);
        setLongQuestion(selectedData.longQuestionVisible || false);
        setFillInTheBlanks(selectedData.fillInTheBlanks || false);
        setMultiFillInTheBlanks(selectedData.multiFillInTheBlanks || false);
        setMultipleShortQuestions(selectedData.multipleShort || false);
        setSequence(selectedData.sequence || false);
        setMultipleTrueFalse(selectedData.multipleTrueFalse || false);
        setMultipleQuestionV2(selectedData.multipleQuestionV2 || false);
    }, [selectedData]);

    return (
        <>
            <h5>Add Question</h5>
            {/* Add your form rendering logic here */}
        </>
    );
};

export default AddQuestion;
