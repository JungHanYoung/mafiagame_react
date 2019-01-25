import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { useGame } from '../context/GameContext';

// 상수
import { SELECT_OF_PEOPLE_NUM_START, SELECT_OF_PEOPLE_NUM_END } from '../contants/Setting';
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_CITIZEN, JOB_NAME_OF_DOCTOR } from '../contants/Job';

const PeopleNumSelectList = () => {
	const range = _.range(SELECT_OF_PEOPLE_NUM_START, SELECT_OF_PEOPLE_NUM_END);
	return range.map((num) => (
		<option key={num} value={num}>
			{num}
		</option>
	));
};

class Setting extends Component {
	constructor(props) {
		super(props);

		this.state = {
			num: 0,
			jobs: [
				{
					code: 1,
					jobName: JOB_NAME_OF_MAFIA,
					count: 0
				},
				{
					code: 2,
					jobName: JOB_NAME_OF_POLICE,
					count: 0
				},
				{
					code: 3,
					jobName: JOB_NAME_OF_DOCTOR,
					count: 0
				},
				{
					code: 4,
					jobName: JOB_NAME_OF_CITIZEN,
					count: 0
				}
			]
		};
	}
	handleJobCount = (e) => {
		const code = Number(e.target.name);
		const value = Number(e.target.value);

		const { jobs } = this.state;
		// const { onChangeJobCount } = this.props;
		// onChangeJobCount(code, value);
		if (value >= 0) {
			this.setState({
				jobs: jobs.map((job) => (job.code === code ? { ...job, count: value } : job))
			});
		}
	};
	// 총인원 핸들링 메소드
	onPeopleChange = (e) => {
		// console.log(e.target);
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
		const { num, jobs } = this.state;
		const { history, setJobsOnState } = this.props;
		const counts = jobs
			.map((job) => {
				return job.count;
			})
			.reduce((accu, count) => accu + count);

		// console.log(jobs);
		// 각 직업의 인원을 합한 수와 총인원이 같아야 세팅 마무리
		if (counts === num) {
			setJobsOnState(jobs);
			history.push('/check');
		} else {
			alert('총인원과 전체 게임인원이 맞지 않습니다.');
		}
	};
	render() {
		const { people, onChangePeopleName } = this.props;
		const { num, jobs } = this.state;
		// console.log(this.props);
		return (
			<div className="App-header">
				<div>
					몇명이서 할건데?&nbsp;
					<select value={num} onChange={this.onPeopleChange}>
						<option>select number</option>
						<PeopleNumSelectList />
					</select>
				</div>
				{people.map((person, i) => (
					<input
						key={`name_${i}`}
						type="text"
						autoComplete="off"
						name={`person_${i}`}
						value={person}
						onChange={(e) => onChangePeopleName(i, e.target.value)}
					/>
				))}
				{/* {Array.from({ length: num }, (v, k) => k).map((v) => (
					<input key={`name_${v}`} type="text" value={people.name} />
				))} */}
				{num > 3 && (
					<Fragment>
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
						<button onClick={this.onSettingEnd}>게임시작</button>
					</Fragment>
				)}
			</div>
		);
		// const { people } = this.props;
		// people undefined
	}
}

Setting.defaultProps = {
	people: [ 'Props를 받지 못하였습니다.' ]
};

Setting.propTypes = {
	people: PropTypes.arrayOf(PropTypes.string),
	setPeopleNum: PropTypes.func.isRequired,
	// jobs: PropTypes.arrayOf(
	// 	PropTypes.shape({
	// 		code: PropTypes.number,
	// 		jobName: PropTypes.string,
	// 		count: PropTypes.number
	// 	})
	// ),
	onChangePeopleName: PropTypes.func.isRequired,
	onChangeJobCount: PropTypes.func.isRequired,
	setJobsOnState: PropTypes.func.isRequired
};

export default withRouter(
	useGame(({ state, actions }) => ({
		people: state.people,
		setPeopleNum: actions.setPeopleNum,
		// jobs: state.jobs,
		onChangePeopleName: actions.onChangePeopleName,
		onChangeJobCount: actions.onChangeJobCount,
		setJobsOnState: actions.setJobsOnState
	}))(Setting)
);
