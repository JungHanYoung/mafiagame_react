import React from 'react';
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Component
import Mafia from './Mafia';
import Doctor from './Doctor';
import Police from './Police';
import Citizen from './Citizen';
import Result from './Result';
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN } from '../../contants/Job';


class Night extends React.Component {
	constructor(props) {
		super(props)

		const { players } = this.props;

		this.state = {
			confirmed: false,
			nightTimeOrder: 0,
			isEndVote: false,
			mafiaVotes: players
				.filter(player => player.get('jobName') === JOB_NAME_OF_MAFIA)
				.reduce((acc, cur) => acc.set(cur.get('name'), ''), Map({})),
			doctorVotes: players
				.filter(player => player.get('jobName') === JOB_NAME_OF_DOCTOR)
				.reduce((acc, cur) => acc.set(cur.get('name'), ''), Map({})),
			revoted: false
		}
	}

	changeNightTimeOrder = () => {
		const { nightTimeOrder } = this.state;
		const { players } = this.props
		if (players.size - 1 === nightTimeOrder) {
			this.setState({
				isEndVote: true
			})
		} else {
			this.setState({
				nightTimeOrder: nightTimeOrder + 1
			})
		}
	}

	toggleConfirmed = () => {
		this.setState(state => ({
			confirmed: !state.confirmed
		}))
	}

	voteByMafia = (mafia) => (name) => {
		const { mafiaVotes } = this.state
		this.setState({
			mafiaVotes: mafiaVotes.set(mafia, name)
		})
	}

	voteByDoctor = (voter) => (name) => {
		const { doctorVotes } = this.state
		this.setState({
			doctorVotes: doctorVotes.set(voter, name)
		})
	}

	voteAgain = () => {

		const { players } = this.props;

		this.setState({
			confirmed: false,
			nightTimeOrder: 0,
			mafiaVotes: players
				.filter(player => player.get('jobName') === JOB_NAME_OF_MAFIA)
				.reduce((acc, cur) => acc.set(cur.get('name'), ''), Map({})),
			isEndVote: false,
			revoted: true
		})
	}

	render() {
		const { confirmed, nightTimeOrder, isEndVote, mafiaVotes, doctorVotes, revoted } = this.state;
		const { players, changeDayAndNight, deletePlayer, moveToResult } = this.props;

		return (
			<>
				{isEndVote ? (
					<Result
						mafiaVotes={mafiaVotes}
						doctorVotes={doctorVotes}
						deletePlayer={deletePlayer}
						changeDayAndNight={changeDayAndNight}
						voteAgain={this.voteAgain}
						players={players}
						moveToResult={moveToResult}
					/>
				) : (
						<>
							{confirmed ? (
								<>
									{players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_MAFIA ? (
										<Mafia
											players={players}
											mafiaVotes={mafiaVotes}
											handleVote={this.voteByMafia(players.getIn([nightTimeOrder, 'name']))}
											toggleConfirmed={this.toggleConfirmed}
											changeNightTimeOrder={this.changeNightTimeOrder}
										/>
									) : players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_POLICE ? (
										<Police
											players={players}
											me={players.get(nightTimeOrder)}
											toggleConfirmed={this.toggleConfirmed}
											changeNightTimeOrder={this.changeNightTimeOrder}
											revoted={revoted}
										/>
									) : players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_DOCTOR ? (
										<Doctor
											players={players}
											handleVote={this.voteByDoctor(players.getIn([nightTimeOrder, 'name']))}
											toggleConfirmed={this.toggleConfirmed}
											changeNightTimeOrder={this.changeNightTimeOrder}
											revoted={revoted}
										/>
									) : players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_CITIZEN ? (
										<Citizen
											toggleConfirmed={this.toggleConfirmed}
											changeNightTimeOrder={this.changeNightTimeOrder}
										/>
									) : null}
								</>
							) : (
									<>
										<div className="game-content">
											<h1>{players.getIn([nightTimeOrder, 'name'])}의 차례입니다.</h1>
										</div>
										<button
											className="btn-lg"
											onClick={this.toggleConfirmed}>역할 확인</button>
									</>
								)}
						</>
					)}


				{/* {nightTimeOrder === 'mafia' && <Mafia />}
					{nightTimeOrder === 'doctor' && <Doctor />}
					{nightTimeOrder === 'police' && <Police />}
					{nightTimeOrder === 'result' && <Result />} */}
			</>
		);
	}
}

Night.propTypes = {
	players: ImmutablePropTypes.list,
	changeDayAndNight: PropTypes.func.isRequired,
	deletePlayer: PropTypes.func.isRequired,
	moveToResult: PropTypes.func.isRequired
	// isEndVoteNight: PropTypes.bool.isRequired,
	// nightTimeOrder: PropTypes.number.isRequired
};

export default Night
