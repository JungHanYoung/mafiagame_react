import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { JOB_NAME_OF_MAFIA } from '../../contants/Job';


class Mafia extends React.Component {
	handleSelectBtn = (name) => {
		const { toggleConfirmed, handleVote, changeNightTimeOrder } = this.props;
		toggleConfirmed()
		handleVote(name)
		changeNightTimeOrder()
	};
	render() {
		const { players, mafiaVotes } = this.props;
		return (
			<>
				<h1>당신은 마피아 입니다.</h1>
				<div>마피아 투표 현황</div>
				{Object.keys(mafiaVotes.toJS())
					.filter(key => mafiaVotes.get(key))
					.map(key => (
						<div key={`mafia-vote-co-${key}`}>
							<span>{key}</span><span>{mafiaVotes.get(key)}</span>
						</div>
					))}
				{/* {mafiaVotes.map(person => person.voter.length > 0 ? (
					<div>
						<h3>{person.name}을 죽인다.</h3>
						<ul>
							{person.voter.map(name => <li>{name}</li>)}
						</ul>
					</div>
				) : null)} */}
				<h2>죽일 사람을 선택하십시오.</h2>
				<div>
					{players
						.filter((person) => person.get('jobName') !== JOB_NAME_OF_MAFIA)
						.map((person, i) => (
							<button key={`mafia-select-${i}`} onClick={() => this.handleSelectBtn(person.get('name'))}>
								{person.get('name')}
							</button>
						))}
				</div>
			</>
		);
	}
}

Mafia.propTypes = {
	// // context
	// players: PropTypes.arrayOf(
	// 	PropTypes.shape({
	// 		name: PropTypes.string.isRequired,
	// 		daytimeVoted: PropTypes.number,
	// 		jobName: PropTypes.string.isRequired,
	// 		code: PropTypes.number
	// 	})
	// ).isRequired,
	// nightTimeOrder: PropTypes.number.isRequired,
	// votePersonAtMafiaTime: PropTypes.func.isRequired,
	// // parent
	// handleConfirmAndCheck: PropTypes.func.isRequired,
	// //
	// mafiaVotes: PropTypes.arrayOf(PropTypes.shape({
	// 	name: PropTypes.string.isRequired,
	// 	voter: PropTypes.arrayOf(PropTypes.string).isRequired
	// }))
	players: ImmutablePropTypes.list,
	mafiaVotes: ImmutablePropTypes.map,
	handleVote: PropTypes.func.isRequired,
	toggleConfirmed: PropTypes.func.isRequired,
	changeNightTimeOrder: PropTypes.func.isRequired
};

export default Mafia
