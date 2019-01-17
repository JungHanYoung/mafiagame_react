import React, { createContext, Component } from 'react';
import createUseConsumer from '../lib/createUseConsumer';
import { shuffle } from '../utils/shuffle';

const Context = createContext();

const { Provider, Consumer: GameConsumer } = Context;

class GameProvider extends Component {
	state = {
		people: [],
		gameOrder: 0,
		isEndVoteDayTime: false
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
		setGameStart: () => {
			this.setState({
				gameStart: true
			});
		},
		setPeopleVoted: () => {
			this.setState({
				people: [
					...this.state.people.map((person) => {
						return Object.assign(person, { daytimeVoted: 0, nightVoted: 0 });
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
