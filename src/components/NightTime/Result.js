import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';
import { Object } from 'es6-shim';
import WhetherVictory from '../common/WhetherVictory';
import { JOB_NAME_OF_DOCTOR } from '../../contants/Job';

class Result extends React.Component {
	constructor(props) {
		super(props);
		const { mafiaVotes, doctorVotes } = props;

		const votedPeopleToMafia = Object.keys(mafiaVotes);
		const votedPeopleToDoctor = Object.keys(doctorVotes);
		this.state = {
			doMafiaKill: votedPeopleToMafia.length === 1,
			doDoctorSave: votedPeopleToDoctor.length === 1,
			nameVotedByMafia: votedPeopleToMafia[0],
			nameVotedByDoctor: votedPeopleToDoctor[0]
		};
	}
	componentWillMount() {
		this.props.resultAtNight();
	}
	render() {
		const { doMafiaKill, doDoctorSave, nameVotedByMafia, nameVotedByDoctor } = this.state;
		const { players } = this.props;
		const existsDoctor = players.filter((player) => player.jobName === JOB_NAME_OF_DOCTOR).length > 0;
		return (
			<Fragment>
				<span>밤 투표 결과</span>
				{doMafiaKill && doDoctorSave ? (
					<Fragment>
						{nameVotedByDoctor === nameVotedByMafia ? (
							<div>의사가 마피아로부터 {nameVotedByDoctor}님을 살렸습니다.</div>
						) : (
							<div>마피아는 {nameVotedByMafia}를 죽이고, 의사는 살리지 못하였습니다.</div>
						)}
					</Fragment>
				) : (
					<Fragment>
						{doMafiaKill ? <div>마피아가 {nameVotedByMafia}를 죽였습니다.</div> : <div>마피아들의 의견이 일치하지 않았습니다.</div>}
						{doDoctorSave ? (
							<div>의사들의 의견이 일치하지 않았습니다.</div>
						) : existsDoctor ? (
							<div>의사가 {nameVotedByDoctor}를 살렸습니다.</div>
						) : null}
					</Fragment>
				)}
				<WhetherVictory />
			</Fragment>
		);
	}
}
// 마피아는 <누구>를 죽이고 의사는 사람을 살리지 못하였습니다.
// 마피아는 <누구>를 죽였이려 하였으나 의사가 살렸습니다.

Result.propTypes = {
	players: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			daytimeVoted: PropTypes.number,
			jobName: PropTypes.string.isRequired,
			code: PropTypes.number
		})
	),
	mafiaVotes: PropTypes.shape({
		[PropTypes.string]: PropTypes.number
	}),
	doctorVotes: PropTypes.shape({
		[PropTypes.string]: PropTypes.number
	}),
	resultAtNight: PropTypes.func.isRequired
};

export default useGame(({ state, actions }) => ({
	players: state.players,
	mafiaVotes: state.mafiaVotes,
	doctorVotes: state.doctorVotes,
	resultAtNight: actions.resultAtNight
}))(Result);
