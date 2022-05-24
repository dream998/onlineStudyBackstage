import request from './axios'

export const getChoosedStudents = (courseId) => {
    return request.get(`/users/${courseId}/choosedstudent`)
}