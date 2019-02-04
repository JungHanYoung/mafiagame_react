import React from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';
import { JOB_NAME_OF_MAFIA } from '../../contants/Job';

class Mafia extends React.Component {
	handleSelectBtn = (name) => {
		const { handleConfirmAndCheck, votePersonAtMafiaTime } = this.props;
		handleConfirmAndCheck();
		votePersonAtMafiaTime(name);
	};
	render() {
		const { players, mafiaVotes } = this.props;
		return (
			<div className="game-content">
				<p className="content-description">당신은 마피아 입니다.<br />죽일 사람을 선택하십시오.</p>

				<div>마피아 투표 현황</div>
				<div className="vote-btn-container">
					{players
						.filter((person) => person.jobName !== JOB_NAME_OF_MAFIA)
						.map((person, i) => (
							<button className="btn-sm" key={`mafia-select-${i}`} onClick={() => this.handleSelectBtn(person.name)}>
								{person.name}
							</button>
						))}
				</div>
				{mafiaVotes.map(person => person.voter.length > 0 ? (
					<div>
						<h3>{person.name}을 죽인다.</h3>
						<ul>
							{person.voter.map(name => <li>{name}</li>)}
						</ul>
					</div>
				) : null)}
				<div>
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
	handleConfirmAndCheck: PropTypes.func.isRequired,
	//
	mafiaVotes: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		voter: PropTypes.arrayOf(PropTypes.string).isRequired
	}))
};

export default useGame(({ state, actions }) => ({
	players: state.players,
	nightTimeOrder: state.nightTimeOrder,
	votePersonAtMafiaTime: actions.votePersonAtMafiaTime,
	//
	mafiaVotes: state.mafiaVotes
}))(Mafia);
