import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';

class VoteTime extends React.Component {
	state = {
		voteOrder: 0
	};
	handleVote = (name) => {
		const { votePerson, players, endVoteTime } = this.props;
		const { voteOrder } = this.state;
		votePerson(name).then(() => {
			voteOrder < players.length - 1
				?
				this.setState({
					voteOrder: voteOrder + 1
				})
				:
				endVoteTime();
		})


	};
	render() {
		const { voteOrder } = this.state;
		const { players } = this.props;

		return (
			<Fragment>
				<h1>마피아로 의심되는 사람을 투표합니다.</h1>
				<div>{players[voteOrder].name}님의 투표</div>
				<div>
					{players.map((person, i) => {
						if (i === voteOrder) {
							return null;
						} else {
							return (
								<button key={`vote-btn-${i}`} onClick={() => this.handleVote(person.name)}>
									{person.name}
								</button>
							);
						}
					})}
				</div>
			</Fragment>
		);
	}
}

VoteTime.propTypes = {
	votePerson: PropTypes.func.isRequired,
	endVoteTime: PropTypes.func.isRequired,
	players: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			daytimeVoted: PropTypes.number,
			jobName: PropTypes.string.isRequired,
			code: PropTypes.number
		})
	)
};

export default useGame(({ state, actions }) => ({
	votePerson: actions.votePerson,
	endVoteTime: actions.endVoteTime,
	players: state.players
}))(VoteTime);
