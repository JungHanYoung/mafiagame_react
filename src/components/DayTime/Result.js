import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';
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
		changeDayTimeOrder()
		deletePlayer(this.votedPerson.get('name'))
	}

	render() {

		return (
			<>
				<h1>투표 결과</h1>

				{this.isReVoted ? <h2>투표가 동률이 났습니다.</h2>
					: <h2>{this.votedPerson.get('name')}님이 죽으셨습니다.</h2>}
				<button onClick={this.changeAtDay}>밤이 됩니다.</button>

				{this.isVictory === 'mafia'
					? <h3>마피아가 승리하였습니다.</h3>
					: this.isVictory === 'citizen'
						? <h3>시민이 승리하였습니다.</h3>
						: null}
			</>
		);
	}
}

Result.propTypes = {
	// isReVoted: PropTypes.bool.isRequired,
	// dayTimeVotedPerson: PropTypes.shape({
	// 	code: PropTypes.number,
	// 	daytimeVoted: PropTypes.number.isRequired,
	// 	jobName: PropTypes.oneOf([JOB_NAME_OF_CITIZEN, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE])
	// 		.isRequired,
	// 	name: PropTypes.string.isRequired
	// }).isRequired
	players: ImmutablePropTypes.list,
	changeDayTimeOrder: PropTypes.func.isRequired,
	deletePlayer: PropTypes.func.isRequired
};

export default useGame(({ state, actions }) => ({
	isReVoted: state.isReVoted,
	dayTimeVotedPerson: state.dayTimeVotedPerson
}))(Result);
