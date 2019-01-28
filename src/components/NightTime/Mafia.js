import React from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';

class Mafia extends React.Component {
	handleSelectBtn = (name) => {
		const { handleConfirmAndCheck, votePersonAtMafiaTime } = this.props;
		handleConfirmAndCheck();
		votePersonAtMafiaTime(name);
	};
	render() {
		const { players } = this.props;
		return (
			<div>
				<h1>당신은 마피아 입니다.</h1>
				<h2>죽일 사람을 선택하십시오.</h2>
				{players
					.filter((person) => {
						return person.jobName !== 'MAFIA';
					})
					.map((person, i) => (
						<button key={`mafia-select-${i}`} onClick={() => this.handleSelectBtn(person.name)}>
							{person.name}
						</button>
					))}
			</div>
		);
	}
}

Mafia.propTypes = {
	// context
	players: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			daytimeVoted: PropTypes.number,
			jobName: PropTypes.string.isRequired,
			code: PropTypes.number
		})
	).isRequired,
	nightTimeOrder: PropTypes.number.isRequired,
	votePersonAtMafiaTime: PropTypes.func.isRequired,
	// parent
	handleConfirmAndCheck: PropTypes.func.isRequired
};

export default useGame(({ state, actions }) => ({
	players: state.players,
	nightTimeOrder: state.nightTimeOrder,
	votePersonAtMafiaTime: actions.votePersonAtMafiaTime
}))(Mafia);
