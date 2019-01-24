import React from 'react';
import { withRouter } from 'react-router-dom';

// component
import { useGame } from '../context/GameContext';

class GameStart extends React.Component {
	state = {
		showRole: false,
		showIndex: 0
	};
	componentWillMount() {
		const { people, jobs } = this.props.location.state;

		this.props.setRolePeople(people, jobs);
	}

	handleShowRole = () => {
		const { showRole, showIndex } = this.state;
		const { people } = this.props;
		//console.log(people);

		showRole
			? this.setState({
					showRole: false
				})
			: this.setState({
					showRole: true
				});

		showRole &&
			people.length > showIndex + 1 &&
			this.setState({
				showIndex: showIndex + 1
			});

		showRole && people.length === showIndex + 1 && this.props.history.push('/game');

		//console.log('show Index:', showIndex);
	};

	render() {
		const { showRole, showIndex } = this.state;
		const { people, gameStart } = this.props;

		// console.log(this.props.history);
		// console.log('show Index in rendering', showIndex);
		// console.log('rendering person', people[showIndex]);
		// console.log('rendering show role', showRole);

		if (gameStart) {
			return <div>game</div>;
		} else {
			return people.length > 0 ? (
				<div className="App-header">
					{/* <div>nono : {value}</div>
					<div>hello : {hello}</div>
					{people.map((person) => <div>{person}</div>)}
					{/* {!jobs && <Redirect to="/" />} */}
					{/* {!state && <Redirect to={{ pathname: '/', state: { redirectMesg: 'do not setting...' } }} />}
					<Game num={state.num} jobs={state.jobs} people={state.people} /> */}
					<h1 className="animated" ref="title">
						이제 각 사람 마다의 역할이 정해집니다.
					</h1>

					<h2>{people[showIndex].name}</h2>
					{showRole && <h2 className="animated fadeInUp delay-.1s">{people[showIndex].jobName}</h2>}

					{/* {showIndex < people.length &&
					second && <h1 className="animated fadeInUp delay-.1s">Enter를 눌러 당신의 역할을 확인하세요.</h1>}
					{showIndex < people.length &&
					second && <h2 className="animated fadeInUp delay-.1s">{people[showIndex].name}</h2>}
					{showIndex < people.length &&
					visible && <h2 className="animated fadeInUp delay-.1s">{people[showIndex].jobName}</h2>} */}
					{/* {people.map((person, i) => {
						return <div key={`person_${i}`}>{person.code}</div>;
					})*/}

					<button onClick={this.handleShowRole} className="btn">다음</button>
				</div>
			) : null;
		}
	}
}

export default withRouter(
	useGame(({ state, actions }) => ({
		people: state.people,
		gameStart: state.gameStart,
		setRolePeople: actions.setRolePeople,
		setGameStart: actions.setGameStart
	}))(GameStart)
);
