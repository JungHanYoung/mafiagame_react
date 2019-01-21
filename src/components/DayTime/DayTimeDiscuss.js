import React from 'react';
import { useGame } from '../../context/GameContext';

class DayTimeDiscuss extends React.Component {
	render() {
		return <div>낮 토론 시간입니다. 토론을 통해 마피아를 찾으세욥.</div>;
	}
}

export default useGame(({ state, actions }) => ({
	order: state.gameOrder
}))(DayTimeDiscuss);
