import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { JOB_NAME_OF_MAFIA } from '../contants/Job';


const propTypes = {
    history: PropTypes.object.isRequired
};

export default function Result({
    history
}) {
    const players = history.location.state.players
    return (
        <>
            <h2 className="game-title">hello mafia</h2>
            <div className="main-container">
                <div className="game-content">
                    <h3 className="result-subject">게임 결과</h3>
                    <div className="result-container">
                        <div className="scroll-wrapper">
                            {players.map(player => (
                                <div
                                    key={`result-each-player__${player.name}`}
                                    className="result-item">
                                    <div className="result-name">{player.name}</div>
                                    <div
                                        className={
                                            classNames('result-job',
                                                {
                                                    mafia: player.jobName
                                                        === JOB_NAME_OF_MAFIA
                                                })}
                                    >{player.jobName}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <button
                className="btn-lg"
                onClick={() => history.push('/')}>메인으로</button>
        </>
    )
}

// class Result extends Component {
//     render() {
//         const { history } = this.props
//         const players = history.location.state.players
//         return (
//             <>
//                 <h2 className="game-title">hello mafia</h2>
//                 <div className="main-container">
//                     <div className="game-content">
//                         <h3 className="result-subject">게임 결과</h3>
//                         <div className="result-container">
//                             <div className="scroll-wrapper">
//                                 {players.map(player => (
//                                     <div
//                                         key={`result-each-player__${player.name}`}
//                                         className="result-item">
//                                         <div className="result-name">{player.name}</div>
//                                         <div
//                                             className={
//                                                 classNames('result-job',
//                                                     {
//                                                         mafia: player.jobName
//                                                             === JOB_NAME_OF_MAFIA
//                                                     })}
//                                         >{player.jobName}</div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <button
//                     className="btn-lg"
//                     onClick={() => this.props.history.push('/')}>메인으로</button>
//             </>
//         );
//     }
// }

Result.propTypes = propTypes;
