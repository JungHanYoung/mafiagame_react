import React, { Component } from 'react';

class Game extends Component {
	state = {
		people: [ '한영', '지원', '정석', '1', '2', '3', '4' ],
		jobs: [
			{
				code: 1,
				jobName: 'MAFIA',
				count: 2
			},
			{
				code: 2,
				jobName: 'POLICE',
				count: 1
			},
			{
				code: 3,
				jobName: 'DOCTOR',
				count: 1
			},
			{
				code: 4,
				jobName: 'CITIZEN',
				count: 3
			}
		],
		num: 7
	};
	componentWillMount() {
		// console.log(this.state);
		// const { jobs } = this.state;
		const { people, num, jobs } = this.props;
		// while(true) {

		let c_people = [ ...people ];

		// console.log('random index : ', randomIndex);
		// console.log('random item :', people[randomIndex]);

		console.log('random setting...');
		jobs.forEach((job) => {
			let flag_count = 0;
			while (job.count !== flag_count) {
				const randomIndex = Math.floor(Math.random() * num);
				if (typeof c_people[randomIndex] === 'object') {
					continue;
				} else {
					c_people = [
						{
							name: c_people.splice(randomIndex, 1)[0],
							code: job.code,
							jobName: job.jobName
						},
						...c_people
					];
					flag_count += 1;
				}
			}
			// Array.from({ length: job.count }, (v, k) => k).forEach((value) => {
			// 	const randomIndex = Math.floor(Math.random() * num);
			// 	// value -> count: 1,2,3 ...
			// 	if(typeof c_people[randomIndex] === "string") {

			// 	}
			// 	console.log([
			// 		{
			// 			name: c_people.splice(randomIndex, 1)[0],
			// 			code: job.code,
			// 			jobName: job.jobName
			// 		},
			// 		...c_people
			// 	]);
			// });
		});
		console.log(c_people);
		this.setState({
			people: c_people
		});
	}
	render() {
		// const { num, jobs } = this.props;
		// console.log(num);
		// console.log(jobs);
		const { people } = this.state;
		return (
			<div>
				<h1>이제 각 사람 마다의 역할이 정해집니다.</h1>
				{people.map((person, i) => {
					return <div key={`person_${i}`}>{person.code}</div>;
				})}
			</div>
		);
	}
}

export default Game;
