import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './App.css';
import { useGame } from './context/GameContext';

class App extends Component {
	render() {
		const { people } = this.props;
		const location = this.props.location;
		console.log(people)
		// console.log(location.state);
		// console.log(location.state ? location.state.redirectMesg : 'not exists location');
		location.state && location.state.redirectMesg && alert(location.state.redirectMesg);
		return (
			<div className="App">
				<header className="App-header">
					<h1>Hello Mafia</h1>
					{people.length > 0 && (
						<Link className="btn" to="/check">
							게임 시작
						</Link>
					)}
					<Link className="btn" to="/setting">
						게임 설정
					</Link>

					<Link className="btn" to="/about">
						게임 설명
					</Link>
				</header>
			</div>
		);
	}
}

export default withRouter(
	useGame(({ state, actions }) => ({
		people: state.people
	}))(App)
);
