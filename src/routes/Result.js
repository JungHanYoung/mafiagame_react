import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logoImg from '../assets/logo.png'


const propTypes = {
    history: PropTypes.object.isRequired
};


class Result extends Component {
    render() {
        const { history } = this.props
        const players = history.location.state.players
        return (
            <>
                <h2 className="game-title">hello mafia</h2>
                <div className="main-container">
                    <img className="result-img" src={logoImg} alt="logo" />
                    <h3 className="result-subject">게임 결과</h3>
                    <div className="result-container">
                        {players.map(player => (
                            <div
                                key={`result-each-player__${player.name}`}
                                className="result-item">
                                <div className="result-name">{player.name}</div>
                                <div className="result-job">{player.jobName}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className="btn-lg"
                    onClick={() => this.props.history.push('/')}>메인으로</button>
            </>
        );
    }
}


Result.propTypes = propTypes;


export default Result;
