import React from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';

class Doctor extends React.Component {
	render() {
		const { players, votePersonAtDoctor } = this.props;
		console.log(votePersonAtDoctor);
		console.log(players);
		return (
			<div>
				<h1>당신은 의사입니다.</h1>
				<h2>누구를 살릴지 선택을 하세요.</h2>
				{players.map((person, i) => (
					<button key={`doctor-select-${i}`} onClick={() => votePersonAtDoctor(person.name)}>
						{person.name}
					</button>
				))}
			</div>
		);
	}
}

Doctor.propTypes = {
	// context
	players: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			daytimeVoted: PropTypes.number,
			jobName: PropTypes.string.isRequired,
			code: PropTypes.number
		})
	),
	votePersonAtDoctor: PropTypes.func.isRequired,
	// parent
	handleConfirmAndCheck: PropTypes.func.isRequired
};

export default useGame(({ state, actions }) => ({
	players: state.players,
	votePersonAtDoctor: actions.votePersonAtDoctor
}))(Doctor);
