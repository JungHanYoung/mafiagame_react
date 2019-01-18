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
		const { people, votePersonAtMafiaTime } = this.props;
		return isGuideLetter ? (
			<div>
				GuideLetter<button onClick={this.endGuideLetter} />
			</div>
		) : (
			<div>
				{people
					.filter((person) => {
						return person.jobName !== 'MAFIA';
					})
					.map((person) => <button onClick={() => votePersonAtMafiaTime(person.name)}>{person.name}</button>)}
			</div>
		);
	}
}

export default useGame(({ state, actions }) => ({
	people: state.people,
	votePersonAtMafiaTime: actions.votePersonAtMafiaTime
}))(MafiaVoteTime);
