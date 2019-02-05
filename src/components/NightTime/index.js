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

	voteByMafia = (voter) => (name) => {
		const { mafiaVotes } = this.state
		this.setState({
			mafiaVotes: mafiaVotes.set(voter, name)
		})
	}

	voteByDoctor = (voter) => (name) => {
		const { doctorVotes } = this.state
		this.setState({
			doctorVotes: doctorVotes.set(voter, name)
		})
	}

	render() {
		const { confirmed, nightTimeOrder, isEndVote } = this.state;
		const { players, changeDayAndNight } = this.props;

		return (
			<>
				{isEndVote ? (
					<Result
						changeDayAndNight={changeDayAndNight}
						players={players}
					/>
				) : (
						<>
							<h1>{players.getIn([nightTimeOrder, 'name'])}의 차례입니다.</h1>
							{confirmed ? (
								<>
									{players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_MAFIA ? (
										<Mafia
											players={players}
											handleVote={this.voteByMafia(players.getIn([nightTimeOrder, 'name']))}
											toggleConfirmed={this.toggleConfirmed}
											changeNightTimeOrder={this.changeNightTimeOrder}
										/>
									) : players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_POLICE ? (
										<Police
											players={players}
											toggleConfirmed={this.toggleConfirmed}
											changeNightTimeOrder={this.changeNightTimeOrder}
										/>
									) : players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_DOCTOR ? (
										<Doctor
											players={players}
											handleVote={this.voteByDoctor(players.getIn([nightTimeOrder, 'name']))}
											toggleConfirmed={this.toggleConfirmed}
											changeNightTimeOrder={this.changeNightTimeOrder}
										/>
									) : players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_CITIZEN ? (
										<Citizen
											toggleConfirmed={this.toggleConfirmed}
											changeNightTimeOrder={this.changeNightTimeOrder}
										/>
									) : null}
								</>
							) : (
									<button onClick={this.toggleConfirmed}>역할 확인</button>
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
	changeDayAndNight: PropTypes.func.isRequired
	// isEndVoteNight: PropTypes.bool.isRequired,
	// nightTimeOrder: PropTypes.number.isRequired
};

export default Night
