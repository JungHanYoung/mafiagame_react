import React from 'react';
import { useGame } from '../../context/GameContext';

class Doctor extends React.Component {
	componentWillMount() {
		const { people, setNightOrder } = this.props;
		if (people.filter((person) => person.jobName === 'DOCTOR').length <= 0) {
			setNightOrder('police');
		}
	}
	render() {
		const { people, votePersonAtDoctor } = this.props;
		return (
			<div>
				<h1>Doctor</h1>
				{people.map((person) => <button onClick={() => votePersonAtDoctor(person.name)}>{person.name}</button>)}
			</div>
		);
	}
}

export default useGame(({ state, actions }) => ({
	people: state.people,
	votePersonAtDoctor: actions.votePersonAtDocter,
	setNightOrder: actions.setNightOrder
}))(Doctor);
