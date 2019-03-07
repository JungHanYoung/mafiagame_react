import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Component
import Discuss from './DayTimeDiscuss';
import VoteTime from './VoteTime';
import Result from './Result';
// import WhetherVictory from '../common/WhetherVictory';
import { TURN_OF_DISCUSS_AT_DAY, TURN_OF_VOTE_AT_DAY, TURN_OF_RESULT_AT_DAY } from '../../contants/turnOfGame/DayTime';

const SEQ_OF_TURN = [TURN_OF_DISCUSS_AT_DAY, TURN_OF_VOTE_AT_DAY, TURN_OF_RESULT_AT_DAY]

export default function DayTime({
	players,
	initVote,
	votePerson,
	changeDayAndNight,
	deletePlayer,
	moveToResult
}) {
	const [dayTimeOrder, setDayTimeOrder] = useState(0);

	function _changeDayTimeOrder() {
		dayTimeOrder === SEQ_OF_TURN.length - 1
			? changeDayAndNight() : setDayTimeOrder(dayTimeOrder + 1)
	}

	function _moveRevote() {
		initVote()
		setDayTimeOrder(SEQ_OF_TURN.indexOf(TURN_OF_VOTE_AT_DAY))
	}

	if (SEQ_OF_TURN[dayTimeOrder] === TURN_OF_DISCUSS_AT_DAY) {
		return <Discuss
			changeDayTimeOrder={_changeDayTimeOrder}
		/>
	} else if (SEQ_OF_TURN[dayTimeOrder] === TURN_OF_VOTE_AT_DAY) {
		return <VoteTime
			players={players}
			votePerson={votePerson}
			changeDayTimeOrder={_changeDayTimeOrder}
		/>
	} else if (SEQ_OF_TURN[dayTimeOrder] === TURN_OF_RESULT_AT_DAY) {
		return <Result
			players={players}
			changeDayTimeOrder={_changeDayTimeOrder}
			deletePlayer={deletePlayer}
			moveRevote={_moveRevote}
			moveToResult={moveToResult}
		/>
	} else {
		return <Redirect to="/" />
	}
}

// class DayTime extends React.Component {
// 	constructor(props) {
// 		super(props)

// 		this.state = {
// 			dayTimeOrder: 0
// 		}
// 	}
// 	changeDayTimeOrder = () => {
// 		const { dayTimeOrder } = this.state;
// 		const { changeDayAndNight } = this.props;
// 		if (dayTimeOrder === SEQ_OF_TURN.length - 1) {
// 			changeDayAndNight()
// 		} else {
// 			this.setState({
// 				dayTimeOrder: dayTimeOrder + 1
// 			})
// 		}
// 	}
// 	moveRevote = () => {
// 		const { initVote } = this.props;
// 		initVote()
// 		this.setState({
// 			dayTimeOrder: 1
// 		})
// 	}
// 	render() {
// 		const { dayTimeOrder } = this.state;
// 		const { players, votePerson, deletePlayer, moveToMain, moveToResult } = this.props
// 		return (
// 			<>
// 				{SEQ_OF_TURN[dayTimeOrder] === TURN_OF_DISCUSS_AT_DAY
// 					? <Discuss
// 						changeDayTimeOrder={this.changeDayTimeOrder}
// 					/>
// 					: SEQ_OF_TURN[dayTimeOrder] === TURN_OF_VOTE_AT_DAY
// 						? <VoteTime
// 							players={players}
// 							votePerson={votePerson}
// 							changeDayTimeOrder={this.changeDayTimeOrder}
// 						/>
// 						: SEQ_OF_TURN[dayTimeOrder] === TURN_OF_RESULT_AT_DAY
// 							? <Result
// 								players={players}
// 								changeDayTimeOrder={this.changeDayTimeOrder}
// 								deletePlayer={deletePlayer}
// 								moveToMain={moveToMain}
// 								moveRevote={this.moveRevote}
// 								moveToResult={moveToResult}
// 							/>
// 							: null}
// 				{/* 게임 종료 여부에 따른 버튼 */}
// 				{/* <WhetherVictory /> */}
// 			</>
// 		);
// 	}
// }

DayTime.propTypes = {
	//
	players: ImmutablePropTypes.list,
	changeDayAndNight: PropTypes.func.isRequired,
	votePerson: PropTypes.func.isRequired,
	deletePlayer: PropTypes.func.isRequired,
	moveToResult: PropTypes.func.isRequired,
	initVote: PropTypes.func.isRequired
};

// export default DayTime
