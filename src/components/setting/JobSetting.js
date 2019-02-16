import React, { Component } from 'react';
import { useGame } from '../../context/GameContext';

import CountInput from './common/CountInput'


class JobSetting extends Component {
    // handleJobCount = (e) => {
    //     const code = Number(e.target.name);
    //     const value = Number(e.target.value);

    //     const { onChangeJobCount } = this.props;
    //     onChangeJobCount(code, value)
    // }

    render() {
        const { jobs, onChangeJobMinCount, onChangeJobMaxCount } = this.props;
        return (
            <div className="setting-container">
                <h3 className="setting-subtitle">
                    직업 당 몇 명을<br />배정 하시겠습니까?
                </h3>
                <div className="setting-job-container">
                    {jobs.map(job => (
                        <div key={`job-setting__${job.jobName}`} className="job-input-container">
                            <div className="subject">{job.jobName}</div>
                            <CountInput count={job.minCount} handler={onChangeJobMinCount(job.code)} />
                            <CountInput count={job.maxCount} handler={onChangeJobMaxCount(job.code)} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default useGame(({ state, actions }) => ({
    jobs: state.jobs,
    onChangeJobMinCount: actions.onChangeJobMinCount,
    onChangeJobMaxCount: actions.onChangeJobMaxCount
}))(JobSetting);
