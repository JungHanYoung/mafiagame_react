import React from 'react';
import { shallow } from 'enzyme'
import { Map } from "immutable";

import Mafia from '../components/NightTime/Mafia'

import { players } from '../mockData'

const minProps = {
    players,
    mafiaVotes: Map({

    }),
    handleVote: jest.fn(),
    toggleConfirmed: jest.fn(),
    changeNightTimeOrder: jest.fn()
}

describe('Night > <Mafia /> 컴포넌트 테스트', () => {

    let wrapper = null;

    it('<Mafia /> 렌더링 테스트', () => {

        wrapper = shallow(<Mafia {...minProps} />)
    })

    // it('HTML 렌더링 테스트', () => {
    //     // expect(wrapper.find('div.game-content').exists()).toEqual(true)
    //     expect(wrapper.find('p.content-description').exists()).toEqual(true)
    //     expect(wrapper.find('p.content-description').text()).toEqual('당신은 마피아 입니다.죽일 사람을 선택하십시오.')
    // })

    it('투표버튼 렌더링 테스트', () => {
        // wrapper.find('div.vote-btn-container').children().children().find('button.btn-sm').forEach(element => console.log(element.html()))
        // console.log(wrapper.find('div.vote-btn-container').children().children().find('button.btn-sm').map)
        expect(wrapper.find('div.vote-btn-container').find('button.btn-sm')).toHaveLength(3)
        expect(wrapper.find('div.vote-btn-container').find('button.btn-sm').map(node => node.text())).toEqual(['한영', '병욱', '지은'])
        // expect(wrapper.prop('players').map(player => player.get('jobName')))
    })
})