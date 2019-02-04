import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Component
import Discuss from './DayTimeDiscuss';
import VoteTime from './VoteTime';
import Result from './Result';
import { useGame } from '../../context/GameContext';
import { TURN_OF_DISCUSS_AT_DAY, TURN_OF_VOTE_AT_DAY, TURN_OF_RESULT_AT_DAY } from '../../contants/turnOfGame/DayTime';

const getBtn = (order, handler) => {
	switch (order) {
		case TURN_OF_DISCUSS_AT_DAY:
			return <button className="btn-lg" onClick={handler.changeDayTimeOrder}>투표 하기</button>
		case TURN_OF_VOTE_AT_DAY:
			return null;
		case TURN_OF_RESULT_AT_DAY:
			return <button className="btn-lg" onClick={handler.setNightTime}>밤이 됩니다.</button>
		default:
			return null;
	}
}

class DayTime extends React.Component {
	render() {
		const { dayTimeOrder, setNightTime, changeDayTimeOrder } = this.props;
		return (
			<>
				<div className="game-content">
					{dayTimeOrder === 'discuss' && <Discuss />}
					{dayTimeOrder === 'vote' && <VoteTime />}
					{dayTimeOrder === 'result' && <Result />}
				</div>
				{/* 게임 종료 여부에 따른 버튼 */}
				{getBtn(dayTimeOrder, { changeDayTimeOrder, setNightTime })}
				{/* <WhetherVictory /> */}
			</>
		);
	}
}

DayTime.propTypes = {
	// context
	isEndGame: PropTypes.bool.isRequired,
	dayTimeOrder: PropTypes.oneOf([TURN_OF_DISCUSS_AT_DAY, TURN_OF_VOTE_AT_DAY, TURN_OF_RESULT_AT_DAY]),
	moveToMainAndReset: PropTypes.func.isRequired
};

export default withRouter(
	useGame(({ state, actions }) => ({
		isEndGame: state.isEndGame,
		dayTimeOrder: state.dayTimeOrder,
		moveToMainAndReset: actions.moveToMainAndReset,
		// btn
		changeDayTimeOrder: actions.changeDayTimeOrder,
		setNightTime: actions.setNightTime,

	}))(DayTime)
);
