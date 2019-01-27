import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Component
import Discuss from './DayTimeDiscuss';
import VoteTime from './VoteTime';
import Result from './Result';
import { useGame } from '../../context/GameContext';
import WhetherVictory from '../common/WhetherVictory';
import { TURN_OF_DISCUSS_AT_DAY, TURN_OF_VOTE_AT_DAY, TURN_OF_RESULT_AT_DAY } from '../../contants/turnOfGame/DayTime';

class DayTime extends React.Component {
	render() {
		const { dayTimeOrder } = this.props;
		return (
			<div>
				{dayTimeOrder === 'discuss' && <Discuss />}
				{dayTimeOrder === 'vote' && <VoteTime />}
				{dayTimeOrder === 'result' && <Result />}
				{/* 게임 종료 여부에 따른 버튼 */}
				<WhetherVictory />
			</div>
		);
	}
}

DayTime.propTypes = {
	// context
	isEndGame: PropTypes.bool.isRequired,
	dayTimeOrder: PropTypes.oneOf([ TURN_OF_DISCUSS_AT_DAY, TURN_OF_VOTE_AT_DAY, TURN_OF_RESULT_AT_DAY ]),
	moveToMainAndReset: PropTypes.func.isRequired,
	changeDayTimeOrder: PropTypes.func.isRequired
};

export default withRouter(
	useGame(({ state, actions }) => ({
		isEndGame: state.isEndGame,
		dayTimeOrder: state.dayTimeOrder,
		moveToMainAndReset: actions.moveToMainAndReset,
		changeDayTimeOrder: actions.changeDayTimeOrder
	}))(DayTime)
);
