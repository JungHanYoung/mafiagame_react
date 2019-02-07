import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { shallow, mount } from 'enzyme';

import Result from '../components/NightTime/Result'

import { List, Map } from 'immutable'
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_POLICE, JOB_NAME_OF_CITIZEN } from '../contants/Job';

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
    changeDayAndNight: jest.fn(),
    deletePlayer: jest.fn(),
    moveToMain: jest.fn(),
    // key(mafia) -> value(voted) (kill)
    mafiaVotes: Map({
        "대용": "한영"
    }),
    // key(doctor) -> value(voted) (save)
    doctorVotes: Map({
        "지은": "병욱"
    }),
    voteAgain: jest.fn(() => false)
}

describe('Night - <Result />', () => {

    let wrapper = null;

    it('Night - <Result /> without crashing', () => {
        wrapper = mount(<Router><Result {...minProps} /></Router>)
    })

    it('default props -> rendering', () => {
        expect(wrapper.find('div.game-content').exists()).toEqual(true)
        expect(wrapper.find('p.content-description').exists()).toEqual(true)
        expect(wrapper.find('h4').exists()).toEqual(true)
    })
})