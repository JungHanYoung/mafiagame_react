import React from 'react';
import PropTypes from 'prop-types';

class Citizen extends React.Component {
	handleSelectBtn = () => {
		const { toggleConfirmed, changeNightTimeOrder } = this.props;
		toggleConfirmed()
		changeNightTimeOrder()
	};
	render() {
		return (
			<>
				<div className="game-content">
					<p className="content-description">
						당신은 시민입니다.
					</p>
				</div>
				<button
					className="btn-lg"
					onClick={this.handleSelectBtn}>
					다음
					</button>
			</>
		);
	}
}

Citizen.propTypes = {
	toggleConfirmed: PropTypes.func.isRequired,
	changeNightTimeOrder: PropTypes.func.isRequired
};

export default Citizen
