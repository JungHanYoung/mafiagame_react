import React from 'react';
import { shallow, mount } from "enzyme";
import { List, Map } from 'immutable'

// Component
import Game from '../routes/Game'

// props
import { minPropsByGame, players } from '../mockData'
import { DAY_TIME } from '../contants/turnOfGame/Game';
import DayTime from '../components/DayTime';
import DayTimeDiscuss from '../components/DayTime/DayTimeDiscuss';


describe('<Game /> 컴포넌트', () => {

    const wrapper = shallow(<Game {...minPropsByGame} />)

    it('렌더링 테스트', () => {
        expect(wrapper).toBeDefined()
    })

    it('state 세팅 테스트', () => {
        const state = wrapper.state()
        expect(state).toHaveProperty('gameOrder');
        expect(state).toHaveProperty('players');
        expect(state).toHaveProperty('playersByResult');

        expect(state.gameOrder).toBe(DAY_TIME)
        expect(state.players).toBeInstanceOf(List)
        state.players.forEach(player => {
            expect(player).toBeInstanceOf(Map)
            const playerToJS = player.toJS()
            expect(playerToJS).toHaveProperty('name')
            expect(playerToJS).toHaveProperty('jobName')
            expect(playerToJS).toHaveProperty('daytimeVoted')
        })
        expect(state.playersByResult).toBeInstanceOf(Array)
        state.playersByResult.forEach(player => {
            expect(player).toBeInstanceOf(Object)
            expect(player).toHaveProperty('name')
            expect(player).toHaveProperty('jobName')
        })
    })

    it('html 렌더링 확인', () => {
        expect(wrapper.find('main.daytime')).toBeDefined()
        expect(wrapper.find('h2.game-title')).toBeDefined()
        // expect(wrapper.find('h2.game-title').text()).toEqual('HELLO MAFIA')
    })

    it('DayTime 렌더링', () => {

        expect(wrapper.find(DayTime).exists()).toBe(true)
    })

    it('DayTime > Discuss 렌더링', () => {

        expect(wrapper.find(DayTime).shallow().find(DayTimeDiscuss).exists()).toBe(true)
    })

})

describe('Game 컴포넌트 >> mount', () => {

    const wrapper = mount(<Game {...minPropsByGame} />)

    it('클릭', () => {
        wrapper.find('button.btn-lg').simulate('click')
        expect(wrapper.find('p.content-description').text()).toBe('마피아로 의심되는 사람을 투표합니다.')
        const voteButtons = wrapper.find('button.btn-sm')
        expect(voteButtons).toHaveLength(3)
        wrapper.find('div.vote-btn-container').children().find('button.btn-sm').first().simulate('click')
        wrapper.find('div.vote-btn-container').children().find('button.btn-sm').first().simulate('click')
        wrapper.find('div.vote-btn-container').children().find('button.btn-sm').first().simulate('click')
        wrapper.find('div.vote-btn-container').children().find('button.btn-sm').first().simulate('click')

        expect(wrapper.find('p.content-description').text()).toContain('님이 죽으셨습니다.')
        expect(wrapper.find('button.btn-lg').text()).toBe('밤이 됩니다.')

        wrapper.find('button.btn-lg').simulate('click')

        expect(wrapper.find('main.night').exists()).toBe(true)
    })
})

test('컴포넌트 메소드', () => {
    const wrapper = shallow(<Game {...minPropsByGame} />)
    wrapper.instance().deletePlayer(null)

    expect(wrapper.state()).toMatchSnapshot()
})

// describe('컴포넌트 메소드', () => {
//     const minPropsWithResult = {

//     }
// })
test('players findIndex Test', () => {
    const index = players.findIndex(person => person.get('name') === null)
    expect(index).toBe(-1);

})

test('set test', () => {

})