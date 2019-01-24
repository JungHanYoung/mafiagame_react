import React from 'react';
import { useGame } from '../../context/GameContext';

class Result extends React.Component {
	render() {
		const { votedByMafia, votedByDoctor, setDayTime } = this.props;
		return (
			<div>
				<span>밤 투표 결과</span>
				{votedByMafia === votedByDoctor ? (
					<div>
						<div>의사가 마피아로부터 {votedByMafia}를 살렸습니다.</div>
					</div>
				) : (
					<div>마피아는 {votedByMafia}를 죽였고, 의사는 살리지 못하였습니다.</div>
				)}

				<button onClick={setDayTime}>낮이 됩니다.</button>
			</div>
		);
	}
}
// 마피아는 <누구>를 죽이고 의사는 사람을 살리지 못하였습니다.
// 마피아는 <누구>를 죽였이려 하였으나 의사가 살렸습니다.

export default useGame(({ state, actions }) => ({
	votedByMafia: state.votedByMafia,
	votedByDoctor: state.votedByDoctor,
	setDayTime: actions.setDayTime
}))(Result);
