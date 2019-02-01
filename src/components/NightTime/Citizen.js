import React from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';

class Citizen extends React.Component {
	componentWillMount() {
	}
	handleSelectBtn = () => {
		const { handleConfirmAndCheck, nextOrder } = this.props;
		handleConfirmAndCheck();
		nextOrder();
	};
	render() {
		return (
			<>
				<h1>당신은 시민입니다.</h1>
				<button onClick={this.handleSelectBtn}>
					다음
				</button>
			</>
		);
	}
}

Citizen.propTypes = {
	// context
	nextOrder: PropTypes.func.isRequired,
	// parent
	handleConfirmAndCheck: PropTypes.func.isRequired
};

export default useGame(({ state, actions }) => ({
	nextOrder: actions.nextOrder
}))(Citizen);
