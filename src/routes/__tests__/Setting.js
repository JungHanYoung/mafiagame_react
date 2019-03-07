import React from 'react';
import { render, cleanup } from 'react-testing-library'
import "jest-dom/extend-expect"
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_POLICE, JOB_NAME_OF_CITIZEN } from '../../contants/Job';
import Setting from '../Setting';
import { GameContext } from '../../context/GameContext';
// import sinon from 'sinon'
import { steps } from '../Setting'

// const push = sinon.spy()

afterEach(() => {
    cleanup()
})

jest.mock('use-react-router', () => () => ({
    history: {
        push: console.log
    }
}))


function useContextHooks(component) {
    const state = {
        people: [],
        jobs: [
            {
                code: 1,
                jobName: JOB_NAME_OF_MAFIA,
                minCount: 0,
                maxCount: 0
            },
            {
                code: 2,
                jobName: JOB_NAME_OF_POLICE,
                minCount: 0,
                maxCount: 0
            },
            {
                code: 3,
                jobName: JOB_NAME_OF_DOCTOR,
                minCount: 0,
                maxCount: 0
            },
            {
                code: 4,
                jobName: JOB_NAME_OF_CITIZEN,
                minCount: 0,
                maxCount: 0
            }
        ]
    }
    const dispatch = ({ type, ...payloads }) => { }
    // const dispatch = ({type, ...payloads}) => {
    //     switch(type) {
    //         case 'SET_PEOPLE_NUM':

    //     }
    // }
    return {
        ...render(
            <GameContext.Provider value={[state, dispatch]}>
                {component}
            </GameContext.Provider>
        )
    }
}
it('스텝 바이 스텝 테스트', () => {

    const { getByTestId } = useContextHooks(<Setting />)

    for (let i = 0; i < steps.length; i++) {
        for (let j = 0; j <= i; j++) {
            expect(getByTestId('step-wrapper').childNodes[j]).toHaveClass('active')
        }
        for (let p = i + 1; p < steps.length; p++) {
            expect(getByTestId('step-wrapper').childNodes[p]).not.toHaveClass('active')
        }
        if (i < steps.length - 1) {
            getByTestId('next-button').click()
        } else {
            getByTestId('game-start').click()
            // expect(push.calledOnce).toBe(true)
        }
    }
})