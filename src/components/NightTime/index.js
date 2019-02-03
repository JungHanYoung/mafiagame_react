import React from 'react';
import PropTypes from 'prop-types';
// Component
import Mafia from './Mafia';
import Doctor from './Doctor';
import Police from './Police';
import Citizen from './Citizen';
import Result from './Result';
import { useGame } from '../../context/GameContext';
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN } from '../../contants/Job';

const getButton = (jobName, { }) => {
	switch (jobName) {
		case JOB_NAME_OF_MAFIA:
			return <button></button>
		case JOB_NAME_OF_DOCTOR:
			return <button></button>
		case JOB_NAME_OF_POLICE:
			return <button></button>
		case JOB_NAME_OF_CITIZEN:
			return <button></button>
	}
}


class Night extends React.Component {
	state = {
		confirmed: false
	};
	handleConfirmAndCheck = () => {
		const { confirmed } = this.state;
		this.setState({
			confirmed: !confirmed
		});
	};
	render() {
		const { confirmed } = this.state;
		const { nightTimeOrder, players, isEndVoteNight } = this.props;

		return (
			<>

				{isEndVoteNight ? (
					<Result />
				) : (
						<>
							{confirmed ? (
								<>
									{players[nightTimeOrder].jobName === JOB_NAME_OF_MAFIA ? (
										<Mafia handleConfirmAndCheck={this.handleConfirmAndCheck} />
									) : players[nightTimeOrder].jobName === JOB_NAME_OF_POLICE ? (
										<Police handleConfirmAndCheck={this.handleConfirmAndCheck} />
									) : players[nightTimeOrder].jobName === JOB_NAME_OF_DOCTOR ? (
										<Doctor handleConfirmAndCheck={this.handleConfirmAndCheck} />
									) : players[nightTimeOrder].jobName === JOB_NAME_OF_CITIZEN ? (
										<Citizen handleConfirmAndCheck={this.handleConfirmAndCheck} />
									) : null}
								</>
							) : (
									<>
										<div className="container">
											<h2>{players[nightTimeOrder].name}의 차례입니다.</h2>
										</div>
										<button
											className="btn"
											onClick={this.handleConfirmAndCheck}>역할 확인</button>
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
	players: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			daytimeVoted: PropTypes.number,
			jobName: PropTypes.string,
			code: PropTypes.number
		})
	),
	isEndVoteNight: PropTypes.bool.isRequired,
	nightTimeOrder: PropTypes.number.isRequired
};

export default useGame(({ state, actions }) => ({
	players: state.players,
	isEndVoteNight: state.isEndVoteNight,
	nightTimeOrder: state.nightTimeOrder,
	//
	votePersonAtMafiaTime: actions.votePersonAtMafiaTime,
	nextOrder: actions.nextOrder,
	votePersonAtDoctor: actions.votePersonAtDoctor
}))(Night);
