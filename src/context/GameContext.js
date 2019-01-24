import React, { createContext, Component } from 'react';
import createUseConsumer from '../lib/createUseConsumer';
import { Object } from 'es6-shim';
import { setPlayers } from '../utils/setPlayers';

const Context = createContext();

const { Provider, Consumer: GameConsumer } = Context;

class GameProvider extends Component {
	// 데이터
	state = {
		people: [],
		players: [],
		jobs: [],
		isEndGame: false,
		gameOrder: 'day-time',
		dayTimeOrder: 'discuss',
		dayTimeVotedPerson: '',
		nightTimeOrder: 'mafia',
		isEndVoteDayTime: false,
		votedByMafia: '',
		votedByDoctor: ''
	};

	actions = {
		setJobs: (jobs) => {
			this.setState({
				jobs
			});
		},
		setPeople: (people) => {
			this.setState({
				people
			});
		},
		setRolePeople: () => {
			const { people, jobs } = this.state;
			let c_people = [ ...people ];

			// people 순서가 바뀜
			//jobs.forEach((job) => {
			//	let flag_count = 0;
			//	while (job.count !== flag_count) {
			//		const randomIndex = Math.floor(Math.random() * people.length);
			//		if (typeof c_people[randomIndex] === 'object') {
			//			continue;
			//		} else {
			//			c_people = [
			//				{
			//					name: c_people.splice(randomIndex, 1)[0],
			//					code: job.code,
			//					jobName: job.jobName
			//				},
			//				...c_people
			//			];
			//			flag_count += 1;
			//		}
			//	}
			//});

			const players = setPlayers(c_people, jobs);
			// shuffle 함수 왜쓰는지 모르겠음.. 그대로임
			//c_people = shuffle(c_people);
			this.setState({
				people: c_people,
				players
			});
		},
		setPeopleVoted: () => {
			this.setState({
				players: [
					...this.state.players.map((person) => {
						return Object.assign(person, { daytimeVoted: 0 });
					})
				]
			});
		},
		votePerson: (name) => {
			this.setState({
				players: this.state.players.map((person) => {
					if (person.name === name) {
						return {
							...person,
							daytimeVoted: person.daytimeVoted + 1
						};
					} else {
						return person;
					}
				})
			});
		},
		endVoteTime: () => {
			// 투표 끝..
			// 투표를 많이 받은 사람은 people에서 삭제
			// 투표 수를 초기화시킴.
			const { players } = this.state;
			const maxVotedIndex = players.reduce((max, cur, index) => {
				return players[max].daytimeVoted < cur.daytimeVoted ? index : max;
			}, 0);
			const c_people = [ ...players ];
			const votedPerson = c_people.splice(maxVotedIndex, 1)[0];
			c_people.forEach((person) => {
				Object.assign(person, { daytimeVoted: 0 });
			});
			// 마피아인 사람
			const mafias = c_people.filter((person) => {
				return person.jobName === 'MAFIA';
			});
			// 마피아가 아닌 사람
			const citizen = c_people.filter((person) => {
				return person.jobName !== 'MAFIA';
			});
			// 만약 마피아가 1명도 없다면
			if (mafias.length === 0) {
				this.setState({
					players: c_people,
					dayTimeOrder: 'result',
					dayTimeVotedPerson: votedPerson,
					// 게임은 끝나고
					isEndGame: true,
					// 시민이 승리
					victory: 'citizen'
				});
				// 만약 마피아가 마피아가 아닌 사람과 같거나 많으면
			} else if (mafias.length >= citizen.length) {
				this.setState({
					players: c_people,
					dayTimeOrder: 'result',
					dayTimeVotedPerson: votedPerson,
					// 게임은 끝나고
					isEndGame: true,
					// 마피아가 승리
					victory: 'mafia'
				});
				// 위의 두 조건이 만족하지 않으면
			} else {
				// 그대로 게임 진행..
				this.setState({
					players: c_people,
					dayTimeOrder: 'result',
					dayTimeVotedPerson: votedPerson
				});
			}
		},
		changeDayTimeOrder: () => {
			const { dayTimeOrder } = this.state;
			if (dayTimeOrder === 'vote') {
				this.setState({
					dayTimeOrder: 'result'
				});
			} else if (dayTimeOrder === 'discuss') {
				this.setState({
					dayTimeOrder: 'vote'
				});
			} else if (dayTimeOrder === 'result') {
				this.setState({
					dayTimeOrder: 'discuss'
				});
			}
		},
		toggleNightAndDay: () => {
			const { gameOrder } = this.state;
			if (gameOrder === 'day-time') {
				this.setState({
					gameOrder: 'night-time'
				});
			} else if (gameOrder === 'night-time') {
				this.setState({
					gameOrder: 'day-time'
				});
			}
		},
		votePersonAtMafiaTime: (name) => {
			this.setState({
				votedByMafia: name,
				nightTimeOrder: 'doctor'
			});
		},
		votePersonAtDocter: (name) => {
			const { votedByMafia, players } = this.state;
			if (votedByMafia !== name) {
				// 여기서 마피아가 죽인 사람을 의사가 살리지 못함..
				const removeIndex = players.findIndex((person) => person.name === votedByMafia);
				const c_people = [ ...players ];
				c_people.splice(removeIndex, 1);
				this.setState({
					players: c_people
				});
			}
			this.setState({
				votedByDoctor: name,
				nightTimeOrder: 'police'
			});
		},
		moveToVoteResultAtNight: () => {
			this.setState({
				nightTimeOrder: 'result'
			});
		},
		setDayTime: () => {
			const { players } = this.state;
			this.setState({
				players: players.map((person) => {
					return Object.assign(person, { daytimeVoted: 0 });
				}),
				gameOrder: 'day-time',
				nightTimeOrder: 'mafia'
			});
		},
		moveToMainAndReset: () => {
			this.setState({
				players: [],
				isEndGame: false,
				gameOrder: 'day-time',
				dayTimeOrder: 'discuss',
				dayTimeVotedPerson: '',
				nightTimeOrder: 'mafia',
				isEndVoteDayTime: false,
				votedByMafia: '',
				votedByDoctor: ''
			});
		},
		setNightOrder: (name) => {
			this.setState({
				nightTimeOrder: name
			});
		}
	};

	render() {
		const { state, actions } = this;
		const value = { state, actions };
		return <Provider value={value}>{this.props.children}</Provider>;
	}
}

const useGame = createUseConsumer(GameConsumer);

export { GameProvider, GameConsumer, useGame };
