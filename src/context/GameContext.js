import React, { useReducer } from 'react';
import { reducer } from './Game/reducer';
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN } from '../contants/Job';

const GameContext = React.createContext();

const initialState = {
	people: [],
	jobs: [
		{
			code: 1,
			jobName: JOB_NAME_OF_MAFIA,
			minCount: 0,
			maxCount: 0
		},
		{
			code: 2,
			jobName: JOB_NAME_OF_POLICE,
			minCount: 0,
			maxCount: 0
		},
		{
			code: 3,
			jobName: JOB_NAME_OF_DOCTOR,
			minCount: 0,
			maxCount: 0
		},
		{
			code: 4,
			jobName: JOB_NAME_OF_CITIZEN,
			minCount: 0,
			maxCount: 0
		}
	]
}

const GameProvider = ({ children }) => (
	<GameContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</GameContext.Provider>
)

export {
	initialState,
	GameContext,
	GameProvider
}