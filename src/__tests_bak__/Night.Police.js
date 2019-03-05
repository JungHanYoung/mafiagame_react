import React from 'react';
import { shallow } from 'enzyme'
import { List, Map } from 'immutable'
import Police from '../components/NightTime/Police'

import { players } from "../mockData";
import { JOB_NAME_OF_POLICE, JOB_NAME_OF_CITIZEN } from '../contants/Job';


const minProps = {
    players,
    me: players.find(player => player.get('jobName') === JOB_NAME_OF_POLICE),
    revoted: false,
    toggleConfirmed: jest.fn(),
    changeNightTimeOrder: jest.fn()
}

describe('Night > Police 컴포넌트 테스트', () => {

    it('렌더링 테스트', () => {
        const wrapper = shallow(<Police {...minProps} />)
        expect(wrapper.exists()).toBe(true)
    })

    it('스냅샷', () => {
        const wrapper = shallow(<Police {...minProps} />)
        expect(wrapper).toMatchSnapshot();
    })

    it('직업 확인 후 렌더링', () => {
        const wrapper = shallow(<Police {...minProps} />)

        wrapper.setState({
            selected: true,
            selectName: '한영',
            jobName: JOB_NAME_OF_CITIZEN
        })

        expect(wrapper).toMatchSnapshot()
    })

})