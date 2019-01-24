import React from 'react';
import { useGame } from '../../context/GameContext';

class Result extends React.Component {
	render() {
		const { dayTimeVotedPerson, isEndGame, victory } = this.props;
		return (
			<div>
				<h1>낮투표 결과</h1>
				<h2>
					{dayTimeVotedPerson.jobName}인 {dayTimeVotedPerson.name}님이 죽으셨습니다.
				</h2>
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
	victory: state.victory,
	dayTimeVotedPerson: state.dayTimeVotedPerson
}))(Result);
