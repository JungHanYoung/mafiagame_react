import React from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Object } from 'es6-shim';
import { JOB_NAME_OF_MAFIA } from '../../contants/Job';

class Result extends React.Component {

	get mafiaArray() {
		const { mafiaVotes } = this.props;

		return Object.values(mafiaVotes.toJS()).reduce(
			(prev, cur) => !!prev[cur] ? { ...prev, [cur]: prev[cur] + 1 } : { ...prev, [cur]: 1 }
			, {})
	}
	get saveSetByDoctor() {
		const { doctorVotes } = this.props;

		return new Set(Object.values(doctorVotes.toJS()))
	}

	get isRevoted() {

		const mafiaArray = this.mafiaArray

		let max = 0;
		let flag = false;
		for (let key in mafiaArray) {
			if (max < mafiaArray[key]) {
				max = mafiaArray[key]
				flag = false
			} else if (max === mafiaArray[key]) {
				flag = true
			}
		}

		return flag
	}

	get killPersonName() {
		const savePeople = this.saveSetByDoctor
		const mafiaArray = this.mafiaArray
		const killPersonName = Object.keys(mafiaArray).reduce((acc, cur) => {
			return mafiaArray[acc] < mafiaArray[cur] ? cur : acc
		})
		return savePeople.has(killPersonName)
			? null : killPersonName
	}

	get isMafiaVictory() {
		const killPersonName = this.killPersonName
		if (killPersonName) {
			const { players } = this.props
			const after = players
				.filter(player => player.get('name') !== killPersonName)

			const mafias = after.filter(player => player.get('jobName') === JOB_NAME_OF_MAFIA)
			const citizens = after.filter(player => player.get('jobName') !== JOB_NAME_OF_MAFIA)
			if (mafias.size >= citizens.size) {
				return true
			}
			// else if(mafias.size === 0) {
			// 	return 'citizen'
			// }
		}
		return false;
	}

	handleKillAndNext = () => {
		const { changeDayAndNight, deletePlayer } = this.props
		deletePlayer(this.killPersonName)
		changeDayAndNight()
	}

	render() {
		const { changeDayAndNight, voteAgain, moveToMain } = this.props
		const { killPersonName, isRevoted, isMafiaVictory } = this
		return (
			<>
				{isRevoted ? (
					<>
						<div className="game-content">
							<p className="content-description">밤 투표 결과</p>
							<h4>마피아 투표가 동률이 났습니다.</h4>
							<button className="btn-lg" onClick={changeDayAndNight}>낮으로 갑니다.</button>
							<button className="btn-lg" onClick={voteAgain}>재투표로 갑니다.</button>
						</div>
					</>
				) : isMafiaVictory ? (
					<>
						<div className="game-content">
							<p className="content-description">밤 투표 결과</p>
							<h4>마피아가 {killPersonName}님을 죽였습니다.</h4>
							<h3>마피아가 승리하였습니다.</h3>
						</div>
						<button
							className="btn-lg"
							onClick={moveToMain}>메인으로</button>
					</>

				) : <>
							<div className="game-content">
								<p className="content-description">밤 투표 결과</p>
								{killPersonName ? (
									<h4>마피아가 {killPersonName}님을 죽였습니다.</h4>
								) : (
										<h4>마피아가 시민을 죽이지 못하였습니다.</h4>
									)}
							</div>
							<button
								className="btn-lg"
								onClick={this.handleKillAndNext}>낮으로 갑니다.</button>
						</>}
			</>

		);
	}
}
// 마피아는 <누구>를 죽이고 의사는 사람을 살리지 못하였습니다.
// 마피아는 <누구>를 죽였이려 하였으나 의사가 살렸습니다.

Result.propTypes = {
	mafiaVotes: ImmutablePropTypes.map,
	doctorVotes: ImmutablePropTypes.map,
	players: ImmutablePropTypes.list,
	changeDayAndNight: PropTypes.func.isRequired,
	deletePlayer: PropTypes.func.isRequired,
	voteAgain: PropTypes.func.isRequired,
	moveToMain: PropTypes.func.isRequired
};

export default withRouter(Result)
