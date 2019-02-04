import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';
import { DAY_TIME, NIGHT_TIME } from '../../contants/turnOfGame/Game';

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
			gameOrder,
			voteAgainAtNight,
			changeDayTimeOrder
		} = this.props;
		return isEndGame ? (
			<>
				{victory === 'mafia' && (
					<>
						<h2>마피아가 승리하였습니다!</h2>
					</>
				)}
				{victory === 'citizen' && (
					<>
						<h2>시민이 승리하였습니다!</h2>
					</>
				)}
				<button className="btn-lg" onClick={this.moveToMain}>메인으로</button>
			</>
		) : isReVoted ?
				gameOrder === DAY_TIME ?
					<>
						<button className="btn-sm" onClick={changeDayTimeOrder}>재투표를 합니다.</button>
						<button className="btn-sm" onClick={setNightTime}>밤이 됩니다.</button>
					</> : <button className="btn-lg" onClick={voteAgainAtNight}>재투표를 합니다.</button>
				: isEndVoteDayTime ? (
					<button className="btn-lg" onClick={setNightTime}>밤이 됩니다.</button>
				) : isEndVoteNight ? (
					<button className="btn-lg" onClick={setDayTime}>낮이 됩니다.</button>
				) : null;
	}
}

WhetherVictory.propTypes = {
	isEndGame: PropTypes.bool.isRequired,
	victory: PropTypes.oneOf(['', 'mafia', 'citizen']),
	isEndVoteDayTime: PropTypes.bool.isRequired,
	isEndVoteNight: PropTypes.bool.isRequired,
	isReVoted: PropTypes.bool.isRequired,
	gameOrder: PropTypes.oneOf([DAY_TIME, NIGHT_TIME]),
	moveToMainAndReset: PropTypes.func.isRequired,
	setDayTime: PropTypes.func.isRequired,
	setNightTime: PropTypes.func.isRequired,
	voteAgainAtNight: PropTypes.func.isRequired,
	changeDayTimeOrder: PropTypes.func.isRequired
};

export default withRouter(
	useGame(({ state, actions }) => ({
		isEndGame: state.isEndGame,
		victory: state.victory,
		isEndVoteDayTime: state.isEndVoteDayTime,
		isEndVoteNight: state.isEndVoteNight,
		isReVoted: state.isReVoted,
		gameOrder: state.gameOrder,
		moveToMainAndReset: actions.moveToMainAndReset,
		setDayTime: actions.setDayTime,
		setNightTime: actions.setNightTime,
		voteAgainAtNight: actions.voteAgainAtNight,
		changeDayTimeOrder: actions.changeDayTimeOrder
	}))(WhetherVictory)
);
