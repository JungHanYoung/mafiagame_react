import React from 'react';

// 컴포넌트
import DayTimeDiscuss from '../components/DayTimeDiscuss';
import VoteTime from '../components/VoteTime';
import MafiaVoteTime from '../components/MafiaVoteTime';
import Police from '../components/Police';
import Doctor from '../components/Doctor';

const SwitchingButton = ({ order, orderChange }) => {
	switch (order) {
		case 0:
			return <button onClick={orderChange}>투표 고고</button>;
		case 1:
			return <button onClick={orderChange}>투표 마침... 밤으로</button>;
		case 2:
			return <button onClick={orderChange}>마피아 투표 끝</button>;
		case 3:
			return <button onClick={orderChange}>경찰 수색 끝</button>;
		case 4:
			return <button onClick={orderChange}>의사 끝</button>;
		default:
			return null;
	}
};

class Start extends React.Component {
	state = {
		// 0: 낮 토론, 1: 낮 투표, 2: 밤 - 마피아, 3: 밤 - 의사, 4: 밤 - 경찰, 5: ....
		order: 0,
		killed: ''
	};

	handlerOrderChange = () => {
		const { order } = this.state;
		if (order < 4) {
			this.setState({
				order: order + 1
			});
		} else {
			this.setState({
				order: 0
			});
		}
	};

	render() {
		const { order } = this.state;
		const { people } = this.state;

		console.table(people);

		return (
			<div className="animated fadeInUp">
				{order <= 1 ? <h1>낮</h1> : <h1>밤</h1>}
				<div>
					{/* <SwitchOrderComponent order={order} /> */}

					{order === 0 ? (
						<DayTimeDiscuss order={order} />
					) : order === 1 ? (
						<VoteTime order={order} />
					) : order === 2 ? (
						<MafiaVoteTime />
					) : order === 3 ? (
						<Police />
					) : order === 4 ? (
						<Doctor />
					) : (
						<div>rendering Error</div>
					)}
					<SwitchingButton order={order} orderChange={this.handlerOrderChange} />
				</div>
			</div>
		);
	}
}

export default Start;
