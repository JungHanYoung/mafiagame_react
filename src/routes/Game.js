import React, { Component } from 'react';
import { shuffle } from '../utils/shuffle';

// component
import Start from './Start';

class Game extends Component {
	state = {
		first: false,
		second: false,
		showIndex: 0,
		visible: false
	};
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
		c_people = shuffle(c_people);
		this.setState({
			people: c_people
		});
	}
	componentDidMount() {
		this.refs.title.addEventListener('animationend', (e) => {
			this.refs.title.removeEventListener('animationend', () => console.log('remove'));
			this.refs.title.remove();
			this.setState({
				second: true
			});
			console.log('Animation End!!!');
		});

		setTimeout(() => {
			this.refs.title.classList.add('fadeOutDown');
			window.addEventListener('keypress', (e) => {
				if (e.code === 'Enter') {
					const { visible, people, showIndex } = this.state;
					// if(this.state.visible) {
					// 	this.setState({
					// 		...this.state,
					// 		visible: true
					// 	});
					// 	setTimeout(() => {

					// 	}, 2000)
					// }
					console.log('show index :', showIndex);
					!visible && people.length > showIndex - 1
						? this.setState({
								...this.state,
								visible: true
							})
						: this.setState({
								...this.state,
								visible: false,
								showIndex: showIndex + 1
							});
				}
			});
		}, 2000);
	}
	render() {
		const { people, second, visible, showIndex } = this.state;
		console.table(people);
		return (
			<div className="App-header">
				<h1 className="animated" ref="title">
					이제 각 사람 마다의 역할이 정해집니다.
				</h1>
				{showIndex === people.length && <Start people={people} />}
				{showIndex < people.length &&
				second && <h1 className="animated fadeInUp delay-.1s">Enter를 눌러 당신의 역할을 확인하세요.</h1>}
				{showIndex < people.length &&
				second && <h2 className="animated fadeInUp delay-.1s">{people[showIndex].name}</h2>}
				{showIndex < people.length &&
				visible && <h2 className="animated fadeInUp delay-.1s">{people[showIndex].jobName}</h2>}
				{/* {people.map((person, i) => {
					return <div key={`person_${i}`}>{person.code}</div>;
				})} */}
			</div>
		);
	}
}

export default Game;
