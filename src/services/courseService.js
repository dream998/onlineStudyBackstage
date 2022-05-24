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

// 获取我创建的课程
export function getCreatedCourses(){
    return request.get('/courses/createdcourses')
}
// 获取学习进度
export function getStudyProcess(courseId){
    return request.get(`/courses/${courseId}/studyprocess`)
}
// 获取小节选择题
export function getChoiceQuestions(subSectionId){
    return request.get(`/courses/${subSectionId}/choicequestions`)
}
// 获取小节判断题
export function getJudgeQuestions(subsectionId){
    return request.get(`/courses/${subsectionId}/judgequestions`)
}

// 获取选择题答案
export function getChoiceAnswer(questionId){
    return request.get(`/courses/${questionId}/choiceanswer`)
}
// 获取判断题答案
export function getJudgeAnswer(questionId){
    return request.get(`/courses/${questionId}/judgeanswer`)
}
// 获取所有学习进度
export function getAllStudyProcess(studentId, courseId){
    return request.post('/courses/allstudyprocess',{studentId,courseId})
}
// 获取所有测试题
export function getAllTest(studentId, courseId){
    return request.post('/courses/alltest',{studentId,courseId})
}

// 发送学习预警
export function sendWarning(mes){
    return request.post('/courses/coursewarning',mes)
}