import React from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import WhetherVictory from '../common/WhetherVictory';
import { JOB_NAME_OF_DOCTOR } from '../../contants/Job';
import { Object } from 'es6-shim';

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

	render() {
		const { players, killed } = this.props;
		const existsDoctor = players.filter((player) => player.jobName === JOB_NAME_OF_DOCTOR).length > 0;
		console.log(this.isRevoted)

		const { killPersonName, isRevoted } = this
		return (
			<>
				<span>밤 투표 결과</span>
				{isRevoted
					?
					<div>투표가 동률이 나 재투표를 실시합니다.</div>
					: killPersonName
						? (
							<div>마피아는 {killPersonName}를 죽였습니다.</div>
						) : (
							<div>마피아는 시민을 죽이지 못하였습니다.</div>
						)
				}
				<WhetherVictory />
			</>
		);
	}
}
// 마피아는 <누구>를 죽이고 의사는 사람을 살리지 못하였습니다.
// 마피아는 <누구>를 죽였이려 하였으나 의사가 살렸습니다.

Result.propTypes = {
	// players: PropTypes.arrayOf(
	// 	PropTypes.shape({
	// 		name: PropTypes.string.isRequired,
	// 		daytimeVoted: PropTypes.number,
	// 		jobName: PropTypes.string.isRequired,
	// 		code: PropTypes.number
	// 	})
	// ),
	// mafiaVotes: PropTypes.shape({
	// 	[PropTypes.string]: PropTypes.number
	// }),
	// doctorVotes: PropTypes.shape({
	// 	[PropTypes.string]: PropTypes.number
	// }),
	// resultAtNight: PropTypes.func.isRequired,
	// killed: PropTypes.string
	mafiaVotes: ImmutablePropTypes.map,
	players: ImmutablePropTypes.list
};

export default withRouter(Result)
