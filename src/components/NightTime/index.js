import React from 'react';

// Component
import Mafia from './MafiaVoteTime';
import Doctor from './Doctor';
import Police from './Police';
import Result from './Result';
import { useGame } from '../../context/GameContext';

class Night extends React.Component {
	render() {
		const { nightTimeOrder } = this.props;
		return (
			<div className="App-header">
				{nightTimeOrder === 'mafia' && <Mafia />}
				{nightTimeOrder === 'doctor' && <Doctor />}
				{nightTimeOrder === 'police' && <Police />}
				{nightTimeOrder === 'result' && <Result />}
			</div>
		);
	}
}

export default useGame(({ state, actions }) => ({
	nightTimeOrder: state.nightTimeOrder
}))(Night);
