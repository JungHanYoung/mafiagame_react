import React from 'react';
import { useGame } from '../../context/GameContext';

class Doctor extends React.Component {
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
	votePersonAtDoctor: actions.votePersonAtDocter
}))(Doctor);
