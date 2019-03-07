import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { JOB_NAME_OF_MAFIA } from '../../contants/Job';
import Layout from './Layout';

export default function Mafia({
	players, mafiaVotes, handleVote, toggleConfirmed, changeNightTimeOrder
}) {
	function handleSelectBtn(name) {
		toggleConfirmed()
		handleVote(name)
		changeNightTimeOrder()
	}

	const mafias = Object.keys(mafiaVotes.toJS()).filter(mafia => mafiaVotes.get(mafia))

	return (
		<Layout
			describe={`당신은 마피아 입니다.
			죽일 사람을 선택하십시오.`}>
			{mafias.length > 0 && (
				<>
					<div>마피아 투표 현황</div>
					{mafias.map(mafia => (
						<div key={`mafia-vote-co-${mafia}`}>
							<span>{mafia}: </span><span>{mafiaVotes.get(mafia)}</span>
						</div>
					))}
				</>
			)}
			<div className="vote-btn-container">
				<div>
					{players
						.filter((person) => person.get('jobName') !== JOB_NAME_OF_MAFIA)
						.map((person, i) => (
							<button className="btn-sm" key={`mafia-select-${i}`} onClick={() => handleSelectBtn(person.get('name'))}>
								{person.get('name')}
							</button>
						))}
				</div>
			</div>
		</Layout>
	)
}

// class Mafia extends React.Component {
// 	handleSelectBtn = (name) => {
// 		const { toggleConfirmed, handleVote, changeNightTimeOrder } = this.props;
// 		toggleConfirmed()
// 		handleVote(name)
// 		changeNightTimeOrder()
// 	};
// 	render() {
// 		const { players, mafiaVotes } = this.props;
// 		const mafias = Object.keys(mafiaVotes.toJS()).filter(mafia => mafiaVotes.get(mafia))
// 		return (
// 			<Layout
// 				describe={`당신은 마피아 입니다.
// 			죽일 사람을 선택하십시오.`}>
// 				{mafias.length > 0 && (
// 					<>
// 						<div>마피아 투표 현황</div>
// 						{mafias.map(mafia => (
// 							<div key={`mafia-vote-co-${mafia}`}>
// 								<span>{mafia}: </span><span>{mafiaVotes.get(mafia)}</span>
// 							</div>
// 						))}
// 					</>
// 				)}
// 				<div className="vote-btn-container">
// 					<div>
// 						{players
// 							.filter((person) => person.get('jobName') !== JOB_NAME_OF_MAFIA)
// 							.map((person, i) => (
// 								<button className="btn-sm" key={`mafia-select-${i}`} onClick={() => this.handleSelectBtn(person.get('name'))}>
// 									{person.get('name')}
// 								</button>
// 							))}
// 					</div>
// 				</div>
// 			</Layout>
// 		);
// 	}
// }

Mafia.propTypes = {
	players: ImmutablePropTypes.list,
	mafiaVotes: ImmutablePropTypes.map,
	handleVote: PropTypes.func.isRequired,
	toggleConfirmed: PropTypes.func.isRequired,
	changeNightTimeOrder: PropTypes.func.isRequired
};

// export default Mafia
