import React, { Component } from 'react';
import { useGame } from '../../context/GameContext';

class JobSetting extends Component {
    handleJobCount = (e) => {
        const code = Number(e.target.name);
        const value = Number(e.target.value);

        const { onChangeJobCount } = this.props;
        onChangeJobCount(code, value)
    }

    render() {
        const { jobs } = this.props;
        return (
            <div className="setting-container">
                <h3 className="setting-subtitle">
                    직업을 가진 인원을<br /> 몇 명으로 할 것인지 추가합니다.
                </h3>
                <div className="setting-job-container">
                    {jobs.map(job => (
                        <>
                            <h3 className="setting-job-name">{job.jobName}</h3>
                            <div className="setting-job-input-container">
                                <input
                                    className="setting-job-input"
                                    type="text"
                                    name={job.code}
                                    value={job.count}
                                    onChange={this.handleJobCount}
                                    autoComplete="off"
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
    jobs: state.jobs,
    onChangeJobCount: actions.onChangeJobCount
}))(JobSetting);
