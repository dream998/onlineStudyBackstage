import React, { memo, useEffect, useState } from 'react'
import { Table, Space } from 'antd';
import { getAllTest } from '../services/courseService';
import PiePic from './PiePic';
import formatTest from '../utils/formatTest';
const columns = [
    {
        title: '章节',
        dataIndex: 'section',
        key: 'section',
    },
    {
        title: '小节',
        dataIndex: 'subsection',
        key: 'subsection',
    },
    {
        title: '选择题正确率',
        dataIndex: 'choiceRate',
        key: 'choiceRate',
    },
    {
        title: '判断题正确率',
        dataIndex: 'judgeRate',
        key: 'judgeRate'
    },
];

const expandedChoiceColumns = [
    {
        title: '题目描述',
        dataIndex: 'question_content',
        key: 'question_content'
    },
    {
        title: '选项A',
        dataIndex: 'question_item_a',
        key: 'question_item_a'
    },
    {
        title: '选项B',
        dataIndex: 'question_item_b',
        key: 'question_item_b'
    },
    {
        title: '选项C',
        dataIndex: 'question_item_c',
        key: 'question_item_c'
    },
    {
        title: '选项D',
        dataIndex: 'question_item_d',
        key: 'question_item_d'
    },
    {
        title: '正确答案',
        dataIndex: 'question_answer',
        key: 'question_answer'
    },
    {
        title: '学生答案',
        dataIndex: 'studentAnswer',
        key: 'studentAnswer'
    },

]
const expandedJudgeColumns = [
    {
        title: '题目描述',
        dataIndex: 'question_content',
        key: 'question_content'
    },
    {
        title: '答案',
        dataIndex: 'question_answer',
        key: 'question_answer'
    },
    {
        title: '学生答案',
        dataIndex: 'studentAnswer',
        key: 'studentAnswer'
    }
]
const StudentTest = memo((props) => {
    console.log(props);
    const { courseId, studentId } = props.location.state
    console.log(courseId, studentId);
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        getAllTest(studentId, courseId).then(res => {

            const data = formatTest(res)
            setTableData(data)

        }).catch(err => {
            console.log(err);
        })
    }, [])



    const getEvaluate = (choiceRate,judgeRate)=>{
        const rate = ((parseInt(choiceRate))+parseInt(judgeRate))/200
        console.log(rate);
        if(rate >= 0.9){
            return '为优秀！已完全掌握该章节的知识'
        }else if(rate >= 0.7){
            return '为良好，已掌握大部分所学内容'
        }else if(rate >= 0.5){
            return '为一般，需要加强学习'
        }else{
            return '为较差，对于本章节的内容掌握不够'
        }
    }
    return (
        <div>
            <Table
                columns={columns}
                rowKey={record => { return record.subsection }}
                expandable={{
                    expandedRowRender: (record) => (
                        <div style={{backgroundColor: '#ffffcc', padding:'15px'}}>
                            <div className='stusyIntro' >
                                <PiePic
                                    choiceCount={record.choiceCount}
                                    judgeCount={record.judgeCount}
                                    choiceCurrentCount={record.choiceCurrentCount}
                                    judgeCurrentCount={record.judgeCurrentCount} />
                                <div style={{width:'70%',border:'1px black solid',borderRadius:'5px',padding:'10px',margin:'0 auto'}}>
                                    <h2>总体评价</h2>
                                    <p >  该同学在本小节的课程学习中，选择题的正确率为<span style={{fontSize:'20px', color:'#ff3300'}}>{record.choiceRate}</span>,
                                        判断题的正确率为<span style={{fontSize:'20px', color:'#ff3300'}}>{record.judgeRate}</span>,综合正确率为
                                        <span style={{fontSize:'20px', color:'#ff3300'}}>{(Math.round(parseInt(record.choiceRate)+parseInt(record.judgeRate))/2)+'%'}</span>,
                                        从答题情况来看，该生对于<span style={{fontSize:'20px', color:'#6666ff'}}>{record.subsection}</span>的掌握情况
                                        <span style={{fontSize:'20px', color:'#66cc00'}}>{getEvaluate(record.choiceRate, record.judgeRate)}</span>
                                    </p>
                                </div>
                            </div>
                            <h3>选择题详情</h3>
                            <Table
                                columns={expandedChoiceColumns}
                                dataSource={record.choiceQuestions}
                            />
                            <h3>判断题详情</h3>
                            <Table
                                columns={expandedJudgeColumns}
                                dataSource={record.judgeQuestions}
                            />
                        </div>

                    ),
                    rowExpandable: (record) => record.choiceRate != '暂无数据',
                }}
                dataSource={tableData}
            />
        </div>
    )
})



export default StudentTest