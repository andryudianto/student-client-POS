import { 
    SET_LESSONS, 
    SET_QUIZZES, 
    SET_QUESTIONS, 
    SET_ERROR, 
    SET_LOADING,
    SET_LESSON_ID,
    SET_RENDER
} from '.'


export function setTotalLesson (data) {
    return {
        type: SET_LESSONS,
        payload: data
    }
}

export function setFetchQuizzes (data) {
    return {
        type: SET_QUIZZES,
        payload: data
    }
}

export function setFetchQuestions (data) {
    return {
        type: SET_QUESTIONS,
        payload: data
    }
}

export function setError (data) {
    return {
        type: SET_ERROR,
        payload: data
    }
}

export function setLoading (data) {
    return {
        type: SET_LOADING,
        payload: data
    }
}

export function setLessonId (data) {
    return {
        type: SET_LESSON_ID,
        payload: data
    }
}

export function setRender (data) {
    return {
        type: SET_RENDER,
        payload: data
    }
}