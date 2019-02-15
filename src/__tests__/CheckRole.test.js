import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon'

import { CheckRole } from '../routes/CheckRole'
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN } from '../contants/Job';

const pushRoute = {
    game: sinon.spy()
}

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
        push: pushRoute.game
    }
}

const JOBS = [JOB_NAME_OF_CITIZEN, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE]

describe('<CheckRole /> 컴포넌트 테스트', () => {

    let wrapper = null

    it('렌더링 테스트', () => {
        wrapper = shallow(<CheckRole {...minProps} />)
    })

    it('state 확인', () => {
        const state = wrapper.state()
        // players 확인
        expect(state.players).toBeDefined()
        expect(state.players.length).toEqual(4)
        state.players.forEach(player => {
            expect(player).toHaveProperty('name')
            expect(player).toHaveProperty('jobName')
            expect(JOBS).toContain(player.jobName)
        })
        // showRole 확인 (역할을 보여줄지의 여부)
        expect(state.showRole).toBeDefined()
        expect(state.showRole).toEqual(false)
        // showIndex 확인 (어떤 이의 차례인지에 대한 인덱스)
        expect(state.showIndex).toBeDefined()
        expect(state.showIndex).toEqual(0)
    })

    it('버튼 클릭 테스트', () => {

        // 처음 렌더링이 되는 경우 플레이어의 역할을 보여주지 않는다.
        expect(wrapper.find('p.player-job').exists()).not.toEqual(true)
        // 버튼의 내용이 '확인 하기'로 나타나야 (역할 확인 안내)
        expect(wrapper.find('button.btn-lg').text()).toEqual('확인 하기')

        const button = wrapper.find('button.btn-lg')

        // 버튼 클릭 이벤트 발생
        button.simulate('click')

        // 역할 확인 상태 -> true
        expect(wrapper.state('showRole')).toBe(true)
        expect(wrapper.state('showIndex')).toBeLessThan(1)
        // 버튼 클릭 후, 역할이 확인되야함. 플레이어의 역할에 해당하는 html존재여부 확인
        expect(wrapper.find('p.player-job').exists()).toEqual(true)
        // 버튼의 내용은 '다음'으로 나타나야 (다음 사람 안내) 
        expect(wrapper.find('button.btn-lg').text()).toEqual('다 음')

        // 버튼 클릭 이벤트 발생
        button.simulate('click')

        // 역할 확인 상태 -> false
        expect(wrapper.state('showRole')).toBe(false)
        // 플레이어 인덱스 증가
        expect(wrapper.state('showIndex')).toBeGreaterThan(0)
        // 다음 사람으로 넘어가고, 역할확인은 다시 안보여지게 된다.
        expect(wrapper.find('p.player-job').exists()).not.toEqual(true)
        // 버튼의 내용도 맨 처음과 같이 바뀌게 된다.
        expect(wrapper.find('button.btn-lg').text()).toEqual('확인 하기')

        //// 4명의 직업을 체크한 후, history.push 호출 ( 각 사람당 2번 버튼 클릭 (-> 직업체크-> 다음사람))

        button.simulate('click')
        button.simulate('click')
        button.simulate('click')
        button.simulate('click')
        button.simulate('click')
        button.simulate('click')    // <- 여기서 호출이 되어야함.

        // this.props.history.push가 
        // pushRoute.game.callArgWith(1, '/game', wrapper.state('players'))
        expect(pushRoute.game).toHaveProperty('callCount', 1)
        expect(pushRoute.game.getCalls()[0].args[0]).toBe('/game')
        expect(pushRoute.game.getCalls()[0].args[1]).toHaveProperty('players', wrapper.state('players'))
        console.log(
            pushRoute.game.getCalls()[0].args
        );
        // expect(pushRoute.game.calledOnceWith('/game', wrapper.state('players'))).toBe(true)
    })

})