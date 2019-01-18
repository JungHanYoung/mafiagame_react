import React from 'react';

// Component
import Mafia from './MafiaVoteTime';
import Doctor from './Doctor';
import Police from './Police';

class Night extends React.Component {
	render() {
		return (
			<div>
				<Mafia />
				<Doctor />
				<Police />
			</div>
		);
	}
}

export default Night;
