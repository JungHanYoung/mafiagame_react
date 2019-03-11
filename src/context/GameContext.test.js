import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_CITIZEN, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_POLICE } from '../contants/Job';
import { reducer } from './Game/reducer'


describe('GameContext 관련 Reducer 테스트', () => {
    it('기본 state 확인', () => {
        const defaultState = reducer(undefined, {})
        expect(defaultState.people).toHaveLength(0)
        expect(defaultState.jobs).toHaveLength(4)


        const jobNameList = defaultState.jobs.map(job => job.jobName)
        expect(jobNameList).toContain(JOB_NAME_OF_MAFIA)
        expect(jobNameList).toContain(JOB_NAME_OF_CITIZEN)
        expect(jobNameList).toContain(JOB_NAME_OF_DOCTOR)
        expect(jobNameList).toContain(JOB_NAME_OF_POLICE)

        const totalCount =
            defaultState.jobs.reduce((acc, cur) => acc + cur.minCount, 0) +
            defaultState.jobs.reduce((acc, cur) => acc + cur.maxCount, 0)

        expect(totalCount).toEqual(0)
    })
})