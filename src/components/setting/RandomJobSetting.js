import React, { Component } from 'react';
import { useGame } from '../../context/GameContext';

class RandomJobSetting extends Component {

    handleRandomJobCount = (e) => {
        const code = Number(e.target.name);
        const value = Number(e.target.value);
        const { onChangeRandomJobCount } = this.props
        onChangeRandomJobCount(code, value)
    }


    render() {
        const { randomJobs } = this.props
        return (
            <div className="setting-container">
                <h3 className="setting-subtitle">
                    랜덤 직업을 선택합니다.
                </h3>
                <div className="setting-job-container">
                    {randomJobs.map(job => (
                        <>
                            <h3 className="setting-job-name">{job.jobName}</h3>
                            <div className="setting-job-input-container">
                                <input
                                    className="setting-job-input"
                                    type="text"
                                    name={job.code}
                                    value={job.count}
                                    onChange={this.handleRandomJobCount}
                                />
                                <span className="setting-job-input-unit">명</span>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        );
    }
}

export default useGame(({ state, actions }) => ({
    randomJobs: state.randomJobs,
    onChangeRandomJobCount: actions.onChangeRandomJobCount
}))(RandomJobSetting);
