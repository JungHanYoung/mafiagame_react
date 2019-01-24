import React from 'react';
import { useGame } from '../../context/GameContext';

class MafiaVoteTime extends React.Component {
	state = {
		isGuideLetter: true
	};
	endGuideLetter = () => {
		this.setState({
			isGuideLetter: false
		});
	};
	render() {
		const { isGuideLetter } = this.state;
		const { players, votePersonAtMafiaTime } = this.props;
		return isGuideLetter ? (
			<div>
				<h1>밤이 되고 마피아가 움직입니다.</h1>
				<button onClick={this.endGuideLetter}>확인</button>
			</div>
		) : (
			<div>
				<h1>마피아는 죽일 사람을 상의하여 선택하시기 바랍니다.</h1>
				{players
					.filter((person) => {
						return person.jobName !== 'MAFIA';
					})
					.map((person, i) => (
						<button key={`mafia-select-${i}`} onClick={() => votePersonAtMafiaTime(person.name)}>
							{person.name}
						</button>
					))}
			</div>
		);
	}
}

export default useGame(({ state, actions }) => ({
	players: state.players,
	votePersonAtMafiaTime: actions.votePersonAtMafiaTime
}))(MafiaVoteTime);
