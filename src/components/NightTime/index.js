import React, { useState } from 'react';
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
	render() {
		const { players, isEndVoteNight, setIsEndVoteAtNight } = this.props;
		const [nightTimeOrder, setNightTimeOrder] = useState(0);
		const [confirmed, setConfirmed] = useState(false);

		return (
			<>
				{isEndVoteNight ? (
					<Result />
				) : (
						<>
							<h1>{players[nightTimeOrder].name}의 차례입니다.</h1>
							{confirmed ? (
								<>
									{players[nightTimeOrder].jobName === JOB_NAME_OF_MAFIA ? (
										<Mafia
											handleConfirmAndCheck={() => setConfirmed(false)}
											nextOrder={nightTimeOrder === 3 ? setIsEndVoteAtNight().then(setNightTimeOrder) : setNightTimeOrder(nightTimeOrder + 1)}
										/>
									) : players[nightTimeOrder].jobName === JOB_NAME_OF_POLICE ? (
										<Police
											handleConfirmAndCheck={() => setConfirmed(false)}
											nextOrder={nightTimeOrder === 3 ? setIsEndVoteAtNight().then(setNightTimeOrder) : setNightTimeOrder(nightTimeOrder + 1)}
										/>
									) : players[nightTimeOrder].jobName === JOB_NAME_OF_DOCTOR ? (
										<Doctor
											handleConfirmAndCheck={() => setConfirmed(false)}
											nextOrder={nightTimeOrder === 3 ? setIsEndVoteAtNight().then(setNightTimeOrder) : setNightTimeOrder(nightTimeOrder + 1)}
										/>
									) : players[nightTimeOrder].jobName === JOB_NAME_OF_CITIZEN ? (
										<Citizen
											handleConfirmAndCheck={() => setConfirmed(false)}
											nextOrder={nightTimeOrder === 3 ? setIsEndVoteAtNight().then(setNightTimeOrder) : setNightTimeOrder(nightTimeOrder + 1)}
										/>
									) : null}
								</>
							) : (
									<button onClick={() => setConfirmed(true)}>역할 확인</button>
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
	setIsEndVoteAtNight: actions.setIsEndVoteAtNight
}))(Night);
