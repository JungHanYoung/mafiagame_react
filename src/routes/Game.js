import React from 'react';
import { useGame } from '../context/GameContext';

// 컴포넌트
import DayTime from '../components/DayTime';
import NightTime from '../components/NightTime';

const SwitchingButton = ({ order, orderChange }) => {
	switch (order) {
		case 0:
			return <button onClick={orderChange}>투표 고고</button>;
		case 1:
			return <button onClick={orderChange}>투표 마침... 밤으로</button>;
		case 2:
			return <button onClick={orderChange}>마피아 투표 끝</button>;
		case 3:
			return <button onClick={orderChange}>경찰 수색 끝</button>;
		case 4:
			return <button onClick={orderChange}>의사 끝</button>;
		default:
			return null;
	}
};

class Game extends React.Component {
	state = {
		// 0: 낮 토론, 1: 낮 투표, 2: 밤 - 마피아, 3: 밤 - 의사, 4: 밤 - 경찰, 5: ....
	};

	componentWillMount() {
		this.props.setPeopleVoted();
	}

	handlerOrderChange = () => {
		const { order } = this.state;

		order > 4
			? this.setState({
					order: 0
				})
			: this.setState({
					order: order + 1
				});
	};

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
