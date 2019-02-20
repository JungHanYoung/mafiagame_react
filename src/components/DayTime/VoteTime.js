import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';


class VoteTime extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			voteOrder: 0
		}
	}
	handleVote = (name) => {

		const { voteOrder } = this.state;
		const { votePerson, players, changeDayTimeOrder } = this.props
		votePerson(name)
		if (players.size - 1 === voteOrder) {
			this.setState({
				voteOrder: 0
			})
			changeDayTimeOrder()
		} else {
			this.setState({
				voteOrder: voteOrder + 1
			})
		}

	};
	render() {
		const { voteOrder } = this.state;
		const { players } = this.props;

		return (
			<main className="daytime">
				<h2 className="game-title" data-testid="game-title">hello mafia</h2>
				<div className="game-content">
					<p className="content-description" data-testid="game-content-description">마피아로 의심되는 사람을 투표합니다.</p>
					<div className="voter">{players.getIn([voteOrder, 'name'])}님의 투표</div>
					<div className="vote-btn-container">
						<div>
							{players
								.filter((person, i) => i !== voteOrder)
								.map(person => (
									<button
										data-testid={`vote-button-${person.name}`}
										key={`vote-btn-${person.get('name')}`}
										onClick={() => this.handleVote(person.get('name'))}
										className="btn-sm"
									>
										{person.get('name')}
									</button>
								))
							}
						</div>
					</div>
				</div>
			</main>
		);
	}
}

VoteTime.propTypes = {
	votePerson: PropTypes.func.isRequired,
	players: ImmutablePropTypes.list,
	changeDayTimeOrder: PropTypes.func.isRequired
};

export default VoteTime
