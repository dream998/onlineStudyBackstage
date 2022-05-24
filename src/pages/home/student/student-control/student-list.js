import React, { memo, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import { Space, Table, Button, message } from 'antd';
import { SearchedContent } from './style'
import { sendWarning } from '../../../../services/courseService';
const StudentList = memo((props) => {
  console.log(props.students);
  
  //setStudents(props.students)
  const [students, setStudents] = useState([])
  
  
  useEffect(() => {
    const newStudents = props.students.map((item, index) => {
      item.key = item.user_id
      return item
    })
    setStudents(newStudents)
  }, [props.students])

  function goStudyDetail(row){
    console.log(row);
    console.log(props.history);
    props.history.push({pathname: '/home/studentstudydetail', state:{studentId:row.user_id,courseId:props.currentCourseId}})
  }
  function goStudentTest(row){
    console.log(row);
    props.history.push({pathname: '/home/studenttest',state:{studentId:row.user_id,courseId:props.currentCourseId}})
  }
  function sendStudyWarning(row){
    console.log(row);
    console.log(props);
    const data = {studentId:row.user_id, courseId: props.currentCourseId}
    sendWarning(data).then(res=>{
      message.success('发送成功！')
    }).catch(err=>{
      console.log(err);
    })
  }
  const columns = [
    {
      title: '姓名',
      dataIndex: 'user_name',
      key: 'userName'
    },
    {
      title: '学校',
      dataIndex: 'user_school',
      key: 'userSchool'
    },
    {
      title: '学院',
      dataIndex: 'user_college',
      key: 'userCollege'
    },
    {
      title: '班级',
      dataIndex: 'user_class',
      key: 'userClass'
    },
    {
      title: '操作',
      key: 'action',
      render: (row) => (
        <Space>
          <Button type='primary' onClick={()=>{goStudyDetail(row)}}>查看学习进度</Button>
          <Button type='primary'  onClick={()=>{goStudentTest(row)}}>查看章节测验</Button>
          <Button type='warning' danger onClick={()=>{sendStudyWarning(row)}}>发送学习预警</Button>
        </Space>
      )
    }
  ]
  return (
    <div>
      <SearchedContent>
        <Table columns={columns} dataSource={students} bordered onCell={(record,rowIndex)=>{
          return {
            onClick: ()=>{
              console.log(record,rowIndex);
            }
          }
        }}></Table>

      </SearchedContent>
    </div>
  )
})

export default withRouter(StudentList)