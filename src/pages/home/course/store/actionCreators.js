import { UPDATE_COURSE_BASE, UPDATE_COURSE_SECTIONS, UPDATE_COURSE_SUBSECTIONS } from './constants'

const UpdateCourseBaseAction = (baseMessage) => ({
    type: UPDATE_COURSE_BASE,
    baseMessage
})
const UpdateCourseSectionAction = (courseSections) => ({
    type: UPDATE_COURSE_SECTIONS,
    courseSections
})
const UpdateCourseSubsectionAction = (subsections) => ({
    type: UPDATE_COURSE_SUBSECTIONS,
    subsections
})
export { UpdateCourseBaseAction, UpdateCourseSectionAction, UpdateCourseSubsectionAction }