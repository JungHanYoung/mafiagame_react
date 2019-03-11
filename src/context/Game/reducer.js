import { SET_PEOPLE_NUM, ON_CHANGE_JOB_MIN, ON_CHANGE_JOB_MAX, ON_CHANGE_PEOPLE_NAME } from "./actionType";
import { initialState } from "../GameContext";

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PEOPLE_NUM:
            return {
                ...state,
                people: Array.from({ length: action.value }, (v, k) => k).map(() => '')
            }
        case ON_CHANGE_JOB_MIN:
            if (action.value >= 0) {
                return {
                    ...state,
                    jobs: state.jobs.map(job => job.code === action.code ? { ...job, minCount: action.value } : job)
                }
            } else {
                return state
            }
        case ON_CHANGE_JOB_MAX:
            if (action.value >= 0) {
                return {
                    ...state,
                    jobs: state.jobs.map(job => job.code === action.code ? { ...job, maxCount: action.value } : job)
                }
            } else {
                return state
            }
        case ON_CHANGE_PEOPLE_NAME:
            return {
                ...state,
                people: state.people.map((v, index1) => (action.index === index1 ? action.value : v))
            }
        // case 'SET_ROLE_PEOPLE':
        //     const { people, jobs } = state
        //     return {
        //         ...state,
        //         players: setPlayers(people, jobs)
        //     }
        default:
            return state;
    }
}