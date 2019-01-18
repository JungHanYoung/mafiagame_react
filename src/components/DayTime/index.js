import React from 'react';

// Component
import Discuss from './DayTimeDiscuss';
import VoteTime from './VoteTime';
import { useGame } from '../../context/GameContext';

class DayTime extends React.Component {
	handleNext = () => {
		const { dayTimeOrder, changeDayTimeOrder, toggleNightAndDay } = this.props;
		if (dayTimeOrder === 'vote') {
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
				<button onClick={this.handleNext}>next</button>
			</div>
		);
	}
}

export default useGame(({ state, actions }) => ({
	dayTimeOrder: state.dayTimeOrder,
	changeDayTimeOrder: actions.changeDayTimeOrder,
	toggleNightAndDay: actions.toggleNightAndDay
}))(DayTime);
