import React from 'react';
import { render, cleanup } from 'react-testing-library'
import "jest-dom/extend-expect"
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_POLICE, JOB_NAME_OF_CITIZEN } from '../../contants/Job';
import Result from '../Result'
import { GameContext } from '../../context/GameContext';

afterEach(cleanup)

it('not yet', () => {
    expect(true).toBeTruthy()
})

// function renderWithContext(component) {
//     const initialState = {

//     }
// }