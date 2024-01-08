import React from 'react'

interface QuestionPaperProps {
    schoolName: string,
    schoolLevelName: string,
    teacherName: string,
    examinerName: string,
    studentName: string,
    studentId: string,
    subjectName: string,
    topicName: string,
    subTopicName: string,
    examDifficultyLevel: string[],
    note: string,
    mcqQuestions:[],
    shortQuestions:[],
    longQuestions:[],
}
const QuestionPaper: React.FC<QuestionPaperProps> = (props) => {
    return (
        <div
            style={{
                width: '100%',
                minHeight: '100vh',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    width: '100%',
                    height: '1123px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexShrink: '0',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '289px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 136,
                        left: 67,
                        fontFamily: 'Montserrat',
                        fontSize: 23,
                        fontStretch: 'normal',
                        fontStyle: 'SemiBold',
                        fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    <span>{props?.schoolName}</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '254px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 136,
                        left: 416,
                        fontFamily: 'Montserrat',
                        fontSize: 23,
                        fontStretch: 'normal',
                        fontStyle: 'SemiBold',
                        fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    <span>{props?.schoolLevelName}</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '289px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 224,
                        left: 67,
                        fontFamily: 'Montserrat',
                        fontSize: 23,
                        fontStretch: 'normal',
                        fontStyle: 'SemiBold',
                        fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    <span>{props?.schoolName}</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '254px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 224,
                        left: 416,
                        fontFamily: 'Montserrat',
                        fontSize: 23,
                        fontStretch: 'normal',
                        fontStyle: 'SemiBold',
                        fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    <span>{props?.studentId}</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '289px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 180,
                        left: 67,
                        fontFamily: 'Montserrat',
                        fontSize: 23,
                        fontStretch: 'normal',
                        fontStyle: 'SemiBold',
                        fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    <span>{props?.schoolName}</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '254px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 180,
                        left: 416,
                        fontFamily: 'Montserrat',
                        fontSize: 23,
                        fontStretch: 'normal',
                        fontStyle: 'SemiBold',
                        fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    <span>{props?.examinerName}</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '289px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 268,
                        left: 67,
                        fontFamily: 'Montserrat',
                        fontSize: 23,
                        fontStretch: 'normal',
                        fontStyle: 'SemiBold',
                        fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    <span>{props?.subjectName}</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '254px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 268,
                        left: 416,
                        fontFamily: 'Montserrat',
                        fontSize: 23,
                        fontStretch: 'normal',
                        fontStyle: 'SemiBold',
                        fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    <span>{props?.topicName}</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '289px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 312,
                        left: 67,
                        fontFamily: 'Montserrat',
                        fontSize: 23,
                        fontStretch: 'normal',
                        fontStyle: 'SemiBold',
                        fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    <span>{props?.subTopicName}</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '254px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 312,
                        left: 416,
                        fontFamily: 'Montserrat',
                        fontSize: 23,
                        fontStretch: 'normal',
                        fontStyle: 'SemiBold',
                        fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    <span>{props?.examDifficultyLevel}</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '73px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 443,
                        left: 57,
                        fontFamily: 'Montserrat',
                        fontSize: 19,
                        fontStretch: 'normal',
                        fontStyle: 'ExtraBold',
                        fontWeight: 800,
                        textDecoration: 'none',
                    }}
                >
                    <span>NOTE:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '170px',
                        height: 'auto',
                        textAlign: 'center',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 1074,
                        left: 313,
                        fontFamily: 'Montserrat',
                        fontSize: 16,
                        fontStretch: 'normal',
                        fontStyle: 'ExtraBold',
                        fontWeight: 800,
                        textDecoration: 'none',
                    }}
                >
                    <span>The End</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '98px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 564,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#1:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '98px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 830,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#9:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '98px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 696,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#5:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '105px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 964,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#13:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '98px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 624,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#3:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '105px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 904,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#11:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '98px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 770,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#7:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '105px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 1040,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#15:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '98px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 594,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#2:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '105px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 860,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#10:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '98px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 726,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#6:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '105px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 994,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#14:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '98px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 666,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#4:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '105px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 934,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#12:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '98px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 800,
                        left: 49,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Question#8:</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '721px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 564,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry.
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '721px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 830,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        Lorem Ipsum is simply dummy
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '721px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 696,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        Lorem Ipsum is simply dummy text.
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '721px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 964,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>Lorem Ipsum is simply dummy text</span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '596px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 624,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. simply dummy text of
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '721px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 904,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry.
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '721px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 770,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry.
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '721px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 1040,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        Lorem Ipsum is simply dummy text of It was popularised in the 1960s
                        with the release of
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '721px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 594,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        Lorem Ipsum is simply dummy text of
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '575px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 860,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        . It was popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently with
                        desktop
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '575px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 726,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '575px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 994,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. simply dummy text of
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '721px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 666,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry.
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '721px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 934,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        It was popularised in the 1960s with the release of
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '721px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 800,
                        left: 144,
                        fontFamily: 'Montserrat',
                        fontSize: 13,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        It was popularised in the 1960s with the release of
                        <span
                            dangerouslySetInnerHTML={{
                                __html: ' ',
                            }}
                        />
                    </span>
                </span>
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '598px',
                        height: 'auto',
                        textAlign: 'left',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 445,
                        left: 128,
                        fontFamily: 'Montserrat',
                        fontSize: 14,
                        fontStretch: 'normal',
                        fontStyle: 'Medium',
                        fontWeight: 500,
                        textDecoration: 'none',
                    }}
                >
                    <span>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry.
                    </span>
                </span>
                <img
                    src="/line1978-d38s.svg"
                    alt="Line1978"
                    style={{
                        width: '656px',
                        height: '1px',
                        position: 'absolute',
                        top: '396px',
                        left: '70px',
                    }}
                />
                <span
                    style={{
                        color: 'rgba(0, 0, 0, 1)',
                        width: '777px',
                        height: 'auto',
                        textAlign: 'center',
                        lineHeight: 'normal',
                        position: 'absolute',
                        top: 52,
                        left: 10,
                        fontFamily: 'Montserrat',
                        fontSize: 38,
                        fontStretch: 'normal',
                        fontStyle: 'Bold',
                        fontWeight: 700,
                        textDecoration: 'none',
                    }}
                >
                    <span>EXAMINATION NAME</span>
                </span>
                <div
                    style={{
                        width: '525px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        flexShrink: '0',
                        position: 'absolute',
                        top: '486px',
                        left: '391px',
                        overflow: 'hidden',
                    }}
                ></div>
            </div>
        </div>
    )
}

export default QuestionPaper
