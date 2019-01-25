import React from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';

class Citizen extends React.Component {
	state = {
		disableBtn: true
	};
	componentWillMount() {
		setTimeout(() => {
			this.setState({
				disableBtn: false
			});
		}, 1000);
	}
	handleSelectBtn = () => {
		const { handleConfirmAndCheck, nextOrder } = this.props;
		handleConfirmAndCheck();
		nextOrder();
	};
	render() {
		const { disableBtn } = this.state;
		return (
			<div>
				<h1>당신은 시민입니다.</h1>
				<button disabled={disableBtn} onClick={this.handleSelectBtn}>
					다음
				</button>
			</div>
		);
	}
}

Citizen.propTypes = {
	handleConfirmAndCheck: PropTypes.func.isRequired,
	nextOrder: PropTypes.func.isRequired
};

export default useGame(({ state, actions }) => ({
	nextOrder: actions.nextOrder
}))(Citizen);
