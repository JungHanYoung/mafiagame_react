import React, { Component } from 'react';
import { useGame } from '../../context/GameContext';

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
                    직업을 가진 인원을<br /> 몇 명으로 할 것인지 추가합니다.
                </h3>
                <div className="setting-job-container">
                    {/* {jobs.map(job => (
                        <React.Fragment key={`setting__job-count__${job.code}`}>
                            <h3 className="job-name">{job.jobName}</h3> */}
                    <table>
                        <thead>
                            <tr>
                                <th>직업</th>
                                <th>최소 직업 수</th>
                                <th>최대 직업 수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <tr key={`setting_job_${job.jobName}`}>
                                    <th><h3 className="job-name">{job.jobName}</h3></th>
                                    <th><input
                                        className="job-input"
                                        type="text"
                                        name={job.code}
                                        value={job.minCount}
                                        disabled
                                        autoComplete="off"
                                    />
                                        <span className="job-input-unit">명</span>
                                        <button onClick={() => onChangeJobMinCount(job.code, job.minCount + 1)}>+</button>
                                        <button onClick={() => onChangeJobMinCount(job.code, job.minCount - 1)}>-</button></th>
                                    <th><input
                                        className="job-input"
                                        type="text"
                                        name={job.code}
                                        value={job.maxCount}
                                        disabled
                                        autoComplete="off"
                                    />
                                        <span className="job-input-unit">명</span>
                                        <button onClick={() => onChangeJobMaxCount(job.code, job.maxCount + 1)}>+</button>
                                        <button onClick={() => onChangeJobMaxCount(job.code, job.maxCount - 1)}>-</button></th>
                                </tr>
                            ))}
                            <tr>
                                <th></th>
                            </tr>
                        </tbody>
                    </table>
                    {/* <div className="job-input-container">
                                <input
                                    className="job-input"
                                    type="text"
                                    name={job.code}
                                    value={job.count}
                                    disabled
                                    autoComplete="off"
                                />
                                <span className="job-input-unit">명</span>
                                <button onClick={() => onChangeJobCount(job.code, job.count + 1)}>+</button>
                                <button onClick={() => onChangeJobCount(job.code, job.count - 1)}>-</button>
                            </div>
                        </React.Fragment>
                    ))} */}
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
