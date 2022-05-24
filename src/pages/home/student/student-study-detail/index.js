import React, { memo, useState, useEffect } from 'react'
import { Table, Space } from 'antd';
import {
  getCatalog,
  getStudyProcess,
  getChoiceQuestions,
  getJudgeQuestions,
  getChoiceAnswer,
  getJudgeAnswer,
  getAllStudyProcess
} from '../../../../services/courseService';
import { render } from '@testing-library/react';

const StudentStudyDetail = memo((props) => {

  const {courseId, studentId} = props.location.state
  const [allStudyProcess, setAllStudyProcess] = useState([])
  const [data, setData] = useState([])
  useEffect(() => {
    getAllStudyProcess(studentId, courseId).then(res=>{
      console.log(res);
      setAllStudyProcess(res)
      const newDatas = []
      for(let i = 0; i < res.length; i++){
        const subsections = res[i].subsections
        for(let j = 0; j < subsections.length; j++){
          const subsection = subsections[j]
          const data = {}
          data.section = (i+1)+'. '+res[i].section_name
          data.subsection = (i+1)+'.'+(j+1)+' '+subsection.subsection_name
          const studyProcess = subsection.studyprocess
          if(studyProcess.length===0){
            data.video = '未观看'
            data.file = '未阅览'
            data.test = '未作答'
          }else{
            studyProcess[0].video_finished == 1? data.video = '已观看' : data.video = '未观看'
            studyProcess[0].file_finished == 1 ? data.file = '已阅览': data.file = '未阅览'
            studyProcess[0].test_finished == 1 ? data.test = '已完成' : data.test = '未作答'
          }
          newDatas.push(data)

        }
      }
      setData(newDatas)
    })

  }, [])
  

  console.log(props.location.state);
  const columns = [
    {
      title: '章节',
      dataIndex: 'section',
      key: 'section'
    },
    {
      title: '小节',
      dataIndex: 'subsection',
      key: 'subsection'
    },
    {
      title: '视频',
      dataIndex: 'video',
      key: 'video',
      render:(video)=>{
        if(video === '未观看'){
          return <span style={{color:'red'}}>{video}</span>
        }else{
          return <span style={{color:'green'}}>{video}</span>
        }
      }
    },
    {
      title: '资料',
      dataIndex: 'file',
      key: 'file',
      render:(file)=>{
        if(file === '未阅览'){
          return <span style={{color:'red'}}>{file}</span>
        }else{
          return <span style={{color:'green'}}>{file}</span>
        }
      }
    },
    {
      title: '课后习题',
      dataIndex: 'test',
      key: 'test',
      render:(test)=>{
        if(test === '未作答'){
          return <span style={{color:'red'}}>{test}</span>
        }else{
          return <span style={{color:'green'}}>{test}</span>
        }
      }
    }

  ]
  return (
    <div>
      <Table columns={columns} dataSource = {data}></Table>
    </div>
  )
})

export default StudentStudyDetail