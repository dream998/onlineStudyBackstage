import {} from 'react-router-config'

import StudentControl from '../pages/home/student/student-control'
import CreateCourse from '../pages/home/course/create-course'
import MyCourse from '../pages/home/course/my-courses'
import StudentStudyDetail from '../pages/home/student/student-study-detail'
import StudentTest from '../common/StudentTest'
const routes = [
    {
        path: '/home/createcourse',
        component: CreateCourse
    },
    {
        path: '/home/mycourses',
        component: MyCourse
    },
    {
        path: '/home/studentcontrol',
        component: StudentControl
    },
    {
        path: '/home/studentstudydetail',
        component: StudentStudyDetail
    },
    {
        path: '/home/studenttest',
        component: StudentTest
    }
]

export default routes