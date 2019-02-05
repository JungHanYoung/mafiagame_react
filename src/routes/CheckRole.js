import React from 'react';
import { Redirect as MyRedirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// component
import { useGame } from '../context/GameContext';
import { JOB_NAME_OF_MAFIA } from '../contants/Job';
import { setPlayers } from '../utils/setPlayers';

class CheckRole extends React.Component {
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
			return <MyRedirect to="/setting" />
		} else {
			return <div className="App-header">
				<h1 className="animated" ref="title">
					이제 각 사람 마다의 역할이 정해집니다.
			</h1>

				<h2>{players[showIndex].name}</h2>
				{showRole && <h2 className="animated fadeInUp delay-.1s">{players[showIndex].jobName}</h2>}
				{showRole && players[showIndex].jobName === JOB_NAME_OF_MAFIA &&
					<>
						<h3>동료 마피아</h3>
						{players.filter((player) => players[showIndex].name !== player.name
							&& player.jobName === JOB_NAME_OF_MAFIA)
							.map((player, i) => (
								<div key={`mafia-show-${i}`}>
									{player.name}
								</div>
							))}
					</>
				}

				<button onClick={this.handleShowRole} className="btn">
					다음
			</button>
			</div>
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
	)
};

export default withRouter(
	useGame(({ state, actions }) => ({
		people: state.people,
		jobs: state.jobs,
		randomJobs: state.randomJobs
	}))(CheckRole)
);
