import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
// import { withRouter } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { GameContext } from '../context/GameContext';

// 상수
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_CITIZEN, JOB_NAME_OF_DOCTOR } from '../contants/Job';

// Component
import InputPeople from '../components/setting/InputPeople'
import JobSetting from '../components/setting/JobSetting'


const steps = [InputPeople, JobSetting]

const getContent = (step) => {
	if (steps.length > step && step >= 0) {
		const Component = steps[step]
		return <Component />
	} else {
		return null;
	}

}

export default function Setting() {
	// people: state.people,
	// 	jobs: state.jobs,
	// 	setPeopleNum: actions.setPeopleNum,
	// 	onChangePeopleName: actions.onChangePeopleName
	const [{ people, jobs }] = useContext(GameContext)
	const [step, setStep] = useState(0);
	const { history } = useReactRouter();

	function handleBack() {
		if (step > 0) {
			setStep(step - 1)
		}
	}

	function handleNext() {
		for (let person of people) {
			if (person === '') {
				alert('이름을 적어야 합니다.')
				return;
			}
		}
		if ((new Set(people)).size !== people.length) {
			alert('이름이 중복되면 안됩니다.')
			return;
		}
		setStep(step + 1)
	}

	function onSettingEnd() {
		// const { history, jobs, people } = this.props;
		const countByMin = jobs
			.map((job) => job.minCount)
			.reduce((accu, count) => accu + count);
		const countByMax = jobs
			.map((job) => job.maxCount)
			.reduce((accu, count) => accu + count);

		// 각 직업의 인원을 합한 수와 총인원이 같아야 세팅 마무리
		if (countByMin + countByMax >= people.length) {
			history.push('/check');
		} else {
			alert('총인원과 전체 게임인원이 맞지 않습니다.');
		}
	}

	return (
		<>
			<h1 className="setting-title">game settings</h1>
			{getContent(step)}
			<div className="setting-step">
				<div className="setting-step-wrapper">
					{Array
						.from({ length: steps.length }, (v, k) => k)
						.map(number => (
							<span
								key={`setting-step-${number}`}
								className={classNames(
									'setting-step-bar',
									{ active: number <= step })}
							></span>
						))}
				</div>
			</div>
			<div className="setting-btn-group">

				{step > 0 &&
					<button className="setting-prev-btn" onClick={handleBack}>이 전</button>
				}
				{step === steps.length - 1 ?
					<button className="setting-next-btn setting-end" onClick={onSettingEnd}>게임 시작</button>
					:
					<button className="setting-next-btn" onClick={handleNext}>다&nbsp;&nbsp;음</button>
				}
			</div>
		</>
	)
}

// export class Setting extends Component {
// 	constructor(props) {
// 		super(props);

// 		const { people } = props;
// 		this.state = {
// 			num: people.length,
// 			step: 0
// 		};
// 	}
// 	handleNext = () => {
// 		for (let person in this.props.people) {
// 			if (this.props.people[person] === '') {
// 				alert('이름을 적어야합니다.')
// 				return;
// 			}
// 		}
// 		if ((new Set(this.props.people)).size !== this.props.people.length) {
// 			alert('이름이 중복되면 안됩니다.')
// 			return;
// 		}
// 		this.setState(state => ({
// 			step: state.step + 1
// 		}))
// 	}
// 	handleBack = () => {
// 		this.setState(state => ({
// 			step: state.step - 1
// 		}))
// 	}
// 	onSettingEnd = () => {
// 		const { history, jobs, people } = this.props;
// 		const countByMin = jobs
// 			.map((job) => job.minCount)
// 			.reduce((accu, count) => accu + count);
// 		const countByMax = jobs
// 			.map((job) => job.maxCount)
// 			.reduce((accu, count) => accu + count);

// 		// 각 직업의 인원을 합한 수와 총인원이 같아야 세팅 마무리
// 		if (countByMin + countByMax >= people.length) {
// 			history.push('/check');
// 		} else {
// 			alert('총인원과 전체 게임인원이 맞지 않습니다.');
// 		}
// 	};
// 	render() {
// 		const { step } = this.state;
// 		return (
// 			<>
// 				<h1 className="setting-title">game settings</h1>
// 				{getContent(step)}
// 				<div className="setting-step">
// 					<div className="setting-step-wrapper">
// 						{Array
// 							.from({ length: steps.length }, (v, k) => k)
// 							.map(number => (
// 								<span
// 									key={`setting-step-${number}`}
// 									className={classNames(
// 										'setting-step-bar',
// 										{ active: number <= step })}
// 								></span>
// 							))}
// 					</div>
// 				</div>
// 				<div className="setting-btn-group">

// 					{step > 0 &&
// 						<button className="setting-prev-btn" onClick={this.handleBack}>이 전</button>
// 					}
// 					{step === steps.length - 1 ?
// 						<button className="setting-next-btn setting-end" onClick={this.onSettingEnd}>게임 시작</button>
// 						:
// 						<button className="setting-next-btn" onClick={this.handleNext}>다&nbsp;&nbsp;음</button>
// 					}
// 				</div>
// 			</>
// 		);
// 	}
// }

Setting.propTypes = {
	people: PropTypes.arrayOf(PropTypes.string),
	jobs: PropTypes.arrayOf(PropTypes.shape({
		jobName: PropTypes.oneOf([JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN]),
		minCount: PropTypes.number.isRequired,
		maxCount: PropTypes.number.isRequired
	})),
	setPeopleNum: PropTypes.func.isRequired,
	onChangePeopleName: PropTypes.func.isRequired,
	//
};

Setting.defaultProps = {

}

// export default withRouter(
// 	useGame(({ state, actions }) => ({
// 		people: state.people,
// 		jobs: state.jobs,
// 		setPeopleNum: actions.setPeopleNum,
// 		onChangePeopleName: actions.onChangePeopleName
// 	}))(Setting)
// );
