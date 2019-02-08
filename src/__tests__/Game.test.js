import React from 'react';
import { shallow } from "enzyme";
import { List, Map } from 'immutable'

// Component
import Game from '../routes/Game'

// props
import { minPropsByGame } from '../mockData'
import { DAY_TIME } from '../contants/turnOfGame/Game';


describe('<Game /> 컴포넌트', () => {

    let wrapper = null;

    it('렌더링 테스트', () => {
        wrapper = shallow(<Game {...minPropsByGame} />)
        expect(wrapper).toBeDefined()
    })

    it('state 세팅 테스트', () => {
        const state = wrapper.state()
        expect(state.players).toBeInstanceOf(List)
        expect(state.players.size).toEqual(4)
        state.players.forEach(player => {
            expect(player).toBeInstanceOf(Map)
        })
        expect(state.gameOrder).toBeDefined()
        expect(state.gameOrder).toEqual(DAY_TIME)
    })

    it('html 렌더링 확인', () => {
        expect(wrapper.find('main.daytime')).toBeDefined()
        expect(wrapper.find('h2.game-title')).toBeDefined()
        expect(wrapper.find('h2.game-title').text()).toEqual('HELLO MAFIA')
    })

})