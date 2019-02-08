import { setPlayers } from "../utils/setPlayers";
// import { players } from "../mockData";
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN } from "../contants/Job";

const people = [
    '대용',
    '한영',
    '병욱',
    '기수'
]

const jobs = [
    {
        code: 1,
        jobName: JOB_NAME_OF_MAFIA,
        count: 1
    },
    {
        code: 2,
        jobName: JOB_NAME_OF_POLICE,
        count: 1
    },
    {
        code: 3,
        jobName: JOB_NAME_OF_DOCTOR,
        count: 1
    },
    {
        code: 4,
        jobName: JOB_NAME_OF_CITIZEN,
        count: 1
    },
]

const randomJobs = [
    {
        code: 1,
        jobName: JOB_NAME_OF_MAFIA,
        count: 0
    },
    {
        code: 2,
        jobName: JOB_NAME_OF_POLICE,
        count: 0
    },
    {
        code: 3,
        jobName: JOB_NAME_OF_DOCTOR,
        count: 0
    },
    {
        code: 4,
        jobName: JOB_NAME_OF_CITIZEN,
        count: 0
    }
]

describe('Utils > setPlayers 함수 테스트', () => {
    it('리턴값이 잘 들어오는지!', () => {
        const players = setPlayers(people, jobs, randomJobs)

        expect(players).toHaveLength(4)
        // expect(players).toMatchSnapshot()
        const jobNameByPlayers = players.map(player => player.jobName)

        expect(jobNameByPlayers).toContain(JOB_NAME_OF_CITIZEN)
        expect(jobNameByPlayers).toContain(JOB_NAME_OF_DOCTOR)
        expect(jobNameByPlayers).toContain(JOB_NAME_OF_MAFIA)
        expect(jobNameByPlayers).toContain(JOB_NAME_OF_POLICE)

        const nameByPlayers = players.map(player => player.name)

        // console.log(nameByPlayers)
        people.forEach(person => {
            // console.log(person)
            expect(nameByPlayers).toContain(person)
        })

    })
})