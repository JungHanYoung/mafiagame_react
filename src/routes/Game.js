import React from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../context/GameContext';

// 컴포넌트
import DayTime from '../components/DayTime';
import NightTime from '../components/NightTime';

class Game extends React.Component {
	componentWillMount() {
		this.props.setPeopleVoted();
	}

	render() {
		const { gameOrder } = this.props;

		return (
			<div className="animated fadeInUp">
				{gameOrder === 'day-time' ? (
					<div>
						<h1>낮</h1>
						<DayTime />
					</div>
				) : (
					<div className="App-header">
						<h1>밤</h1>
						<NightTime />
					</div>
				)}
			</div>
		);
	}
}

Game.propTypes = {
	gameOrder: PropTypes.string,
	setPeopleVoted: PropTypes.func.isRequired
};

export default useGame(({ state, actions }) => ({
	gameOrder: state.gameOrder,
	setPeopleVoted: actions.setPeopleVoted
}))(Game);
