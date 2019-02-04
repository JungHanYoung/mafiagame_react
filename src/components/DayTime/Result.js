import React from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';
import { JOB_NAME_OF_CITIZEN, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE } from '../../contants/Job';

class Result extends React.Component {
	render() {
		const { dayTimeVotedPerson, isReVoted } = this.props;
		return (
			<>
				<h2>투표 결과</h2>
				{isReVoted ? <p className="content-description">투표가 동률이 났습니다.</p>

					: <p className="content-description"><span style={{ color: "#ff0000" }}>{dayTimeVotedPerson.name}</span> 님이 죽으셨습니다.</p>}
			</>
		);
	}
}

Result.propTypes = {
	isReVoted: PropTypes.bool.isRequired,
	dayTimeVotedPerson: PropTypes.shape({
		code: PropTypes.number,
		daytimeVoted: PropTypes.number.isRequired,
		jobName: PropTypes.oneOf([JOB_NAME_OF_CITIZEN, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE])
			.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired
};

export default useGame(({ state, actions }) => ({
	isReVoted: state.isReVoted,
	dayTimeVotedPerson: state.dayTimeVotedPerson
}))(Result);
