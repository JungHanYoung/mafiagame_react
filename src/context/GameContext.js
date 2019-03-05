import React, { useReducer } from 'react';
// import createUseConsumer from '../lib/createUseConsumer';
import { setPlayers } from '../utils/setPlayers';

// Constant 상수
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN } from '../contants/Job';

// const Context = createContext();

export const GameContext = React.createContext();

let initialState = {
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

function reducer(state, action) {
	switch (action.type) {
		case 'SET_PEOPLE_NUM':
			return {
				...state,
				people: Array.from({ length: action.value }, (v, k) => k).map(() => '')
			}
		case 'ON_CHANGE_JOB_MIN':
			if (action.value >= 0) {
				return {
					...state,
					jobs: state.jobs.map(job => job.code === action.code ? { ...job, minCount: action.value } : job)
				}
			} else {
				return state
			}
		case 'ON_CHANGE_JOB_MAX':
			if (action.value >= 0) {
				return {
					...state,
					jobs: state.jobs.map(job => job.code === action.code ? { ...job, maxCount: action.value } : job)
				}
			} else {
				return state
			}
		case 'ON_CHANGE_PEOPLE_NAME':
			return {
				...state,
				people: state.people.map((v, index1) => (action.index === index1 ? action.value : v))
			}
		case 'SET_ROLE_PEOPLE':
			const { people, jobs } = state
			return {
				...state,
				players: setPlayers(people, jobs)
			}
		default:
			return state;
	}
}

export const GameProvider = ({ children }) => (
	<GameContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</GameContext.Provider>
)

// const { Provider, Consumer: GameConsumer } = Context;

// // State Interface
// /**
//  * people: [string]		- 세팅시 입력받은 플레이어들의 이름
//  * players: [{			- people과 jobs를 합쳐서 무작위로 역할지정된 다음의 플레이어들
//  * 	code: number,
//  * 	name: string,
//  * 	jobName: string
//  * }]
//  * jobs: [{				- 세팅 시에 정한 직업과 그 직업의 수
//  * 	code: number
//  * 	jobName: string
//  * 	minCount: number
//  * 	maxCount: number
//  * }]
//  */

// class GameProvider extends Component {
// 	// 데이터
// 	state = {
// 		people: [],
// 		jobs: [
// 			{
// 				code: 1,
// 				jobName: JOB_NAME_OF_MAFIA,
// 				minCount: 0,
// 				maxCount: 0
// 			},
// 			{
// 				code: 2,
// 				jobName: JOB_NAME_OF_POLICE,
// 				minCount: 0,
// 				maxCount: 0
// 			},
// 			{
// 				code: 3,
// 				jobName: JOB_NAME_OF_DOCTOR,
// 				minCount: 0,
// 				maxCount: 0
// 			},
// 			{
// 				code: 4,
// 				jobName: JOB_NAME_OF_CITIZEN,
// 				minCount: 0,
// 				maxCount: 0
// 			}
// 		]
// 	};

// 	actions = {
// 		// Setting > onPeopleChange - 드롭박스로 사람인원을 정했을 때, people에 배열 요소 할당
// 		setPeopleNum: (value) => {
// 			this.setState({
// 				people: Array.from({ length: value }, (v, k) => k).map(() => '')
// 			});
// 		},
// 		// Setting > input:number - job의 수를 입력받아 핸들링
// 		onChangeJobMinCount: (code) => (value) => {
// 			const { jobs } = this.state;
// 			if (value >= 0) {
// 				this.setState({
// 					jobs: jobs.map(job => job.code === code ? { ...job, minCount: value } : job)
// 				})
// 			}
// 		},
// 		onChangeJobMaxCount: (code) => (value) => {
// 			const { jobs } = this.state;
// 			if (value >= 0) {
// 				this.setState({
// 					jobs: jobs.map(job => job.code === code ? { ...job, maxCount: value } : job)
// 				})
// 			}
// 		},
// 		// Setting > input
// 		onChangeRandomJobCount: (code, value) => {
// 			const { randomJobs } = this.state;
// 			if (value >= 0) {
// 				this.setState({
// 					randomJobs: randomJobs.map(job => job.code === code ? { ...job, count: value } : job)
// 				})
// 			}
// 		},
// 		// Setting > input - 세팅에서 플레이어이름 입력 인풋 핸들링
// 		onChangePeopleName: (i, value) => {
// 			const { people } = this.state;

// 			this.setState({
// 				people: people.map((v, index1) => (i === index1 ? value : v))
// 			});
// 		},
// 		// CheckRole > componentWillMount - 세팅 끝난 후, players 무작위 역할지정 및 마피아,의사투표 초기화
// 		setRolePeople: () => {
// 			const { jobs, people, randomJobs } = this.state;

// 			// console.log(randomJobs)

// 			const players = setPlayers(people, jobs, randomJobs);

// 			this.setState({
// 				players
// 			});
// 		},
// 	};

// 	render() {
// 		const { state, actions } = this;
// 		const value = { state, actions };
// 		return <Provider value={value}>{this.props.children}</Provider>;
// 	}
// }

// const useGame = createUseConsumer(GameConsumer);

// export { GameProvider, GameConsumer, useGame };
