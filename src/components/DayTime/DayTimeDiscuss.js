import React from 'react';
// import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';

class DayTimeDiscuss extends React.Component {
	render() {
		return (
			<p className="content-description">낮 토론 시간입니다.<br /> 토론을 통해 마피아를 찾으세욥.</p>
		);
	}
}

DayTimeDiscuss.propTypes = {
};

export default useGame(({ state, actions }) => ({
}))(DayTimeDiscuss);
