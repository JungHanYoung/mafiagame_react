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
		people: []
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
			alert('People num must be over 3');
			// console.dir(this.refs.pp);
			// this.setState({
			// 	num: 0
			// });
		}
	};
	onPeopleChange = (e) => {
		// console.log(e.target);
		const value = Number(e.target.value);
		this.setState({
			num: value,
			people: [ ...Array.from({ length: value }, (v, k) => k).map(() => '') ]
		});
	};
	onChangePersonName = (i, value) => {
		const { people } = this.state;

		this.setState({
			people: people.map((v, index1) => (i === index1 ? value : v))
		});
	};
	onSettingEnd = () => {
		const { history } = this.props;
		const { jobs, num, people } = this.state;
		const counts = jobs
			.map((job) => {
				return job.count;
			})
			.reduce((accu, count) => accu + count);
		// console.log(counts);

		if (counts === num) {
			history.push('/check', {
				jobs,
				num,
				people
			});
		} else {
			alert('총인원과 전체 게임인원이 맞지 않습니다.');
		}
	};
	render() {
		const { jobs, num, people } = this.state;

		// console.log(this.props);
		return (
			<div className="App-header">
				<div>
					몇명이서 할건데?
					{/* <input
						type="number"
						value={num}
						onBlur={this.onPeopleCheck}
						onChange={this.onPeopleChange}
						ref="pp"
					/> */}
					{/* <select>{(1)['..'](10)}</select> */}
					<select value={num} onChange={this.onPeopleChange}>
						<option>select number</option>
						{Array.from({ length: 9 }, (v, k) => k + 4).map((num) => (
							<option key={num} value={num}>
								{num}
							</option>
						))}
					</select>
				</div>
				{people.map((person, i) => (
					<input
						key={`name_${i}`}
						type="text"
						name={`person_${i}`}
						value={person}
						onChange={(e) => this.onChangePersonName(i, e.target.value)}
					/>
				))}
				{/* {Array.from({ length: num }, (v, k) => k).map((v) => (
					<input key={`name_${v}`} type="text" value={people.name} />
				))} */}
				{num > 3 &&
					jobs.map((job) => (
						<div key={job.code}>
							<span
								style={{
									paddingRight: 15
								}}
								className="animated fadeInLeft"
							>
								{job.jobName}은 몇명?
							</span>
							<input
								type="number"
								name={job.code}
								value={job.count}
								onChange={this.handleJobCount}
								className="animated fadeInRight"
							/>
						</div>
					))}
				<button onClick={this.onSettingEnd}>submit</button>
			</div>
		);
	}
}

export default withRouter(Setting);
