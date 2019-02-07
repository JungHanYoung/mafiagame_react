import React from 'react'
import { shallow, mount } from "enzyme";
import { List, Map } from 'immutable'

import Result from '../components/DayTime/Result'
import { JOB_NAME_OF_CITIZEN, JOB_NAME_OF_MAFIA, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_POLICE } from '../contants/Job';

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
    moveToMain: jest.fn()
}

const sameRatePlayers = List([
    Map({
        name: "대용",
        jobName: JOB_NAME_OF_MAFIA,
        daytimeVoted: 0
    }),
    Map({
        name: "한영",
        jobName: JOB_NAME_OF_CITIZEN,
        daytimeVoted: 2
    }),
    Map({
        name: "미린",
        jobName: JOB_NAME_OF_DOCTOR,
        daytimeVoted: 2
    }),
    Map({
        name: "대랑",
        jobName: JOB_NAME_OF_POLICE,
        daytimeVoted: 0
    }),
])

describe('<Result /> ', () => {
    let wrapper = null;

    it('<Result /> without crashing', () => {
        wrapper = mount(<Result {...minProps} />)
    })
    it('receive props', () => {
        // const wrapper = shallow(<Result {...minProps} />)
        // console.log(wrapper.props())
        expect(wrapper.prop('players').size).toEqual(4)
    })
    it('default Props -> rendering', () => {
        expect(wrapper.find('div.game-content').exists()).toEqual(true)
        expect(wrapper.find('p.content-description').exists()).toEqual(true)
        expect(wrapper.find('p.content-description').text()).toEqual('한영 님이 죽으셨습니다.')
        expect(wrapper.find('button.btn-lg').exists()).toEqual(true)
        expect(wrapper.find('button.btn-lg').text()).toEqual('밤이 됩니다.')
    })

    it('same rate players -> rendering', () => {
        wrapper = shallow(<Result {...minProps} players={sameRatePlayers} />)
        expect(wrapper.find('p.content-description').exists()).toEqual(true)
        expect(wrapper.find('p.content-description').text()).toEqual('투표가 동률이 났습니다.')
    })
})