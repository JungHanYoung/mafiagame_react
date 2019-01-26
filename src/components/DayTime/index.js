import React from 'react';
import { withRouter } from 'react-router-dom';

// Component
import Discuss from './DayTimeDiscuss';
import VoteTime from './VoteTime';
import Result from './Result';
import { useGame } from '../../context/GameContext';
import WhetherVictory from '../common/WhetherVictory';

class DayTime extends React.Component {
	render() {
		const { dayTimeOrder } = this.props;
		return (
			<div>
				{dayTimeOrder === 'discuss' && <Discuss />}
				{dayTimeOrder === 'vote' && <VoteTime />}
				{dayTimeOrder === 'result' && <Result />}
				{/* 버튼 */}
				<WhetherVictory />
				{/* {dayTimeOrder !== 'vote' && !isEndGame && <button onClick={this.handleNext}>next</button>}
				{isEndGame && <button onClick={this.handleMoveToMain}>메인으로</button>} */}
			</div>
		);
	}
}

export default withRouter(
	useGame(({ state, actions }) => ({
		isEndGame: state.isEndGame,
		dayTimeOrder: state.dayTimeOrder,
		moveToMainAndReset: actions.moveToMainAndReset,
		changeDayTimeOrder: actions.changeDayTimeOrder,
		toggleNightAndDay: actions.toggleNightAndDay
	}))(DayTime)
);
