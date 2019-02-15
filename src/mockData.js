import { List, Map } from "immutable";
import { JOB_NAME_OF_CITIZEN, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_MAFIA } from "./contants/Job";


export const players = List([
    Map({
        name: "한영",
        jobName: JOB_NAME_OF_CITIZEN,
        daytimeVoted: 3
    }),
    Map({
        name: "병욱",
        jobName: JOB_NAME_OF_POLICE,
        daytimeVoted: 0
    }),
    Map({
        name: "지은",
        jobName: JOB_NAME_OF_DOCTOR,
        daytimeVoted: 0
    }),
    Map({
        name: "대용",
        jobName: JOB_NAME_OF_MAFIA,
        daytimeVoted: 0
    })
])

const playerWithoutImmutable = [
    {
        name: '한영',
        jobName: JOB_NAME_OF_CITIZEN
    },
    {
        name: '병욱',
        jobName: JOB_NAME_OF_MAFIA
    },
    {
        name: '대용',
        jobName: JOB_NAME_OF_DOCTOR
    },
    {
        name: '기수',
        jobName: JOB_NAME_OF_POLICE
    },
]

export const minPropsByGame = {
    history: {
        location: {
            state: {
                players: playerWithoutImmutable
            }
        }
    }
}

export const playersWithMafia = List([
    Map({
        name: "한영",
        jobName: JOB_NAME_OF_CITIZEN,
        daytimeVoted: 0
    }),
    Map({
        name: "병욱",
        jobName: JOB_NAME_OF_POLICE,
        daytimeVoted: 0
    }),
    Map({
        name: "지은",
        jobName: JOB_NAME_OF_DOCTOR,
        daytimeVoted: 0
    }),
    Map({
        name: "대용",
        jobName: JOB_NAME_OF_MAFIA,
        daytimeVoted: 0
    }),
    Map({
        name: "민기",
        jobName: JOB_NAME_OF_MAFIA,
        daytimeVoted: 0
    }),
    Map({
        name: "하림",
        jobName: JOB_NAME_OF_MAFIA,
        daytimeVoted: 0
    }),
])