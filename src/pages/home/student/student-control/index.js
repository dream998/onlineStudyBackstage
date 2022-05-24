import React, { memo, useState, useEffect } from 'react'
import { Input, Space, Select } from 'antd'
import { AudioOutlined } from '@ant-design/icons'
import { StudentControlWrapper, SearchWrapper, SearchedContent } from './style'
import { getCreatedCourses } from '../../../../services/courseService'
import { getChoosedStudents } from '../../../../services/userService'
import StudentList from './student-list'

const { Search } = Input
const { Option } = Select
const StudentControl = memo(() => {

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  const [courses, setCourses] = useState([])
  const [choosedStudents, setChoosedStudents] = useState([])
  const [currentCourseId, setcurrentCourseId] = useState(0)
  useEffect(() => {
    getCreatedCourses().then(res => {
      console.log(res)
      setCourses(res)
    }).catch(err => {
      console.log(err);
    })

  }, [])

  function handleChange(value) {
    console.log(`selected ${value}`);
    setcurrentCourseId(value)
    getChoosedStudents(value).then(res=>{
      setChoosedStudents(res)
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })

    
  }

  const onSearch = value => console.log(value);


  return (
    <div>
      <StudentControlWrapper>
        <SearchWrapper>
          <Select defaultValue={'根据课程查询'} style={{ width: 200 }} onChange={handleChange}>
            {
              courses.map((item) => {
                return (
                  <Option value={item.course_id} key={item.course_id}>{item.course_name}</Option>
                )
              })
            }
          </Select>
        </SearchWrapper>
        <StudentList students = {choosedStudents} currentCourseId = {currentCourseId}/>
        


      </StudentControlWrapper>
    </div>
  )
})

export default StudentControl