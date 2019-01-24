import React from 'react';
import { withRouter } from 'react-router-dom';

// Component
import Discuss from './DayTimeDiscuss';
import VoteTime from './VoteTime';
import Result from './Result';
import { useGame } from '../../context/GameContext';

class DayTime extends React.Component {
	handleNext = () => {
		const { dayTimeOrder, changeDayTimeOrder, toggleNightAndDay } = this.props;
		if (dayTimeOrder === 'result') {
			toggleNightAndDay();
		}
		changeDayTimeOrder();
	};
	handleMoveToMain = () => {
		this.props.history.push('/');
		this.props.moveToMainAndReset();
	};
	render() {
		const { dayTimeOrder, isEndGame } = this.props;
		return (
			<div>
				{dayTimeOrder === 'discuss' && <Discuss />}
				{dayTimeOrder === 'vote' && <VoteTime />}
				{dayTimeOrder === 'result' && <Result />}
				{dayTimeOrder !== 'vote' && !isEndGame && <button onClick={this.handleNext}>next</button>}
				{isEndGame && <button onClick={this.handleMoveToMain}>메인으로</button>}
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
