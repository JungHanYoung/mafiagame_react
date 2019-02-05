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
				<h1>당신은 시민입니다.</h1>
				<button
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
