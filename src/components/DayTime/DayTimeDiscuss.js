import React from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';

class DayTimeDiscuss extends React.Component {
	render() {
		const { changeDayTimeOrder } = this.props;
		return (
			<>
				<h2>낮 토론 시간입니다. 토론을 통해 마피아를 찾으세욥.</h2>
				<button onClick={changeDayTimeOrder}>투표로 이동</button>
			</>
		);
	}
}

DayTimeDiscuss.propTypes = {
	changeDayTimeOrder: PropTypes.func.isRequired
};

export default useGame(({ state, actions }) => ({
	changeDayTimeOrder: actions.changeDayTimeOrder
}))(DayTimeDiscuss);
