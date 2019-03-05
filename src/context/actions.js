export const SET_PEOPLE_NUM = 'SET_PEOPLE_NUM'
export const ON_CHANGE_JOB_MIN = 'ON_CHANGE_JOB_MIN'
export const SET_PEOPLE_NUM = 'SET_PEOPLE_NUM'
export const SET_PEOPLE_NUM = 'SET_PEOPLE_NUM'

export function setPeopleNum(num) {
    return {
        type: 'SET_PEOPLE_NUM',
        value: num
    }
}

export function onChangeJobMin(code, value) {
    if (value >= 0) {
        return {
            type: 'ON_CHANGE_JOB_MIN',
            code,
            value
        }
    } else {
        return {}
    }
}