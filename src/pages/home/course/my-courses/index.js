import React, { useState, useEffect } from 'react'
import { Card } from 'antd'
import { getCreatedCourses } from '../../../../services/courseService'
import { CreatedCoursesWrapper } from './style'
const { Meta } = Card



export default function MyCourses() {

  const [courses, setCourses] = useState([])
  useEffect(() => {
    getCreatedCourses().then(res => {
      console.log(res)
      setCourses(res)
    }).catch(err => {
      console.log(err);
    })

  }, [])


  return (
    <CreatedCoursesWrapper>
      {
        courses.map((item, index) => {
          return (
            <Card
              className='course-item'
              style={{ width: 300 }}
              cover={
                <img
                  alt={item.course_name}
                  src={'http://'+item.course_cover_url}
                  style={{width:'300px', height:'250px'}}
                />
              }

            >
              <Meta

                title={item.course_name}

              />
            </Card>
          )
        })
      }

    </CreatedCoursesWrapper>
  )
}
