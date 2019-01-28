import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// component
import { useGame } from '../context/GameContext';
import { JOB_NAME_OF_MAFIA } from '../contants/Job';

class CheckRole extends React.Component {
	state = {
		showRole: false,
		showIndex: 0
	};
	componentWillMount() {
		this.props.setRolePeople();
	}

	handleShowRole = () => {
		const { showRole, showIndex } = this.state;
		const { players } = this.props;

		showRole
			? this.setState({
				showRole: false
			})
			: this.setState({
				showRole: true
			});

		showRole &&
			players.length > showIndex + 1 &&
			this.setState({
				showIndex: showIndex + 1
			});

		showRole && players.length === showIndex + 1 && this.props.history.push('/game');
	};

	render() {
		const { showRole, showIndex } = this.state;
		const { players, gameStart } = this.props;

		if (gameStart) {
			return <div>game</div>;
		} else {
			return players.length > 0 ? (
				<div className="App-header">
					<h1 className="animated" ref="title">
						이제 각 사람 마다의 역할이 정해집니다.
					</h1>

					<h2>{players[showIndex].name}</h2>
					{showRole && <h2 className="animated fadeInUp delay-.1s">{players[showIndex].jobName}</h2>}
					{showRole && players[showIndex].jobName === JOB_NAME_OF_MAFIA &&
						<Fragment>
							<h3>동료 마피아</h3>
							{players.filter((player) => players[showIndex].name !== player.name
								&& player.jobName === JOB_NAME_OF_MAFIA)
								.map((player, i) => (
									<div key={`mafia-show-${i}`}>
										{player.name}
									</div>
								))}
						</Fragment>
					}

					<button onClick={this.handleShowRole} className="btn">
						다음
					</button>
				</div>
			) : null;
		}
	}
}

CheckRole.propTypes = {
	players: PropTypes.array,
	people: PropTypes.arrayOf(PropTypes.string),
	jobs: PropTypes.arrayOf(
		PropTypes.shape({
			code: PropTypes.number,
			jobName: PropTypes.string,
			count: PropTypes.number
		})
	),
	setRolePeople: PropTypes.func.isRequired
};

export default withRouter(
	useGame(({ state, actions }) => ({
		players: state.players,
		people: state.people,
		jobs: state.jobs,
		setRolePeople: actions.setRolePeople
	}))(CheckRole)
);
