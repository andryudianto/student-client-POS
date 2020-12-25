import {
    SET_USERNAME,
    SET_TEACHER_ID,
    SET_STUDENT_ID,
    SET_ACCESS_TOKEN
} from '.'


export function setUsername (data) {
    return {
        type: SET_USERNAME,
        payload: data
    }
}

export function setStudentId (data) {
    return {
        type: SET_STUDENT_ID,
        payload: data
    }
}

export function setTeacherId (data) {
    return {
        type: SET_TEACHER_ID,
        payload: data
    }
}

export function setAccessToken (data) {
    return {
        type: SET_ACCESS_TOKEN,
        payload: data
    }
}