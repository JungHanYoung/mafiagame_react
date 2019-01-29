import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';
import WhetherVictory from '../common/WhetherVictory';
import { JOB_NAME_OF_DOCTOR } from '../../contants/Job';

class Result extends React.Component {
	componentWillMount() {
		this.props.resultAtNight();
	}
	render() {
		const { players, killed } = this.props;
		const existsDoctor = players.filter((player) => player.jobName === JOB_NAME_OF_DOCTOR).length > 0;
		return (
			<Fragment>
				<span>밤 투표 결과</span>
				{!!killed
					? (
						<div>
							마피아는 {killed}를 죽{existsDoctor ? `이고, 의사는 살리지 못하였습니다.` : `였습니다.`}
						</div>
					) : (
						<div>의사가 마피아로부터 시민을 살렸습니다.</div>
					)}
				{/*doMafiaKill && doDoctorSave ? 
				//  1. 마피아의 의견이 일치하였고
				//  2. 의사의 의견이 일치하였다.
				(
					
					<Fragment>
						{nameVotedByDoctor === nameVotedByMafia ? (
							<div>의사가 마피아로부터 {nameVotedByDoctor}님을 살렸습니다.</div>
						) : (
							<div>
								마피아는 {nameVotedByMafia}를 죽{existsDoctor ? `이고, 의사는 살리지 못하였습니다.` : `였습니다.`}
							</div>
						)}
					</Fragment>
				) : (
					// 1.마피아나 의사 둘 중 한 역할의 의견일치가 되지 않았을 때
					// -> 의사가 살린 사람은 보여지지 않아야
					<Fragment>
						{doMafiaKill ? (
							<Fragment>
								<h3>마피아가 {nameVotedByMafia}를 죽였습니다.</h3>
								{!doDoctorSave && <h3>의사들의 의견이 일치하지 않았습니다.</h3>}
							</Fragment>
						) : (
							// 마피아의 의견이 일치하지 않았다.
							<div>마피아들의 의견이 일치하지 않았습니다.</div>
						)}
					</Fragment>
				)*/}
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
	resultAtNight: actions.resultAtNight,
	//
	killed: state.killed
}))(Result);
