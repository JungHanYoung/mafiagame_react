import React, { Component } from 'react';

class Game extends Component {
	state = {};
	componentWillMount() {
		const { people, num, jobs } = this.props;

		let c_people = [ ...people ];

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
		});
		// console.log(c_people);
		this.setState({
			people: c_people
		});
	}
	componentDidMount() {
		this.refs.title.addEventListener('animationend', (e) => {
			this.refs.title.removeEventListener('animationend', () => console.log('remove'));
			this.refs.title.remove();
			console.log('transitionend!!!');
		});

		setTimeout(() => {
			this.refs.title.classList.add('fadeOutDown');
		}, 2000);

		window.addEventListener('keypress', (e) => {
			console.log(e.code);
		});
	}
	render() {
		const { people } = this.state;
		return (
			<div>
				<h1 className="animated" ref="title">
					이제 각 사람 마다의 역할이 정해집니다.
				</h1>
				{people.map((person, i) => {
					return <div key={`person_${i}`}>{person.code}</div>;
				})}
			</div>
		);
	}
}

export default Game;
