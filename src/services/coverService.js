import request from './axios'

export function uploadCover(formData, courseId){
    return request.post(`/upload/cover/${courseId}`,formData,{headers:{'Content-Type': 'multipart/form-data'}})
}