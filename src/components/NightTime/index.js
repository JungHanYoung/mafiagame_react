import React from 'react';

// Component
import Mafia from './MafiaVoteTime';
import Doctor from './Doctor';
import Police from './Police';
import { useGame } from '../../context/GameContext';

class Night extends React.Component {
	render() {
		const { nightTimeOrder } = this.props;
		return (
			<div>
				{nightTimeOrder === 'mafia' && <Mafia />}
				{nightTimeOrder === 'doctor' && <Doctor />}
				{nightTimeOrder === 'police' && <Police />}
			</div>
		);
	}
}

export default useGame(({ state, actions }) => ({
	nightTimeOrder: state.nightTimeOrder
}))(Night);
