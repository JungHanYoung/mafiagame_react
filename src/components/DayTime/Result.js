import React from 'react';
import { useGame } from '../../context/GameContext';

class Result extends React.Component {
	state = {
		victory: ''
	};
	componentWillMount() {
		const { people, isEndGame } = this.props;
		if (isEndGame) {
			const mafias = people.filter((person) => {
				return person.jobName === 'MAFIA';
			});
			if (mafias.length > 0) {
				this.setState({
					victory: 'mafia'
				});
			} else {
				this.setState({
					victory: 'citizen'
				});
			}
		}
	}
	render() {
		const { victory } = this.state;
		const { dayTimeVotedPerson, isEndGame } = this.props;
		return (
			<div>
				<h1>낮투표 결과</h1>
				<h2>{dayTimeVotedPerson.name}님이 죽으셨습니다.</h2>
				{isEndGame && (
					<div>
						{victory === 'mafia' ? (
							<span>마피아가 승리하였습니다.</span>
						) : victory === 'citizen' ? (
							<span>시민이 승리하였습니다!</span>
						) : null}
						{/* <button onClick={}></button> */}
					</div>
				)}
			</div>
		);
	}
}

export default useGame(({ state, actions }) => ({
	isEndGame: state.isEndGame,
	people: state.people,
	dayTimeVotedPerson: state.dayTimeVotedPerson
}))(Result);
