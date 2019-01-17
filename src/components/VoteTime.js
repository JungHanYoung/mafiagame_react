import React from 'react';
import { useGame } from '../context/GameContext';

class VoteTime extends React.Component {
	state = {
		voteOrder: 0
	};
	handleVote = (name) => {
		const { votePerson } = this.props;
		const { voteOrder } = this.state;
		this.setState({
			voteOrder: voteOrder + 1
		});
		votePerson(name);
	};
	render() {
		const { voteOrder } = this.state;
		const { people } = this.props;
		return (
			<div>
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
	people: state.people
}))(VoteTime);
