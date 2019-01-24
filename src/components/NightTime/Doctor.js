import React from 'react';
import { useGame } from '../../context/GameContext';

class Doctor extends React.Component {
	componentWillMount() {
		const { players, setNightOrder } = this.props;
		if (players.filter((person) => person.jobName === 'DOCTOR').length <= 0) {
			setNightOrder('police');
		}
	}
	render() {
		const { players, votePersonAtDoctor } = this.props;
		return (
			<div>
				<h1>Doctor</h1>
				{players.map((person, i) => (
					<button key={`doctor-select-${i}`} onClick={() => votePersonAtDoctor(person.name)}>
						{person.name}
					</button>
				))}
			</div>
		);
	}
}

export default useGame(({ state, actions }) => ({
	players: state.players,
	votePersonAtDoctor: actions.votePersonAtDocter,
	setNightOrder: actions.setNightOrder
}))(Doctor);
