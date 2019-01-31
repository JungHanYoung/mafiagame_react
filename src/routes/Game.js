import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom'
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
		const { gameOrder, players } = this.props;

		return players.length > 0 ? (
			<div className="animated fadeInUp">
				{gameOrder === 'day-time' ? (
					<Fragment>
						<h1>낮</h1>
						<DayTime />
					</Fragment>
				) : (
						<Fragment>
							<h1>밤</h1>
							<NightTime />
						</Fragment>
					)}
			</div>
		) : <Redirect to="/setting" />;
	}
}

Game.propTypes = {
	gameOrder: PropTypes.string,
	setPeopleVoted: PropTypes.func.isRequired
};

export default useGame(({ state, actions }) => ({
	players: state.players,
	gameOrder: state.gameOrder,
	setPeopleVoted: actions.setPeopleVoted
}))(Game);
