import React from 'react';
import PropTypes from 'prop-types';

// Component
import Discuss from './DayTimeDiscuss';
import VoteTime from './VoteTime';
import Result from './Result';
// import WhetherVictory from '../common/WhetherVictory';
import { TURN_OF_DISCUSS_AT_DAY, TURN_OF_VOTE_AT_DAY, TURN_OF_RESULT_AT_DAY } from '../../contants/turnOfGame/DayTime';

const SEQ_OF_TURN = [TURN_OF_DISCUSS_AT_DAY, TURN_OF_VOTE_AT_DAY, TURN_OF_RESULT_AT_DAY]

class DayTime extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			dayTimeOrder: 0
		}
	}
	changeDayTimeOrder = () => {
		const { dayTimeOrder } = this.state;
		const { changeDayAndNight } = this.props;
		if (dayTimeOrder === SEQ_OF_TURN.length - 1) {
			changeDayAndNight()
		} else {
			this.setState({
				dayTimeOrder: dayTimeOrder + 1
			})
		}
	}
	render() {
		const { dayTimeOrder } = this.state;
		const { players } = this.props
		return (
			<>
				{SEQ_OF_TURN[dayTimeOrder] === TURN_OF_DISCUSS_AT_DAY
					? <Discuss
						changeDayTimeOrder={this.changeDayTimeOrder}
					/>
					: SEQ_OF_TURN[dayTimeOrder] === TURN_OF_VOTE_AT_DAY
						? <VoteTime
							players={players}
							changeDayTimeOrder={this.changeDayTimeOrder}
						/>
						: SEQ_OF_TURN[dayTimeOrder] === TURN_OF_RESULT_AT_DAY
							? <Result
								players={players}
								changeDayTimeOrder={this.changeDayTimeOrder}
							/>
							: null}
				{/* 게임 종료 여부에 따른 버튼 */}
				{/* <WhetherVictory /> */}
			</>
		);
	}
}

DayTime.propTypes = {
	//
	players: PropTypes.array.isRequired,
	changeDayAndNight: PropTypes.func.isRequired
};

export default DayTime
