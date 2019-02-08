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
			<div className="game-content">
				<p className="content-description">당신은 마피아 입니다.<br />죽일 사람을 선택하십시오.</p>
				<div>마피아 투표 현황</div>
				{Object.keys(mafiaVotes.toJS())
					.filter(key => mafiaVotes.get(key))
					.map(key => (
						<div key={`mafia-vote-co-${key}`}>
							<span>{key}</span><span>{mafiaVotes.get(key)}</span>
						</div>
					))}
				<div className="vote-btn-container">
					<div>
						{players
							.filter((person) => person.get('jobName') !== JOB_NAME_OF_MAFIA)
							.map((person, i) => (
								<button className="btn-sm" key={`mafia-select-${i}`} onClick={() => this.handleSelectBtn(person.get('name'))}>
									{person.get('name')}
								</button>
							))}
					</div>
				</div>
			</div>
		);
	}
}

Mafia.propTypes = {
	players: ImmutablePropTypes.list,
	mafiaVotes: ImmutablePropTypes.map,
	handleVote: PropTypes.func.isRequired,
	toggleConfirmed: PropTypes.func.isRequired,
	changeNightTimeOrder: PropTypes.func.isRequired
};

export default Mafia
