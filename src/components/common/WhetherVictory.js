import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';

class WhetherVictory extends Component {
	moveToMain = () => {
		this.props.moveToMainAndReset();
		this.props.history.push('/');
	};
	render() {
		const {
			isEndGame,
			victory,
			setDayTime,
			isEndVoteDayTime,
			isEndVoteNight,
			setNightTime,
			isReVoted,
			voteAgainAtNight
		} = this.props;
		return isEndGame ? (
			<Fragment>
				{victory === 'mafia' && (
					<div>
						<h2>마피아가 승리하였습니다!</h2>
					</div>
				)}
				{victory === 'citizen' && (
					<div>
						<h2>시민이 승리하였습니다!</h2>
					</div>
				)}
				<button onClick={this.moveToMain}>메인으로</button>
			</Fragment>
		) : isReVoted ? (
			<button onClick={voteAgainAtNight}>재투표를 합니다.</button>
		) : isEndVoteDayTime ? (
			<button onClick={setNightTime}>밤이 됩니다.</button>
		) : isEndVoteNight ? (
			<button onClick={setDayTime}>낮이 됩니다.</button>
		) : null;
	}
}

WhetherVictory.propTypes = {
	isEndGame: PropTypes.bool.isRequired,
	victory: PropTypes.oneOf([ '', 'mafia', 'citizen' ]),
	isEndVoteDayTime: PropTypes.bool.isRequired,
	isEndVoteNight: PropTypes.bool.isRequired,
	isReVoted: PropTypes.bool.isRequired,
	moveToMainAndReset: PropTypes.func.isRequired,
	setDayTime: PropTypes.func.isRequired,
	setNightTime: PropTypes.func.isRequired,
	voteAgainAtNight: PropTypes.func.isRequired
};

export default withRouter(
	useGame(({ state, actions }) => ({
		isEndGame: state.isEndGame,
		victory: state.victory,
		isEndVoteDayTime: state.isEndVoteDayTime,
		isEndVoteNight: state.isEndVoteNight,
		isReVoted: state.isReVoted,
		moveToMainAndReset: actions.moveToMainAndReset,
		setDayTime: actions.setDayTime,
		setNightTime: actions.setNightTime,
		voteAgainAtNight: actions.voteAgainAtNight
	}))(WhetherVictory)
);
