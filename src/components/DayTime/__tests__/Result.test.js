import React from 'react';
import { render, cleanup } from 'react-testing-library'
import { List, Map } from 'immutable'
import 'jest-dom/extend-expect'

import { JOB_NAME_OF_CITIZEN, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_MAFIA } from '../../../contants/Job';

import Result from '../Result'


afterEach(cleanup)

const minProps = {
    players: List([
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
    ]),
    changeDayTimeOrder: jest.fn(),
    deletePlayer: jest.fn(),
    moveToResult: jest.fn(),
    moveRevote: jest.fn()
}

it('기본 테스트', () => {
    const { getByTestId, getByText } = render(<Result {...minProps} />)

    const subjectBox = getByTestId('content-subject')
    expect(subjectBox).toHaveTextContent('투표 결과');

    const description = getByTestId('content-description')
    expect(description).toHaveTextContent('한영 님이 죽으셨습니다.')


})