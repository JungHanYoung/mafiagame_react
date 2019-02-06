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
	handleNext = () => {
		const { toggleConfirmed, changeNightTimeOrder } = this.props
		toggleConfirmed()
		changeNightTimeOrder()
	}
	render() {
		const { players, revoted } = this.props;

		return (
			<>
				<h1>당신은 의사입니다.</h1>
				{revoted ?
					(
						<div>
							<h3>재투표 중입니다. 이전의 선택한 결과가 그대로 갈 것입니다.</h3>
							<button onClick={this.handleNext}>다음</button>
						</div>
					)
					:
					<>
						<h2>누구를 살릴지 선택을 하세요.</h2>
						{players.map((person, i) => (
							<button key={`doctor-select-${i}`} onClick={() => this.handleSelectBtn(person.get('name'))}>
								{person.get('name')}
							</button>
						))}
					</>
				}
			</>
		);
	}
}

Doctor.propTypes = {
	players: ImmutablePropTypes.list,
	handleVote: PropTypes.func.isRequired,
	toggleConfirmed: PropTypes.func.isRequired,
	changeNightTimeOrder: PropTypes.func.isRequired,
	revoted: PropTypes.bool.isRequired
};

export default Doctor
