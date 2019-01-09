import React, { Component } from 'react';
import '../App.css';
import { withRouter } from 'react-router-dom';

class Setting extends Component {
	state = {
		jobs: [
			{
				code: 1,
				jobName: 'MAFIA',
				count: 0
			},
			{
				code: 2,
				jobName: 'POLICE',
				count: 0
			},
			{
				code: 3,
				jobName: 'DOCTOR',
				count: 0
			},
			{
				code: 4,
				jobName: 'CITIZEN',
				count: 0
			}
		],
		num: 0,
		selectPeopleCheck: false
	};
	// handleJobCount = (event) => {
	//     this.state.jobs.find()
	//     this.setState({
	//         jobs: [
	//             ...jobs,

	//         ]
	//     })
	// }
	handleJobCount = (e) => {
		const code = Number(e.target.name);
		const value = Number(e.target.value);

		// console.log([ ...this.state.jobs ]);

		if (value >= 0) {
			this.setState(
				(prevState) => ({
					...prevState,
					jobs: [ ...prevState.jobs.map((job) => (job.code === code ? { ...job, count: value } : job)) ]
				}) /*,
				() => {
					const { jobs } = this.state;
					if (jobs.find((job) => job.code === code).count < 0) {
						console.log('nonoooooo');
					} else {
						console.log('정수얌');
					}
				}*/
			);
		}
	};
	onPeopleCheck = (e) => {
		const { num } = this.state;
		if (num > 3) {
			this.setState({
				selectPeopleCheck: true
			});
		} else {
			alert('People num is over 3');
			this.setState({
				num: 0
			});
		}
	};
	onPeopleChange = (e) => {
		const value = Number(e.target.value);
		this.setState({
			num: value
		});
	};
	onSettingEnd = () => {
		const { history } = this.props;
		const { jobs, num } = this.state;
		const counts = jobs
			.map((job) => {
				return job.count;
			})
			.reduce((accu, count) => accu + count);
		console.log(counts);

		if (counts === num) {
			history.push('/start', {
				jobs: [ ...jobs ]
			});
		} else {
			alert('총인원과 전체 게임인원이 맞지 않습니다.');
		}
	};
	render() {
		const { jobs, num, selectPeopleCheck } = this.state;
		console.log(this.props);
		return (
			<div className="App-header">
				<div>
					몇명이서 할건데?
					<input type="number" value={num} onBlur={this.onPeopleCheck} onChange={this.onPeopleChange} />
				</div>
				{selectPeopleCheck &&
					jobs.map((job) => (
						<div key={job.code}>
							<span
								style={{
									paddingRight: 15
								}}
							>
								{job.jobName}은 몇명?
							</span>
							<input type="number" name={job.code} value={job.count} onChange={this.handleJobCount} />
						</div>
					))}
				<button onClick={this.onSettingEnd}>submit</button>
			</div>
		);
	}
}

export default withRouter(Setting);
