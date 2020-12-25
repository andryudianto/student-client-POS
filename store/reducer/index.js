import {
    SET_LESSONS,
    SET_ACCESS_TOKEN,
    SET_QUESTIONS,
    SET_QUIZZES,
    SET_TEACHER_ID,
    SET_USERNAME,
    SET_ERROR,
    SET_LOADING,
    SET_STUDENT_ID,
    SET_LESSON_ID,
    SET_RENDER
} from '../actions/index'


const initialState = {
    lessonsList: [],
    access_token: '',
    quizzes: [],
    questions: [],
    loading: false,
    error: false,
    username: '',
    teacherId: '',
    studentId: '',
    lessonId: '',
    render: false
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LESSONS:
            return {
                ...state, lessonsList: action.payload
            }
        case SET_ACCESS_TOKEN:
            return {
                ...state, access_token: action.payload
            }
        case SET_QUIZZES:
            return {
                ...state, quizzes: action.payload
            }
        case SET_QUESTIONS:
            return {
                ...state, questions: action.payload
        }
        case SET_ERROR:
            return {
                ...state, error: action.payload
        }
        case SET_LOADING:
            return {
                ...state, loading: action.payload
        }
        case SET_USERNAME:
            return {
                ...state, username: action.payload
        }
        case SET_TEACHER_ID:
            return {
                ...state, teacherId: action.payload
        }
        case SET_STUDENT_ID:
            return {
                ...state, studentId: action.payload
            }
        case SET_LESSON_ID:
            return {
                ...state, lessonId: action.payload
            }
        case SET_RENDER:
            return {
                ...state, render: action.payload
            }
        default:
            return state
    }
}

export default reducer