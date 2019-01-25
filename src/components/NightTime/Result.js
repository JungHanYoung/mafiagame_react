import React, { Fragment } from 'react';
import { useGame } from '../../context/GameContext';
import { Object } from 'es6-shim';

class Result extends React.Component {
	render() {
		const { mafiaVotes, doctorVotes, setDayTime } = this.props;

		const votedPeopleToMafia = Object.keys(mafiaVotes);
		const votedPeopleToDoctor = Object.keys(doctorVotes);
		console.log(votedPeopleToMafia);
		console.log(votedPeopleToDoctor);
		return (
			<div>
				<span>밤 투표 결과</span>
				{votedPeopleToMafia.length === 1 && votedPeopleToDoctor.length === 1 ? (
					<Fragment>
						{votedPeopleToDoctor[0] === votedPeopleToMafia[0] ? (
							<div>의사가 마피아로부터 {votedPeopleToDoctor[0]}님을 살렸습니다.</div>
						) : (
							<div>마피아는 {votedPeopleToMafia[0]}를 죽이고, 의사는 살리지 못하였습니다.</div>
						)}
					</Fragment>
				) : (
					<Fragment>
						{votedPeopleToMafia !== 1 ? (
							<div>마피아들의 의견이 일치하지 않았습니다.</div>
						) : (
							<div>마피아가 {votedPeopleToMafia[0]}를 죽였습니다.</div>
						)}
						{votedPeopleToDoctor !== 1 ? (
							<div>의사들의 의견이 일치하지 않았습니다.</div>
						) : (
							<div>의사가 {votedPeopleToDoctor[0]}를 살렸습니다.</div>
						)}
					</Fragment>
				)}
				{/* {votedPeopleToMafia.length === 1
				&& votedPeopleToDoctor.length === 1
				&& votedPeopleToMafia[0] === votedPeopleToDoctor[0]
				? <div>마피아는 {votedPeopleToMafia[0]}를 죽였고, 의사는 살리지 못하였습니다.</div> : null} */}
				{/* {votedByMafia === votedByDoctor ? (
					<div>
						<div>의사가 마피아로부터 {votedByMafia}를 살렸습니다.</div>
					</div>
				) : (
					<div>마피아는 {votedByMafia}를 죽였고, 의사는 살리지 못하였습니다.</div>
				)} */}

				<button onClick={setDayTime}>낮이 됩니다.</button>
			</div>
		);
	}
}
// 마피아는 <누구>를 죽이고 의사는 사람을 살리지 못하였습니다.
// 마피아는 <누구>를 죽였이려 하였으나 의사가 살렸습니다.

export default useGame(({ state, actions }) => ({
	mafiaVotes: state.mafiaVotes,
	doctorVotes: state.doctorVotes,
	setDayTime: actions.setDayTime
}))(Result);
