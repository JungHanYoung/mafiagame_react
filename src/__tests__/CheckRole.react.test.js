import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from 'react-testing-library'
import sinon from 'sinon'
import { CheckRole } from '../routes/CheckRole';
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN } from '../contants/Job';



const minProps = {
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
    ],
    // react-router mocking
    history: {
        push: sinon.spy()
    }
}

afterEach(cleanup)

it('<CheckRole /> 컴포넌트 테스트', () => {
    const { getByTestId, getByText, debug } = render(<CheckRole {...minProps} />)
    const button = getByTestId('button')
    fireEvent.click(button)
    // debug(getByTestId('role-describe'))

    waitForElement(
        () => getByTestId('role'),
        {
            timeout: 3000
        }
    )
        .then(el => {
            console.log(el)
            expect([
                JOB_NAME_OF_CITIZEN,
                JOB_NAME_OF_DOCTOR,
                JOB_NAME_OF_MAFIA,
                JOB_NAME_OF_POLICE
            ]).toContain(el.textContent)

        })
})