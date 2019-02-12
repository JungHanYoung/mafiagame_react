import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme';

import Result from '../components/NightTime/Result'

import { Map } from 'immutable'
import { players } from '../mockData'

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

describe('Night - <Result />', () => {

    let wrapper = null;

    it('Night - <Result /> without crashing', () => {
        wrapper = mount(<Router><Result {...minProps} /></Router>)
    })

    it('default props -> rendering', () => {
        expect(wrapper.find('div.game-content').exists()).toEqual(true)
        expect(wrapper.find('p.content-description').exists()).toEqual(true)
        expect(wrapper.find('h4').exists()).toEqual(true)
    })
})