import React from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';

class Result extends React.Component {
	render() {
		const { dayTimeVotedPerson } = this.props;
		return (
			<div>
				<h1>낮투표 결과</h1>
				<h2>
					{dayTimeVotedPerson.jobName}인 {dayTimeVotedPerson.name}님이 죽으셨습니다.
				</h2>
			</div>
		);
	}
}

Result.propTypes = {
	dayTimeVotedPerson: PropTypes.string.isRequired
};

export default useGame(({ state, actions }) => ({
	dayTimeVotedPerson: state.dayTimeVotedPerson
}))(Result);
