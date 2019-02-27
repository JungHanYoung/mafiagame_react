import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import Layout from './Layout';


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
				{revoted ? (
					<>
						<Layout describe={`재투표 중입니다. 이전의 선택한 결과가 그대로 갈 것입니다.`} />
						<button
							className="btn-lg"
							onClick={this.handleNext}>다음</button>
					</>) : (
						<Layout describe={`당신은 의사입니다.
						누구를 살릴지 선택을 하세요.`}>
							<div className="vote-btn-container">
								<div>
									{players.map((person, i) => (
										<button
											key={`doctor-select-${i}`}
											onClick={() => this.handleSelectBtn(person.get('name'))}
											className="btn-sm"
										>
											{person.get('name')}
										</button>
									))}
								</div>
							</div>
						</Layout>
					)
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
