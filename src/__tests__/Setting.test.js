import React from 'react';
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { Setting } from '../routes/Setting'
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_POLICE, JOB_NAME_OF_CITIZEN } from '../contants/Job';

const minProps = {
    people: ['한영', '지은', '대용', '설민'],
    jobs: [
        {
            jobName: JOB_NAME_OF_MAFIA,
            minCount: 0,
            maxCount: 0
        },
        {
            jobName: JOB_NAME_OF_DOCTOR,
            minCount: 0,
            maxCount: 0
        },
        {
            jobName: JOB_NAME_OF_POLICE,
            minCount: 0,
            maxCount: 0
        },
        {
            jobName: JOB_NAME_OF_CITIZEN,
            minCount: 0,
            maxCount: 0
        },
    ],
    setPeopleNum: jest.fn(),
    onChangePeopleName: jest.fn(),
    history: {
        push: sinon.spy()
    }
}

describe('기본 렌더링 테스트', () => {
    const wrapper = shallow(<Setting {...minProps} />)
    wrapper.instance().onSettingEnd = sinon.spy()

    it('기본 생성시의 렌더링 코드 확인', () => {
        expect(wrapper.find('button.setting-end').exists()).toBe(false)
        const btnOfNext = wrapper.find('button.setting-next-btn')
        btnOfNext.simulate('click')
        expect(wrapper.find('button.setting-end').exists()).toBe(true)
        const btnOfStart = wrapper.find('button.setting-end')
        btnOfStart.simulate('click')
        expect(wrapper.instance().onSettingEnd.callCount).toBe(1)
        // console.log(wrapper.instance().props)
        expect(wrapper.instance().props.history.push.callCount).toBe(0)

        expect(false).toEqual(true)
        // wrapper.setProps({
        //     jobs: [
        //         {
        //             jobName: JOB_NAME_OF_MAFIA,
        //             minCount: 1,
        //             maxCount: 0
        //         },
        //         {
        //             jobName: JOB_NAME_OF_DOCTOR,
        //             minCount: 1,
        //             maxCount: 0
        //         },
        //         {
        //             jobName: JOB_NAME_OF_POLICE,
        //             minCount: 1,
        //             maxCount: 0
        //         },
        //         {
        //             jobName: JOB_NAME_OF_CITIZEN,
        //             minCount: 1,
        //             maxCount: 0
        //         }
        //     ]
        // })
        // expect(wrapper).toMatchSnapshot()
        // console.log(wrapper.instance().props)
        // wrapper.find('button.setting-next-btn').simulate('click')
        // wrapper.find('button.setting-end').simulate('click')
        // console.log(wrapper.instance().props.history.push)
        // expect(wrapper.instance().props.history.push.callCount).toBe(1)
    })
})

