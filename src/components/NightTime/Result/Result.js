import React from 'react';
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

import Layout from './Layout'
import { getMafiaArray, getSetSaveByDoctor, getIsRevoted, getKillPersonName, getIsMafiaVictory } from './getter';

export default function Result({
    mafiaVotes,
    doctorVotes,
    deletePlayer,
    changeDayAndNight,
    voteAgain,
    players,
    moveToResult
}) {

    const mafiaArray = getMafiaArray(mafiaVotes.toJS())
    const setSaveByDoctor = getSetSaveByDoctor(doctorVotes.toJS())
    const isRevoted = getIsRevoted(mafiaArray)
    const killPersonName = getKillPersonName(mafiaArray, setSaveByDoctor)
    const isMafiaVictory = getIsMafiaVictory(killPersonName, players)

    function _handleKillAndNext() {
        if (killPersonName) {
            deletePlayer(killPersonName)
        }
        changeDayAndNight()
    }

    return isRevoted ? (
        <Layout describe={`투표 결과`}>
            <p className="night-describe">마피아 투표가 동률이 났습니다.</p>
            <button className="btn-lg" onClick={changeDayAndNight}>낮으로 갑니다.</button>
            <button className="btn-lg" onClick={voteAgain}>재투표로 갑니다.</button>
        </Layout>
    ) : isMafiaVictory ? (
        <>
            <Layout describe={`투표 결과`}>
                <p className="night-describe">
                    <span className="person">{killPersonName}</span>
                    &nbsp;님이 죽었습니다.
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
                            <p className="night-describe"><span className="person">{killPersonName}</span>님이 죽었습니다.</p>
                        ) : (
                                <p className="night-describe">마피아가 시민을 죽이지 못하였습니다.</p>
                            )}
                    </Layout>
                    <button
                        className="btn-lg"
                        onClick={_handleKillAndNext}>낮으로 갑니다.</button>
                </>
            )
}

Result.propTypes = {
    mafiaVotes: ImmutablePropTypes.map,
    doctorVotes: ImmutablePropTypes.map,
    players: ImmutablePropTypes.list,
    changeDayAndNight: PropTypes.func.isRequired,
    deletePlayer: PropTypes.func.isRequired,
    voteAgain: PropTypes.func.isRequired,
    moveToResult: PropTypes.func.isRequired
};