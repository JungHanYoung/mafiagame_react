import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import logoImg from '../assets/logo.png'

// component
import { useGame } from '../context/GameContext';
import { JOB_NAME_OF_MAFIA } from '../contants/Job';
import { setPlayers } from '../utils/setPlayers';


export class CheckRole extends React.Component {
	constructor(props) {
		super(props)

		const { jobs, people, randomJobs } = props
		const players = setPlayers(people, jobs, randomJobs)

		this.state = {
			players,
			showRole: false,
			showIndex: 0
		}
	}

	handleShowRole = () => {
		const { showRole, showIndex, players } = this.state;
		if (showRole) {
			if (players.length - 1 > showIndex) {
				this.setState({
					showRole: false,
					showIndex: showIndex + 1
				})
			} else {
				this.props.history.push('/game', { players });
			}
		} else {
			this.setState({
				showRole: true
			})
		}
	};

	render() {
		const { showRole, showIndex, players } = this.state;

		if (players.length <= 0) {
			return <Redirect to="/setting" />
		} else {
			return (<div className="check">
				<h2 className="game-title">HELLO MAFIA</h2>
				<div className="game-content">
					{!showRole && <p className="content-description">이제 각 사람 마다의<br />역할이 정해집니다.</p>}
					<p className="player-name">{players[showIndex].name}</p>
					{showRole &&
						<>
							<img className="job-image" src={logoImg} alt="character" />
							<p className="player-job">{players[showIndex].jobName}</p>
						</>}
					{showRole && players[showIndex].jobName === JOB_NAME_OF_MAFIA &&
						<>
							{players
								.filter(player => players[showIndex].name !== player.name)
								.map(player => player.jobName)
								.includes(JOB_NAME_OF_MAFIA) ? <>
									<h3 className="check-mafia-sub">동료 마피아</h3>
									<div className="check-mafia-co">
										{players.filter((player) => players[showIndex].name !== player.name
											&& player.jobName === JOB_NAME_OF_MAFIA)
											.map((player, i) => (
												<div key={`mafia-show-${i}`} className="mafia-co-person">
													{player.name}
												</div>
											))}
									</div>
								</> : null}

						</>
					}
				</div>
				<button onClick={this.handleShowRole} className="btn-lg">
					{showRole ? '다 음' : '확인 하기'}
				</button>
			</div>)
		}
	}
}

CheckRole.propTypes = {
	people: PropTypes.arrayOf(PropTypes.string),
	jobs: PropTypes.arrayOf(
		PropTypes.shape({
			code: PropTypes.number,
			jobName: PropTypes.string,
			count: PropTypes.number
		})
	),
	randomJobs: PropTypes.arrayOf(
		PropTypes.shape({
			code: PropTypes.number,
			jobName: PropTypes.string,
			count: PropTypes.number
		})
	),
};

export default withRouter(
	useGame(({ state }) => ({
		people: state.people,
		jobs: state.jobs,
		randomJobs: state.randomJobs
	}))(CheckRole)
);
