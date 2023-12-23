'use client';
import React, { useState, useEffect } from 'react';
import { TreeTable, TreeTableSelectionKeysType } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { TreeNode } from 'primereact/treenode';
import { InputText } from 'primereact/inputtext';
import { Question } from '../../../shared/types';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import CkEditor from '../../../shared/components/CkEditor/CustomEditor';


interface QuestionListProps {
    filteredMcqQuestions: Question[]
    filteredShortQuestions: Question[]
    filteredLongQuestions: Question[]
    selectedMcq: TreeTableSelectionKeysType;
    setSelectedMcq: (e: TreeTableSelectionKeysType) => void;
    selectedShortQuestion: TreeTableSelectionKeysType;
    setSelectedShortQuestion: (e: TreeTableSelectionKeysType) => void;
    selectedLongQuestion: TreeTableSelectionKeysType;
    setSelectedLongQuestion: (e: TreeTableSelectionKeysType) => void;
    loading: boolean;
    setVisible: (e: boolean) => void;
}

const QuestionList: React.FC<QuestionListProps> = (props) => {

    const [mcq, setMcq] = useState<TreeNode[]>([]);
    const [shortQuestions, setShortQuestions] = useState<TreeNode[]>([]);
    const [longQuestions, setLongQuestions] = useState<TreeNode[]>([]);
    const [mcqGlobalFilter, setMcqGlobalFilter] = useState<string>('');
    const [shortQuestionGlobalFilter, setShortQuestionGlobalFilter] = useState<string>('');
    const [longQuestionGlobalFilter, setLongQUestionGlobalFilter] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const [editorContent, setEditorContent] = useState<string>(``);
    let content = `  <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Question Paper</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .instructions, .mcqs, .short-questions, .long-questions {
                margin-bottom: 30px;
            }
            .question {
                margin-bottom: 15px;
            }
        </style>
    </head>
    <body>
        <div class="question-paper">
            <div class="instructions">
                <h2>Instructions</h2>
                <p>Please read the following instructions carefully before proceeding:</p>
                <ul>
                    <li>Do not open this question paper until you are told to do so.</li>
                    <li>Answer all questions in the spaces provided.</li>
                    <li>Use a blue or black pen for your answers.</li>
                    <li>Do not use correction fluid or tape.</li>
                    <li>Turn off all electronic devices.</li>
                </ul>
            </div>
    
            <div class="mcqs">
                <h2>Multiple Choice Questions (MCQs)</h2>`;

    const createQuestionTree = (questions: Question[], type:string) => {
        const tree: TreeNode[] = [];
        if(type==="shortQuestion"){
            content += `
            <div class="short-questions">
            <h2>Short Questions</h2>
            `
        } else if(type==="longQuestion"){
            content += `
             <div class="long-questions">
            <h2>Long Questions</h2>`;
        }
        questions?.forEach((question, index) => {
            if(type==="mcq"){
                content += `
                    <div class="question">
                    <p>${question?.question}</p>
                    <ol type="A">`; 
                    question?.answers?.forEach((x,index)=>{
                        content += `<li>${index}. ${x?.answer}</li>`;
                    })
                    content +=`</ol></div>`;
            } else if(type==="shortQuestion"){
                content += `
                <div class="short-questions">
                <p>${index + 1}. ${question?.question}.</p>
                </div>`;
            } else if(type==="longQuestion"){
                content += `
                <div class="long-questions">
                <p>${index + 1}. ${question?.question}.</p>
                </div>`;
            }
            const node: TreeNode = {
                key: index,
                data: {
                    question: question?.question,
                    type: question?.type,
                    subTopic: question?.subTopic?.subTopic,
                },
                children: question?.answers?.map((answer, index) => {
                    return {
                        key: index,
                        data: {
                            question: answer?.answer?.length > 14 ? answer?.answer?.substring(0, 14) + "..." : answer?.answer,
                            type: answer?.type,
                        },
                    }
                }),
            };
            tree?.push(node);
        });
        if(type==="mcq"){
          content += `</div>`;
        }
        else if(type==="shortQuestion"){
            content += `</div>`
        } else if(type==="longQuestion"){
            content += `</div>`
        }
        setEditorContent(content)
        return tree
    }

    const onMcqInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMcqGlobalFilter(e.target.value);
    };
    const onShortQuestionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShortQuestionGlobalFilter(e.target.value);
    };
    const onLongQuestionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLongQUestionGlobalFilter(e.target.value);
    };

    const renderMcqHeader = () => {
        return (
            <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <InputText value={mcqGlobalFilter} onChange={onMcqInputChange} placeholder="Keyword Question" className="mx-2 my-2" />
                </div>
            </div>
        );
    };
    const mcqHeaderRender = renderMcqHeader();

    const renderShortQuestionHeader = () => {
        return (
            <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <InputText value={shortQuestionGlobalFilter} onChange={onShortQuestionInputChange} placeholder="Keyword Question" className="mx-2 my-2" />
                </div>
            </div>
        );
    };
    const shortQuestionHeaderRender = renderShortQuestionHeader();

    const renderLongQuestionHeader = () => {
        return (
            <div className="p-d-flex p-flex-column p-jc-md-end p-jc-lg-between p-gap-2">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <InputText value={longQuestionGlobalFilter} onChange={onLongQuestionInputChange} placeholder="Keyword Question" className="mx-2 my-2" />
                </div>
            </div>
        );
    };
    const longQuestionHeaderRender = renderLongQuestionHeader();
    useEffect(() => {
        setMcq(createQuestionTree(props.filteredMcqQuestions, "mcq"));
        setShortQuestions(createQuestionTree(props.filteredShortQuestions, "shortQuestion"));
        setLongQuestions(createQuestionTree(props.filteredLongQuestions, "longQuestion"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.filteredMcqQuestions, props?.filteredShortQuestions, props?.filteredLongQuestions]);

    return (
        <div className="grid">
            <Dialog visible={visible} maximizable style={{ width: '80vw', height: '100vh' }} onHide={() => setVisible(false)}>
                <CkEditor content={editorContent} />
            </Dialog>
            <div className="col-12 my-3">
                <div className="p-d-flex p-flex-column p-md-flex-row p-jc-md-between">
                    <Button label='Preview' icon="pi pi-eye" onClick={() => setVisible(!visible)} />
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>MCQ</h5>
                    <TreeTable value={mcq} globalFilter={mcqGlobalFilter} header={mcqHeaderRender} selectionMode="checkbox" selectionKeys={props?.selectedMcq} onSelectionChange={(e) => props?.setSelectedMcq(e.value)}>
                        <Column field="question" header="Name" expander />
                        <Column field="type" header="Type" />
                        <Column field="subTopic" header="Subtopic" />
                    </TreeTable>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Short Questions</h5>
                    <TreeTable value={shortQuestions} globalFilter={shortQuestionGlobalFilter} header={shortQuestionHeaderRender} selectionMode="checkbox" selectionKeys={props?.selectedShortQuestion} onSelectionChange={(e) => props?.setSelectedShortQuestion(e.value)}>
                        <Column field="question" header="Name" expander />
                        <Column field="type" header="Type" />
                        <Column field="subTopic" header="Subtopic" />
                    </TreeTable>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Long Question</h5>
                    <TreeTable value={longQuestions} globalFilter={longQuestionGlobalFilter} header={longQuestionHeaderRender} selectionMode="checkbox" selectionKeys={props?.selectedLongQuestion} onSelectionChange={(e) => props?.setSelectedLongQuestion(e.value)}>
                        <Column field="question" header="Name" expander />
                        <Column field="type" header="Type" />
                        <Column field="subTopic" header="Subtopic" />
                    </TreeTable>
                </div>
            </div>
        </div>
    );
};

export default QuestionList;