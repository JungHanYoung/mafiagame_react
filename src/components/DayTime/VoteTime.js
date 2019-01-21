import React from 'react';
import { useGame } from '../../context/GameContext';

class VoteTime extends React.Component {
	state = {
		voteOrder: 0
	};
	handleVote = (name) => {
		const { votePerson, people, endVoteTime } = this.props;
		const { voteOrder } = this.state;
		if (voteOrder < people.length - 1) {
			this.setState({
				voteOrder: voteOrder + 1
			});
			votePerson(name);
		} else {
			endVoteTime();
		}
	};
	render() {
		const { voteOrder } = this.state;
		const { people } = this.props;

		return (
			<div>
				<h1>마피아로 의심되는 사람을 투표합니다.</h1>
				<div>{people[voteOrder].name}님의 투표</div>
				<div>
					{people.map((person, i) => {
						if (i === voteOrder) {
							return null;
						} else {
							return (
								<button key={`vote-btn-${i}`} onClick={() => this.handleVote(person.name)}>
									{person.name}
								</button>
							);
						}
					})}
				</div>
			</div>
		);
	}
}

export default useGame(({ state, actions }) => ({
	votePerson: actions.votePerson,
	endVoteTime: actions.endVoteTime,
	people: state.people
}))(VoteTime);
