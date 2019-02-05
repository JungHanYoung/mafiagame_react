import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'


class Doctor extends React.Component {
	handleSelectBtn = (name) => {
		const { handleVote, toggleConfirmed, changeNightTimeOrder } = this.props;
		toggleConfirmed()
		changeNightTimeOrder()
		handleVote(name)
	};
	render() {
		const { players } = this.props;

		return (
			<>
				<h1>당신은 의사입니다.</h1>
				<h2>누구를 살릴지 선택을 하세요.</h2>
				{players.map((person, i) => (
					<button key={`doctor-select-${i}`} onClick={() => this.handleSelectBtn(person.get('name'))}>
						{person.get('name')}
					</button>
				))}
			</>
		);
	}
}

Doctor.propTypes = {
	// // context
	// players: PropTypes.arrayOf(
	// 	PropTypes.shape({
	// 		name: PropTypes.string.isRequired,
	// 		daytimeVoted: PropTypes.number,
	// 		jobName: PropTypes.string.isRequired,
	// 		code: PropTypes.number
	// 	})
	// ),
	// votePersonAtDoctor: PropTypes.func.isRequired,
	// // parent
	// handleConfirmAndCheck: PropTypes.func.isRequired
	players: ImmutablePropTypes.list,
	handleVote: PropTypes.func.isRequired,
	toggleConfirmed: PropTypes.func.isRequired,
	changeNightTimeOrder: PropTypes.func.isRequired
};

export default Doctor
