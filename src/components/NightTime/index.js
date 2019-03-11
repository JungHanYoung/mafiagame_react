import React, { useState } from 'react';
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Component
import Mafia from './Mafia';
import Doctor from './Doctor';
import Police from './Police';
import Citizen from './Citizen';
import Result from './Result';
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN } from '../../contants/Job';

export default function Night({
	players, changeDayAndNight, deletePlayer, moveToResult
}) {

	const [confirmed, setConfirmed] = useState(false);
	const [nightTimeOrder, setNightTimeOrder] = useState(0);
	const [isEndVote, setIsEndVote] = useState(false);
	const [mafiaVotes, setMafiaVotes] = useState(
		players
			.filter(player => player.get('jobName') === JOB_NAME_OF_MAFIA)
			.reduce((acc, cur) => acc.set(cur.get('name'), ''), Map({})),
	);
	const [doctorVotes, setDoctorVotes] = useState(
		players
			.filter(player => player.get('jobName') === JOB_NAME_OF_DOCTOR)
			.reduce((acc, cur) => acc.set(cur.get('name'), ''), Map({})),
	);
	const [revoted, setReVoted] = useState(false)

	function _changeNightTimeOrder() {
		if (players.size - 1 === nightTimeOrder) {
			setIsEndVote(true)
		} else {
			setNightTimeOrder(nightTimeOrder + 1)
		}
	}

	const _toggleConfirmed = () => setConfirmed(!confirmed)

	const _voteByMafia = (mafia) => (name) => setMafiaVotes(mafiaVotes.set(mafia, name))
	const _voteByDoctor = (voter) => (name) => setDoctorVotes(doctorVotes.set(voter, name))

	function _voteAgain() {
		setConfirmed(false);
		setNightTimeOrder(0)
		setMafiaVotes(
			players
				.filter(player => player.get('jobName') === JOB_NAME_OF_MAFIA)
				.reduce((acc, cur) => acc.set(cur.get('name'), ''), Map({})),
		)
		setIsEndVote(false)
		setReVoted(true)
	}

	if (isEndVote) {
		return <Result
			mafiaVotes={mafiaVotes}
			doctorVotes={doctorVotes}
			deletePlayer={deletePlayer}
			changeDayAndNight={changeDayAndNight}
			voteAgain={_voteAgain}
			players={players}
			moveToResult={moveToResult}
		/>
	} else if (confirmed) {
		if (players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_MAFIA) {
			return <Mafia
				players={players}
				mafiaVotes={mafiaVotes}
				handleVote={_voteByMafia(players.getIn([nightTimeOrder, 'name']))}
				toggleConfirmed={_toggleConfirmed}
				changeNightTimeOrder={_changeNightTimeOrder}
			/>
		} else if (players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_POLICE) {
			return <Police
				players={players}
				me={players.get(nightTimeOrder)}
				toggleConfirmed={_toggleConfirmed}
				changeNightTimeOrder={_changeNightTimeOrder}
				revoted={revoted}
			/>
		} else if (players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_DOCTOR) {
			return <Doctor
				players={players}
				handleVote={_voteByDoctor(players.getIn([nightTimeOrder, 'name']))}
				toggleConfirmed={_toggleConfirmed}
				changeNightTimeOrder={_changeNightTimeOrder}
				revoted={revoted}
			/>
		} else if (players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_CITIZEN) {
			return <Citizen
				toggleConfirmed={_toggleConfirmed}
				changeNightTimeOrder={_changeNightTimeOrder}
			/>
		} else {
			console.error('게임에 적용되지 않는 직업이 감지되었습니다.')
			return null
		}
	} else {
		return <>
			<div className="game-content">
				<div className="game-guide">{players.getIn([nightTimeOrder, 'name'])}의 차례입니다.</div>
			</div>
			<button
				className="btn-lg"
				onClick={_toggleConfirmed}>역할 확인</button>
		</>
	}
}

Night.propTypes = {
	players: ImmutablePropTypes.list,
	changeDayAndNight: PropTypes.func.isRequired,
	deletePlayer: PropTypes.func.isRequired,
	moveToResult: PropTypes.func.isRequired
};

// class Night extends React.Component {
// 	constructor(props) {
// 		super(props)

// 		const { players } = this.props;

// 		this.state = {
// 			confirmed: false,
// 			nightTimeOrder: 0,
// 			isEndVote: false,
// 			mafiaVotes: players
// 				.filter(player => player.get('jobName') === JOB_NAME_OF_MAFIA)
// 				.reduce((acc, cur) => acc.set(cur.get('name'), ''), Map({})),
// 			doctorVotes: players
// 				.filter(player => player.get('jobName') === JOB_NAME_OF_DOCTOR)
// 				.reduce((acc, cur) => acc.set(cur.get('name'), ''), Map({})),
// 			revoted: false
// 		}
// 	}

// 	changeNightTimeOrder = () => {
// 		const { nightTimeOrder } = this.state;
// 		const { players } = this.props
// 		if (players.size - 1 === nightTimeOrder) {
// 			this.setState({
// 				isEndVote: true
// 			})
// 		} else {
// 			this.setState({
// 				nightTimeOrder: nightTimeOrder + 1
// 			})
// 		}
// 	}

// 	toggleConfirmed = () => {
// 		this.setState(state => ({
// 			confirmed: !state.confirmed
// 		}))
// 	}

// 	voteByMafia = (mafia) => (name) => {
// 		const { mafiaVotes } = this.state
// 		this.setState({
// 			mafiaVotes: mafiaVotes.set(mafia, name)
// 		})
// 	}

// 	voteByDoctor = (voter) => (name) => {
// 		const { doctorVotes } = this.state
// 		this.setState({
// 			doctorVotes: doctorVotes.set(voter, name)
// 		})
// 	}

// 	voteAgain = () => {

// 		const { players } = this.props;

// 		this.setState({
// 			confirmed: false,
// 			nightTimeOrder: 0,
// 			mafiaVotes: players
// 				.filter(player => player.get('jobName') === JOB_NAME_OF_MAFIA)
// 				.reduce((acc, cur) => acc.set(cur.get('name'), ''), Map({})),
// 			isEndVote: false,
// 			revoted: true
// 		})
// 	}

// 	render() {
// 		const { confirmed, nightTimeOrder, isEndVote, mafiaVotes, doctorVotes, revoted } = this.state;
// 		const { players, changeDayAndNight, deletePlayer, moveToResult } = this.props;

// 		return (
// 			<>
// 				{isEndVote ? (
// 					<Result
// 						mafiaVotes={mafiaVotes}
// 						doctorVotes={doctorVotes}
// 						deletePlayer={deletePlayer}
// 						changeDayAndNight={changeDayAndNight}
// 						voteAgain={this.voteAgain}
// 						players={players}
// 						moveToResult={moveToResult}
// 					/>
// 				) : (
// 						<>
// 							{confirmed ? (
// 								<>
// 									{players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_MAFIA ? (
// 										<Mafia
// 											players={players}
// 											mafiaVotes={mafiaVotes}
// 											handleVote={this.voteByMafia(players.getIn([nightTimeOrder, 'name']))}
// 											toggleConfirmed={this.toggleConfirmed}
// 											changeNightTimeOrder={this.changeNightTimeOrder}
// 										/>
// 									) : players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_POLICE ? (
// 										<Police
// 											players={players}
// 											me={players.get(nightTimeOrder)}
// 											toggleConfirmed={this.toggleConfirmed}
// 											changeNightTimeOrder={this.changeNightTimeOrder}
// 											revoted={revoted}
// 										/>
// 									) : players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_DOCTOR ? (
// 										<Doctor
// 											players={players}
// 											handleVote={this.voteByDoctor(players.getIn([nightTimeOrder, 'name']))}
// 											toggleConfirmed={this.toggleConfirmed}
// 											changeNightTimeOrder={this.changeNightTimeOrder}
// 											revoted={revoted}
// 										/>
// 									) : players.getIn([nightTimeOrder, 'jobName']) === JOB_NAME_OF_CITIZEN ? (
// 										<Citizen
// 											toggleConfirmed={this.toggleConfirmed}
// 											changeNightTimeOrder={this.changeNightTimeOrder}
// 										/>
// 									) : null}
// 								</>
// 							) : (
// 									<>
// 										<div className="game-content">
// 											<h1>{players.getIn([nightTimeOrder, 'name'])}의 차례입니다.</h1>
// 										</div>
// 										<button
// 											className="btn-lg"
// 											onClick={this.toggleConfirmed}>역할 확인</button>
// 									</>
// 								)}
// 						</>
// 					)}


// 				{/* {nightTimeOrder === 'mafia' && <Mafia />}
// 					{nightTimeOrder === 'doctor' && <Doctor />}
// 					{nightTimeOrder === 'police' && <Police />}
// 					{nightTimeOrder === 'result' && <Result />} */}
// 			</>
// 		);
// 	}
// }

// export default Night
