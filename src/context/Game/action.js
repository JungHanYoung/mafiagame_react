import {
    SET_PEOPLE_NUM,
    ON_CHANGE_JOB_MIN,
    ON_CHANGE_JOB_MAX,
    ON_CHANGE_PEOPLE_NAME
} from './actionType'

export function setPeopleNum(num) {
    return {
        type: SET_PEOPLE_NUM,
        value: num
    }
}

export function onChangeJobMin(code, value) {
    if (value >= 0) {
        return {
            type: ON_CHANGE_JOB_MIN,
            code,
            value
        }
    } else {
        return {}
    }
}

export function onChangeJobMax(code, value) {
    if (value >= 0) {
        return {
            type: ON_CHANGE_JOB_MAX,
            code,
            value
        }
    }
}

export function onChangePeopleName(index, value) {
    return {
        type: ON_CHANGE_PEOPLE_NAME,
        index,
        value
    }
}