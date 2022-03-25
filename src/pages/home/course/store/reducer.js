import { UPDATE_COURSE_BASE, UPDATE_COURSE_SECTIONS, UPDATE_COURSE_SUBSECTIONS } from './constants'

const courseMessage = {
    baseCourseMessage: {},
    sectionMessage: [],
    subsectionMessage: []
}

const reducer = (state = courseMessage, action) => {
    switch (action.type) {
        case UPDATE_COURSE_BASE:
            return {
                baseCourseMessage: { ...action.baseMessage },
                sectionMessage: [ ...state.sectionMessage ],
                subsectionMessage: [ ...state.subsectionMessage ]
            }
        case UPDATE_COURSE_SECTIONS:
            return {
                baseCourseMessage: { ...state.baseCourseMessage },
                sectionMessage: [ ...action.courseSections ],
                subsectionMessage:  [ ...state.subsectionMessage ]
            }
        case UPDATE_COURSE_SUBSECTIONS:
            return {
                baseCourseMessage: { ...state.baseCourseMessage },
                sectionMessage: [ ...state.sectionMessage ],
                subsectionMessage: [ ...state.subsectionMessage, [...action.subsections] ]
            }
        default:
            return state
    }

}

export default reducer