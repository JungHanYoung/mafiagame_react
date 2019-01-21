import React, { createContext, Component } from 'react';
import createUseConsumer from '../lib/createUseConsumer';
import { shuffle } from '../utils/shuffle';

const Context = createContext();

const { Provider, Consumer: GameConsumer } = Context;

class GameProvider extends Component {
	state = {
		people: [],
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
		setRolePeople: (people, jobs) => {
			let c_people = [ ...people ];

			jobs.forEach((job) => {
				let flag_count = 0;
				while (job.count !== flag_count) {
					const randomIndex = Math.floor(Math.random() * people.length);
					if (typeof c_people[randomIndex] === 'object') {
						continue;
					} else {
						c_people = [
							{
								name: c_people.splice(randomIndex, 1)[0],
								code: job.code,
								jobName: job.jobName
							},
							...c_people
						];
						flag_count += 1;
					}
				}
			});

			c_people = shuffle(c_people);
			this.setState({
				people: c_people
			});
		},
		setPeopleVoted: () => {
			this.setState({
				people: [
					...this.state.people.map((person) => {
						return Object.assign(person, { daytimeVoted: 0 });
					})
				]
			});
		},
		votePerson: (name) => {
			this.setState({
				people: this.state.people.map((person) => {
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
			const { people } = this.state;
			const maxVotedIndex = people.reduce((max, cur, index) => {
				return people[max].daytimeVoted < cur.daytimeVoted ? index : max;
			}, 0);
			const c_people = [ ...people ];
			const votedPerson = c_people.splice(maxVotedIndex, 1)[0];
			c_people.forEach((person) => {
				Object.assign(person, { daytimeVoted: 0 });
			});
			this.setState({
				people: c_people,
				dayTimeOrder: 'result',
				dayTimeVotedPerson: votedPerson
				// gameOrder: 'night-time'
			});
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
			this.setState({
				votedByDoctor: name,
				nightTimeOrder: 'police'
			});
		},
		moveToVoteResultAtNight: () => {
			this.setState({
				nightTimeOrder: 'result'
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
