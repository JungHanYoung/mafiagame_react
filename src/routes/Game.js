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

	changeDayAndNight = () => {
		this.setState(state => ({
			gameOrder: state.gameOrder === DAY_TIME ?
				NIGHT_TIME : DAY_TIME
		}))
	}

	render() {
		console.log(this.state)
		const { players, gameOrder } = this.state;
		if (players.size) {
			return <div className="animated fadeInUp">
				{gameOrder === DAY_TIME ? (
					<>
						<h1>낮</h1>
						<DayTime
							players={players}
							changeDayAndNight={this.changeDayAndNight}
						/>
					</>
				) : (
						<>
							<h1>밤</h1>
							<NightTime
								players={players}
								changeDayAndNight={this.changeDayAndNight}
							/>
						</>
					)}
			</div>
		} else {
			return <Redirect to="/setting" />
		}
	}
}

export default Game;
