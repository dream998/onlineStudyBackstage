import request from './axios'
export function postCourseBase(values){
    return request.post('/courses/base',values)
}

export function postSection(values,courseId){
    return request.post(`/courses/${courseId}/sections`,values)
}

export function postSubsection(values,subSectionId){
    return request.post(`/courses/${subSectionId}/subsections`,values)
}

export function uploadFile(formData,subSectionId){
    return request.post(`/upload/course/${subSectionId}/file`,formData,{headers:{'Content-Type': 'multipart/form-data'}})
}
export function uploadVideo(formData, subSectionId){
    return request.post(`/upload/course/${subSectionId}/video`,formData,{headers:{'content-type':'multipart/form-data'}})
}
export function postChoiceQuestions(values, subSectionId){
    return request.post(`/courses/${subSectionId}/choicequestions`,values)
}
export function postJudgeQuestions(values, subSectionId){
    return request.post(`/courses/${subSectionId}/judgequestions`, values)
}

// 获取目录
export function getCatalog(courseId){
    return request.get(`/courses/${courseId}/catalog`)
}

// 获取课程种类标签
export function getLabel(){
    return request.get('/courses/label')
}