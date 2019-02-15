import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme';

import Result from '../components/NightTime/Result'

import { Map } from 'immutable'
import { players, playersWithMafia } from '../mockData'

const minProps = {
    players,
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
    voteAgain: jest.fn(() => false),
    moveToResult: jest.fn()
}
const minPropsBySave = {
    players,
    changeDayAndNight: jest.fn(),
    deletePlayer: jest.fn(),
    moveToMain: jest.fn(),
    // key(mafia) -> value(voted) (kill)
    mafiaVotes: Map({
        "대용": "한영"
    }),
    // key(doctor) -> value(voted) (save)
    doctorVotes: Map({
        "지은": "한영"
    }),
    voteAgain: jest.fn(() => false),
    moveToResult: jest.fn()
}

describe('Night - <Result />', () => {

    const wrapper = mount(<Router><Result {...minProps} /></Router>)

    it('default props -> rendering', () => {

        const desciptionElement = wrapper.find('p.content-description')
        const messageBox = wrapper.find('h4')

        expect(desciptionElement.exists()).toEqual(true)
        expect(messageBox.exists()).toEqual(true)

    })
})

describe('Night - <Result />: 의사가 마피아로부터 시민을 살렸을 때', () => {
    const wrapper = mount(<Router><Result {...minPropsBySave} /></Router>)

    it('안내 메세지 출력 테스트', () => {
        /**
         * <h4>
            마피아가 시민을 죽이지 못하였습니다.
            </h4>
         */
        const messageBox = wrapper.find('h4')
        expect(messageBox.exists()).toBe(true)
        expect(messageBox.text()).toBe('마피아가 시민을 죽이지 못하였습니다.')

    })
})

describe('Night - <Result />: 마피아 승리조건 충족', () => {
    const wrapper = mount(<Router><Result {...minProps} players={playersWithMafia} /></Router>)

    it('안내메세지 출력 테스트', () => {
        /**
         * <h4>
            마피아가 
            한영
            님을 죽였습니다.
        </h4>
        <h3>
            마피아가 승리하였습니다.
        </h3>
         */
        const voteMassage = wrapper.find('h4')
        expect(voteMassage.exists()).toBe(true)
        expect(voteMassage.text()).toBe('마피아가 한영님을 죽였습니다.')

        const victoryMessage = wrapper.find('h3')
        expect(victoryMessage.exists()).toBe(true)
        expect(victoryMessage.text()).toBe('마피아가 승리하였습니다.')

    })
})