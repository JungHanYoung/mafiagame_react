import React from 'react'
import { shallow, mount } from "enzyme";
import { List, Map } from 'immutable'

import Result from '../components/DayTime/Result'
import { JOB_NAME_OF_CITIZEN, JOB_NAME_OF_MAFIA, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_POLICE } from '../contants/Job';
import { players } from '../mockData'

const minProps = {
    players,
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

describe('<Result /> 컴포넌트', () => {
    let wrapper = null;

    it('<Result /> 렌더링 테스트', () => {
        wrapper = mount(<Result {...minProps} />)
    })
    it('props 받기', () => {
        // props > players 가 잘 받아지는가. (플레이어 4명)
        expect(wrapper.prop('players').size).toEqual(4)
    })
    it('기본 props에 대한 렌더링 테스트', () => {

        expect(wrapper.find('div.game-content').exists()).toEqual(true)
        expect(wrapper.find('p.content-description').exists()).toEqual(true)
        expect(wrapper.find('p.content-description').text()).toEqual('한영 님이 죽으셨습니다.')
        expect(wrapper.find('button.btn-lg').exists()).toEqual(true)
        expect(wrapper.find('button.btn-lg').text()).toEqual('밤이 됩니다.')
    })

    it('동률의 투표가 발생했을 경우의 렌더링 테스트', () => {
        // players props에 동률 투표의 상태를 적용
        wrapper = shallow(<Result {...minProps} players={sameRatePlayers} />)
        expect(wrapper.find('p.content-description').exists()).toEqual(true)
        // '투표가 동률이 났습니다.'라는 텍스트가 출력되는지 확인
        expect(wrapper.find('p.content-description').text()).toEqual('투표가 동률이 났습니다.')
    })
})