import {} from 'react-router-config'

import CreateCourse from '../pages/home/course/create-course'
import MyCourse from '../pages/home/course/my-courses'
const routes = [
    {
        path: '/home/createcourse',
        component: CreateCourse
    },
    {
        path: '/home/mycourses',
        component: MyCourse
    }
]

export default routes