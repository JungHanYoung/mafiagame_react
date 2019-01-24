import React from 'react';
import { useGame } from '../context/GameContext';

// 컴포넌트
import DayTime from '../components/DayTime';
import NightTime from '../components/NightTime';

class Game extends React.Component {
	componentWillMount() {
		this.props.setPeopleVoted();
	}

	render() {
		const { people, gameOrder } = this.props;

		console.log(people);

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

export default useGame(({ state, actions }) => ({
	people: state.people,
	gameOrder: state.gameOrder,
	setPeopleVoted: actions.setPeopleVoted
}))(Game);
