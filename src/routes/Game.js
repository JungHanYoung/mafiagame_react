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
			// players: players.map(player => Object.assign(player, { daytimeVoted: 0 })),
			// gameOrder: DAY_TIME
			players: List(players.map(player => Map(player).set('daytimeVoted', 0))),
			gameOrder: DAY_TIME
		}
	}

	moveToMain = () => {
		this.props.history.push('/')
	}

	render() {
		const { players, gameOrder } = this.state;
		if (players.size) {
			return <div className="animated fadeInUp">
				{gameOrder === DAY_TIME ? (
					<>
						<h1>낮</h1>
						<DayTime
							players={players}
							votePerson={this.votePerson}
							changeDayAndNight={this.changeDayAndNight}
							deletePlayer={this.deletePlayer}
							moveToMain={this.moveToMain}
						/>
					</>
				) : (
						<>
							<h1>밤</h1>
							<NightTime
								players={players}
								changeDayAndNight={this.changeDayAndNight}
								deletePlayer={this.deletePlayer}
								moveToMain={this.moveToMain}
							/>
						</>
					)}
			</div>
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
		this.setState({
			players: players.delete(players.findIndex(player => player.get('name') === name))
		})
	}
}

export default Game;
