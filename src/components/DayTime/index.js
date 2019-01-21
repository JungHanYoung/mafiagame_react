import React from 'react';

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
	render() {
		const { dayTimeOrder } = this.props;
		return (
			<div>
				{dayTimeOrder === 'discuss' && <Discuss />}
				{dayTimeOrder === 'vote' && <VoteTime />}
				{dayTimeOrder === 'result' && <Result />}
				{dayTimeOrder !== 'vote' && <button onClick={this.handleNext}>next</button>}
			</div>
		);
	}
}

export default useGame(({ state, actions }) => ({
	dayTimeOrder: state.dayTimeOrder,
	changeDayTimeOrder: actions.changeDayTimeOrder,
	toggleNightAndDay: actions.toggleNightAndDay
}))(DayTime);
