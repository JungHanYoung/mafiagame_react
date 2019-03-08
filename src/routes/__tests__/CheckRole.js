import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from 'react-testing-library'
import CheckRole from '../CheckRole'
import 'jest-dom/extend-expect'
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN } from '../../contants/Job';
import { GameContext } from '../../context/GameContext';

afterEach(cleanup)

jest.mock('use-react-router', () => () => ({
    history: {
        push: console.log
    }
}))

const initialState = {
    people: [
        "하녕", "병우기", "대용쓰", "병민"
    ],
    jobs: [
        {
            code: 1,
            jobName: JOB_NAME_OF_MAFIA,
            minCount: 1,
            maxCount: 0
        },
        {
            code: 2,
            jobName: JOB_NAME_OF_POLICE,
            minCount: 1,
            maxCount: 0
        },
        {
            code: 3,
            jobName: JOB_NAME_OF_DOCTOR,
            minCount: 1,
            maxCount: 0
        },
        {
            code: 4,
            jobName: JOB_NAME_OF_CITIZEN,
            minCount: 1,
            maxCount: 0
        },
    ]
}

function renderWithContext(component) {

    const dispatch = ({ type, ...dispatch }) => console.log(type)

    return {
        ...render(
            <GameContext.Provider value={[initialState, dispatch]}>
                {component}
            </GameContext.Provider>
        )
    }
}

it('첫번째 렌더링', () => {
    const { getByTestId } = renderWithContext(<CheckRole />)
    expect(getByTestId('role-describe')).toHaveTextContent('이제 각 사람 마다역할이 정해집니다.')
    fireEvent.click(getByTestId('button'))

    waitForElement(
        () => getByTestId('role'))
        .then(el => {
            expect(initialState.jobs.map(job => job.jobName)).toContain(el.textContent)
        })

    // (async function loop() {
    //     for(let person of initialState.people) {
    //         const name = await waitForElement(() => getByTestId('player-name'))
    //         expect(name).toHaveTextContent(person)
    //     }
    // })()

    // for (let i = 0, p = Promise.resolve(); i < initialState.people.length; i++) {
    //     p = p.then(_ => waitForElement(() => getByTestId('player-name'))
    //         .then(el => {
    //             expect(el).toHaveTextContent(initialState.people[i])
    //         })
    //         .then(() => waitForElement(() => getByTestId('role'))
    //             .then(el => {
    //                 expect(initialState.jobs.map(job => job.jobName)).toContain(role.textContent)
    //             })
    //         )
    //     )


    // }
    // for(let person of initialState.people) {
    //     waitForElement(() => getByTestId('player-name'))
    //         .then(el => )
    // }

    // for (let person of initialState.people) {
    //     const playerName = await waitForElement(() => getByTestId('player-name'))
    //     expect(playerName).toHaveTextContent(person)
    //     await delay(2000);
    //     // await delay(3000);
    //     waitForElement(() => getByTestId('role'))
    //         .then(el => {
    //             expect(initialState.jobs.map(job => job.jobName)).toContain(role.textContent)
    //         })
    //     // const role = await waitForElement(() => getByTestId('role'), { timeout: 2000 })
    // }

})