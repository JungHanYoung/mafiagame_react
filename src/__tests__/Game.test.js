import React from 'react';
import { shallow, mount } from "enzyme";
import { List, Map } from 'immutable'

// Component
import Game from '../routes/Game'

// props
import { minPropsByGame } from '../mockData'
import { DAY_TIME } from '../contants/turnOfGame/Game';
import DayTime from '../components/DayTime';
import DayTimeDiscuss from '../components/DayTime/DayTimeDiscuss';


describe('<Game /> 컴포넌트', () => {

    const wrapper = shallow(<Game {...minPropsByGame} />)

    it('렌더링 테스트', () => {
        expect(wrapper).toBeDefined()
    })

    it('state 세팅 테스트', () => {
        expect(wrapper.state()).toMatchSnapshot()
    })

    it('html 렌더링 확인', () => {
        expect(wrapper.children()).toMatchSnapshot()
        expect(wrapper.find('main.daytime')).toBeDefined()
        expect(wrapper.find('h2.game-title')).toBeDefined()
        expect(wrapper.find('h2.game-title').text()).toEqual('HELLO MAFIA')
    })

    it('DayTime 렌더링', () => {

        expect(wrapper.find(DayTime).shallow()).toMatchSnapshot()
    })

    it('DayTime > Discuss 렌더링', () => {

        expect(wrapper.find(DayTime).shallow().find(DayTimeDiscuss).shallow()).toMatchSnapshot()
        expect(wrapper.props()).toMatchSnapshot()
    })

})

describe('Game 컴포넌트 >> mount', () => {

    const wrapper = mount(<Game {...minPropsByGame} />)

    it('스냅샷', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('클릭', () => {
        wrapper.find('button.btn-lg').simulate('click')

        expect(wrapper).toMatchSnapshot()

        expect(wrapper.find('div.vote-btn-container').children().find('button.btn-sm')).toMatchSnapshot()

        wrapper.find('div.vote-btn-container').children().find('button.btn-sm').first().simulate('click')
        wrapper.find('div.vote-btn-container').children().find('button.btn-sm').first().simulate('click')
        wrapper.find('div.vote-btn-container').children().find('button.btn-sm').first().simulate('click')
        wrapper.find('div.vote-btn-container').children().find('button.btn-sm').first().simulate('click')

        expect(wrapper).toMatchSnapshot()

        wrapper.find('button.btn-lg').simulate('click')

        expect(wrapper).toMatchSnapshot()
    })
})