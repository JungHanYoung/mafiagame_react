import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { mount, shallow, render } from 'enzyme'

// Component
import App from '../App'

describe('App 컴포넌트 (main)', () => {
    it('rendering', () => {
        const wrapper = shallow(<App />)
        expect(wrapper).toMatchSnapshot()
    })
})