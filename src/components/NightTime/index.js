import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// Component
import Mafia from './Mafia';
import Doctor from './Doctor';
import Police from './Police';
import Citizen from './Citizen';
import Result from './Result';
import { useGame } from '../../context/GameContext';
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN } from '../../contants/Job';

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
			<div className="App-header">
				{isEndVoteNight ? (
					<Result />
				) : (
					<Fragment>
						<h1>{players[nightTimeOrder].name}의 차례입니다.</h1>
						{confirmed ? (
							<Fragment>
								{players[nightTimeOrder].jobName === JOB_NAME_OF_MAFIA ? (
									<Mafia handleConfirmAndCheck={this.handleConfirmAndCheck} />
								) : players[nightTimeOrder].jobName === JOB_NAME_OF_POLICE ? (
									<Police handleConfirmAndCheck={this.handleConfirmAndCheck} />
								) : players[nightTimeOrder].jobName === JOB_NAME_OF_DOCTOR ? (
									<Doctor handleConfirmAndCheck={this.handleConfirmAndCheck} />
								) : players[nightTimeOrder].jobName === JOB_NAME_OF_CITIZEN ? (
									<Citizen handleConfirmAndCheck={this.handleConfirmAndCheck} />
								) : null}
							</Fragment>
						) : (
							<button onClick={this.handleConfirmAndCheck}>다음</button>
						)}
					</Fragment>
				)}
				{/* {nightTimeOrder === 'mafia' && <Mafia />}
				{nightTimeOrder === 'doctor' && <Doctor />}
				{nightTimeOrder === 'police' && <Police />}
				{nightTimeOrder === 'result' && <Result />} */}
			</div>
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
	nightTimeOrder: state.nightTimeOrder
}))(Night);
