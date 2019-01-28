import React from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';
import { JOB_NAME_OF_CITIZEN, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE } from '../../contants/Job';

class Result extends React.Component {
	render() {
		const { dayTimeVotedPerson } = this.props;
		return (
			<div>
				<h1>투표 결과</h1>
				<h2>{dayTimeVotedPerson.name}님이 죽으셨습니다.</h2>
			</div>
		);
	}
}

Result.propTypes = {
	dayTimeVotedPerson: PropTypes.shape({
		code: PropTypes.number,
		daytimeVoted: PropTypes.number.isRequired,
		jobName: PropTypes.oneOf([ JOB_NAME_OF_CITIZEN, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE ])
			.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired
};

export default useGame(({ state, actions }) => ({
	dayTimeVotedPerson: state.dayTimeVotedPerson
}))(Result);
