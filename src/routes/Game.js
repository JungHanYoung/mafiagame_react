import React from 'react';
import { List, Map } from 'immutable'
import { Redirect } from 'react-router-dom'
// import PropTypes from 'prop-types';

// 컴포넌트
import DayTime from '../components/DayTime';
import NightTime from '../components/NightTime';

// constant
import { DAY_TIME, NIGHT_TIME } from '../contants/turnOfGame/Game';

class Game extends React.Component {
	constructor(props) {
		super(props)

		const { history } = props;
		const players = history.location.state.players
		this.state = {
			players: List(players.map(player => Map(player).set('daytimeVoted', 0))),
			playersByResult: players,
			gameOrder: DAY_TIME
		}
	}

	moveToMain = () => {
		this.props.history.push('/')
	}

	moveToResult = () => {
		this.props.history.push('/result', { players: this.state.playersByResult })
	}

	initVote = () => {
		const { players } = this.state;
		this.setState({
			players: players.map(player => player.set('daytimeVoted', 0))
		})
	}

	render() {
		const { players, gameOrder } = this.state;
		if (players.size) {
			return <>
				{gameOrder === DAY_TIME ? (
					<main className="daytime">
						<h2 className="game-title">HELLO MAFIA</h2>
						<DayTime
							players={players}
							initVote={this.initVote}
							votePerson={this.votePerson}
							changeDayAndNight={this.changeDayAndNight}
							deletePlayer={this.deletePlayer}
							moveToResult={this.moveToResult}
						/>
					</main>
				) : (
						<main className="night">
							<h2 className="game-title">HELLO MAFIA</h2>
							<NightTime
								players={players}
								changeDayAndNight={this.changeDayAndNight}
								deletePlayer={this.deletePlayer}
								moveToResult={this.moveToResult}
							/>
						</main>
					)}
			</>
		} else {
			return <Redirect to="/setting" />
		}
	}

	changeDayAndNight = () => {
		this.setState(state => ({
			gameOrder: state.gameOrder === DAY_TIME ?
				NIGHT_TIME : DAY_TIME
		}))
	}

	votePerson = (name) => {
		const { players } = this.state;
		this.setState({
			players: players.updateIn([players.findIndex(player => player.get('name') === name), 'daytimeVoted'], val => val + 1)
		})
	}

	deletePlayer = (name) => {
		const { players } = this.state;
		console.log(name);
		this.setState({
			players: players.delete(players.findIndex(player => player.get('name') === name))
		})
	}
}

export default Game;
