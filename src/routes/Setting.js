import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import { withRouter } from 'react-router-dom';
import { useGame } from '../context/GameContext';

// 상수
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_CITIZEN, JOB_NAME_OF_DOCTOR } from '../contants/Job';

// Component
import InputPeople from '../components/setting/InputPeople'
import JobSetting from '../components/setting/JobSetting'
import RandomJobSetting from '../components/setting/RandomJobSetting'


const getContent = (step) => {
	switch (step) {
		case 0:
			return <InputPeople />
		case 1:
			return <JobSetting />
		case 2:
			return <RandomJobSetting />
		default:
			return null;
	}
}

class Setting extends Component {
	constructor(props) {
		super(props);

		const { people } = props;
		this.state = {
			num: people.length,
			step: 0
		};
	}
	handleNext = () => {
		this.setState(state => ({
			step: state.step + 1
		}))
	}
	handleBack = () => {
		this.setState(state => ({
			step: state.step - 1
		}))
	}
	handleJobCount = (e) => {
		const code = Number(e.target.name);
		const value = Number(e.target.value);

		const { onChangeJobCount } = this.props;
		onChangeJobCount(code, value)
	};
	handleRandomJobCount = (e) => {
		const code = Number(e.target.name);
		const value = Number(e.target.value);

		const { onChangeRandomJobCount } = this.props;
		onChangeRandomJobCount(code, value)
	};
	// 총인원 핸들링 메소드
	onPeopleChange = (e) => {
		const { setPeopleNum } = this.props;
		const value = Number(e.target.value);

		this.setState(
			{
				num: value
			},
			() => {
				setPeopleNum(value);
			}
		);
	};
	onSettingEnd = () => {
		const { num } = this.state;
		const { history, jobs, randomJobs } = this.props;
		const counts = jobs
			.map((job) => {
				return job.count;
			})
			.reduce((accu, count) => accu + count);
		const countsOfRandomJobs = randomJobs
			.map((job) => {
				return job.count;
			})
			.reduce((accu, count) => accu + count);

		// 각 직업의 인원을 합한 수와 총인원이 같아야 세팅 마무리
		if (counts + countsOfRandomJobs >= num) {
			history.push('/check');
		} else {
			alert('총인원과 전체 게임인원이 맞지 않습니다.');
		}
	};
	render() {
		const { jobs, randomJobs } = this.props;
		const { num, step } = this.state;
		return (
			<>
				<h1 className="setting-title">게임 설정</h1>
				<div className="setting-step">
					{Array
						.from({ length: 3 }, (v, k) => k)
						.map(number => (
							<span
								key={`setting-step-${number}`}
								className={classNames(
									'setting-step-bar',
									{ active: number <= step })}
							>{number < step && '✔'}</span>
						))}
				</div>
				{getContent(step)}
				<div className="setting-btn-group">

					{step > 0 &&
						<button className="setting-prev-btn" onClick={this.handleBack}>이 전</button>
					}
					{step === 2 ?
						<button className="setting-next-btn setting-end" onClick={this.onSettingEnd}>게임시작</button>
						:
						<button className="setting-next-btn" onClick={this.handleNext}>다 음</button>
					}
				</div>
				{num > 3 && (
					<>
						{jobs.map((job) => (
							<div key={job.code}>
								<span className="animated fadeInLeft">{job.jobName}은 몇명?&nbsp;</span>
								<input
									type="number"
									name={job.code}
									value={job.count}
									onChange={this.handleJobCount}
									className="animated fadeInRight"
								/>
							</div>
						))}
						{randomJobs.map((job) => (
							<div key={job.code}>
								<span className="animated fadeInLeft">{job.jobName}최대값?&nbsp;</span>
								<input
									type="number"
									name={job.code}
									value={job.count}
									onChange={this.handleRandomJobCount}
									className="animated fadeInRight"
								/>
							</div>
						))}
						<button onClick={this.onSettingEnd}>게임시작</button>
					</>
				)}
			</>
		);
	}
}

Setting.propTypes = {
	people: PropTypes.arrayOf(PropTypes.string),
	jobs: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.number.isRequired,
		jobName: PropTypes.oneOf([JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN]),
		count: PropTypes.number.isRequired
	})),
	setPeopleNum: PropTypes.func.isRequired,
	onChangePeopleName: PropTypes.func.isRequired,
	onChangeJobCount: PropTypes.func.isRequired,
	//
	randomJobs: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.number.isRequired,
		jobName: PropTypes.oneOf([JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN]),
		count: PropTypes.number.isRequired
	})),
	onChangeRandomJobCount: PropTypes.func.isRequired
};

export default withRouter(
	useGame(({ state, actions }) => ({
		people: state.people,
		jobs: state.jobs,
		setPeopleNum: actions.setPeopleNum,
		onChangePeopleName: actions.onChangePeopleName,
		onChangeJobCount: actions.onChangeJobCount,
		//
		randomJobs: state.randomJobs,
		onChangeRandomJobCount: actions.onChangeRandomJobCount
	}))(Setting)
);
