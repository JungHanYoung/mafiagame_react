import React from 'react';
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { JOB_NAME_OF_MAFIA } from '../../../contants/Job';

import Layout from './Layout'

class Result extends React.Component {

    get mafiaArray() {
        const { mafiaVotes } = this.props;

        return Object.values(mafiaVotes.toJS()).reduce(
            (prev, cur) => !!prev[cur] ? { ...prev, [cur]: prev[cur] + 1 } : { ...prev, [cur]: 1 }
            , {})
    }
    get saveSetByDoctor() {
        const { doctorVotes } = this.props;

        const set = new Set(Object.values(doctorVotes.toJS()))
        // console.log('doctor Set:', set)
        return set
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
        const killPersonName = Object.keys(mafiaArray).reduce((acc, cur) => mafiaArray[acc] < mafiaArray[cur] ? cur : acc)
        // console.log(killPersonName);
        // console.log(savePeople.has(killPersonName))
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
        }
        return false;
    }

    handleKillAndNext = () => {
        const { changeDayAndNight, deletePlayer } = this.props
        if (this.killPersonName) {
            deletePlayer(this.killPersonName)
        }
        changeDayAndNight()
    }

    render() {
        const { changeDayAndNight, voteAgain, moveToResult } = this.props
        const { killPersonName, isRevoted, isMafiaVictory } = this
        return isRevoted ?
            (<Layout describe={`투표 결과`}>
                <p className="night-describe">마피아 투표가 동률이 났습니다.</p>
                <button className="btn-lg" onClick={changeDayAndNight}>낮으로 갑니다.</button>
                <button className="btn-lg" onClick={voteAgain}>재투표로 갑니다.</button>
            </Layout>) : isMafiaVictory ? (
                <>
                    <Layout describe={`투표 결과`}>
                        <p className="night-describe">
                            마피아가&nbsp;
							<span className="person">{killPersonName}</span>
                            &nbsp;님을 죽였습니다.
						</p>
                        <p className="night-complete">마피아가 승리하였습니다.</p>
                    </Layout>
                    <button
                        className="btn-lg"
                        onClick={moveToResult}>메인으로</button>
                </>
            ) : (
                    <>
                        <Layout describe={`투표 결과`}>
                            {killPersonName ? (
                                <h4>마피아가 {killPersonName}님을 죽였습니다.</h4>
                            ) : (
                                    <h4>마피아가 시민을 죽이지 못하였습니다.</h4>
                                )}
                        </Layout>
                        <button
                            className="btn-lg"
                            onClick={this.handleKillAndNext}>낮으로 갑니다.</button>
                    </>
                )
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
    moveToResult: PropTypes.func.isRequired
};

export default Result
