import React from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';

class Citizen extends React.Component {
	handleSelectBtn = () => {
		const { toggleConfirmed, changeNightTimeOrder } = this.props;
		toggleConfirmed()
		changeNightTimeOrder()
	};
	render() {
		return (
			<>
				<Layout describe={`당신은 시민입니다.`} />
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
