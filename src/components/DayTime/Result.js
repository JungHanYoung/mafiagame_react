import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { JOB_NAME_OF_MAFIA } from '../../contants/Job';

class Result extends React.Component {

	get isReVoted() {

		const { players } = this.props

		const maxNumOfVotes = players.reduce((max, cur) => max.get('daytimeVoted') > cur.get('daytimeVoted') ? max : cur).get('daytimeVoted')

		const maxOfVotesPlayers = players.filter(player => player.get('daytimeVoted') === maxNumOfVotes)

		return maxOfVotesPlayers.size !== 1
	}

	get votedPerson() {
		const { players } = this.props;

		return players.reduce((max, cur) => max.get('daytimeVoted') < cur.get('daytimeVoted') ? cur : max)
	}

	get isVictory() {
		const { players } = this.props;

		const after = players
			.filter(player => player.get('name') !== this.votedPerson.get('name'))

		// console.log(after);

		const mafiaSize = after
			.filter(player => player.get('jobName') === JOB_NAME_OF_MAFIA)
			.size
		const citizenSize = after
			.filter(player => player.get('jobName') !== JOB_NAME_OF_MAFIA)
			.size

		if (mafiaSize >= citizenSize) {
			return 'mafia'
		} else if (mafiaSize === 0) {
			return 'citizen'
		} else {
			return null
		}
	}

	changeAtDay = () => {
		const { changeDayTimeOrder, deletePlayer } = this.props;
		const { isReVoted } = this
		changeDayTimeOrder()
		if (!isReVoted)
			deletePlayer(this.votedPerson.get('name'))
	}

	render() {

		const { moveRevote, moveToResult } = this.props
		const { isReVoted } = this

		// console.log(isVictory)

		return (
			<main className="sunset">
				<h2 className="game-title">hello mafia</h2>
				<div className="game-content">
					<h2 className="subject" data-testid="game-content-description">투표 결과</h2>

					{isReVoted ? <p className="content-description">투표가 동률이 났습니다.</p>
						: <p className="content-description"><span className="voted-person">{this.votedPerson.get('name')}</span> 님이 죽으셨습니다.</p>}

					{this.isVictory === 'mafia'
						?
						<>
							<h3>마피아가 승리하였습니다.</h3>
							<button
								className="btn-lg"
								onClick={moveToResult}>결과화면</button>
						</>
						: this.isVictory === 'citizen'
							? <>
								<h3>시민이 승리하였습니다.</h3>
								<button
									className="btn-lg"
									onClick={moveToResult}>결과화면</button>
							</>
							: isReVoted
								? <>
									<button
										className="btn-lg"
										onClick={moveRevote}>재투표</button>
									<button
										className="btn-lg"
										onClick={this.changeAtDay}>밤이됩니다.</button>
								</>
								: <button
									className="btn-lg"
									onClick={this.changeAtDay}>밤이 됩니다.</button>}
				</div>
			</main>
		);
	}
}

Result.propTypes = {
	players: ImmutablePropTypes.list,
	changeDayTimeOrder: PropTypes.func.isRequired,
	deletePlayer: PropTypes.func.isRequired,
	moveToResult: PropTypes.func.isRequired,
	moveRevote: PropTypes.func.isRequired
};

export default Result
