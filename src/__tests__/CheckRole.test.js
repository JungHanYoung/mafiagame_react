import React from 'react';
import { shallow } from 'enzyme';

import { CheckRole } from '../routes/CheckRole'
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN } from '../contants/Job';

const minProps = {
    people: [
        "하녕", "병우기", "대용쓰", "병민"
    ],
    jobs: [
        {
            code: 1,
            jobName: JOB_NAME_OF_MAFIA,
            count: 1
        },
        {
            code: 2,
            jobName: JOB_NAME_OF_POLICE,
            count: 1
        },
        {
            code: 3,
            jobName: JOB_NAME_OF_DOCTOR,
            count: 1
        },
        {
            code: 4,
            jobName: JOB_NAME_OF_CITIZEN,
            count: 1
        },
    ],
    randomJobs: [
        {
            code: 1,
            jobName: JOB_NAME_OF_MAFIA,
            count: 0
        },
        {
            code: 2,
            jobName: JOB_NAME_OF_POLICE,
            count: 0
        },
        {
            code: 3,
            jobName: JOB_NAME_OF_DOCTOR,
            count: 0
        },
        {
            code: 4,
            jobName: JOB_NAME_OF_CITIZEN,
            count: 0
        }
    ]
}

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

        // 버튼 클릭 이벤트 발생
        wrapper.find('button.btn-lg').simulate('click')

        // 버튼 클릭 후, 역할이 확인되야함. 플레이어의 역할에 해당하는 html존재여부 확인
        expect(wrapper.find('p.player-job').exists()).toEqual(true)
        // 버튼의 내용은 '다음'으로 나타나야 (다음 사람 안내) 
        expect(wrapper.find('button.btn-lg').text()).toEqual('다음')

        // 버튼 클릭 이벤트 발생
        wrapper.find('button.btn-lg').simulate('click')

        // 다음 사람으로 넘어가고, 역할확인은 다시 안보여지게 된다.
        expect(wrapper.find('p.player-job').exists()).not.toEqual(true)
        // 버튼의 내용도 맨 처음과 같이 바뀌게 된다.
        expect(wrapper.find('button.btn-lg').text()).toEqual('확인 하기')

    })

})