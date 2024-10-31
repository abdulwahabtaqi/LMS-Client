'use client';
import { useSearchParams } from 'next/navigation';
import { Fragment } from 'react';
import AddQuestion from './../../../../../../components/addQuestion/addQuestion';

const Add = () => {
    const searchParams = useSearchParams();

    const schoolId = searchParams.get('schoolId');
    const gradeId = searchParams.get('gradeId');
    const subjectId = searchParams.get('subjectId');
    const topicId = searchParams.get('topicId');
    const subTopicId = searchParams.get('subTopicId');
    const mcq = searchParams.get('MCQVisible') === 'true'; // Convert to boolean if necessary
    const shortQuestion = searchParams.get('shortQuestionVisible') === 'true';
    const multiFillInTheBlanks = searchParams.get('multiFillInTheBlanksVisible') === 'true';
    const multipleShort = searchParams.get('multipleShortVisible') === 'true';
    const sequence = searchParams.get('sequenceVisible') === 'true';
    const multipleTrueFalse = searchParams.get('multipleTrueFalseVisible') === 'true';
    const multipleQuestionV2 = searchParams.get('multipleQuestionV2Visible') === 'true';
    const longQuestionVisible = searchParams.get('longQuestionVisible') === 'true';
    const fillInTheBlanks = searchParams.get('fillInTheBlanksVisible') === 'true';

    const selectedData = {
        schoolId,
        gradeId,
        subjectId,
        topicId,
        subTopicId,
        mcq,
        shortQuestion,
        multiFillInTheBlanks,
        multipleShort,
        sequence,
        multipleTrueFalse,
        multipleQuestionV2,
        longQuestionVisible,
        fillInTheBlanks
    };

    console.log('Selected Data:', selectedData);

    return (
        <Fragment>
            <div className="p-grid">
                {/* Conditionally render AddQuestion only if selectedData is not undefined */}
                {selectedData && Object.keys(selectedData).length > 0 && <AddQuestion selectedData={selectedData} />}
            </div>
        </Fragment>
    );
};

export default Add;
