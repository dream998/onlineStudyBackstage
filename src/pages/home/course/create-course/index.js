import React from 'react'

import CourseBaseMessage from './course-base-message'
import CourseSections from './course-sections'
import CourseSubsection from './course-subsections'
import CourseCatalog from './course-catalog'
export default function CreateCourse() {
 
  return (
    <div>
      <CourseBaseMessage/>
      <CourseSections/>
      <CourseSubsection/>
      <CourseCatalog/>
    </div>
  )
}
