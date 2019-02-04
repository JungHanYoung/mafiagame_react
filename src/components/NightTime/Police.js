import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { useGame } from '../../context/GameContext';

class Police extends Component {
	state = {
		selected: false,
		isMafia: false,
		selectName: ''
	};
	detectingMafiaByPolice = (name) => {
		const { players } = this.props;
		players.find((person) => person.name === name).jobName === 'MAFIA'
			? this.setState({
				selected: true,
				selectName: name,
				isMafia: true
			})
			: this.setState({
				selected: true,
				selectName: name,
				isMafia: false
			});
	};
	handleNextOrder = () => {
		const { nextOrder, handleConfirmAndCheck } = this.props;
		handleConfirmAndCheck();
		nextOrder();
	};
	render() {
		const { isMafia, selected, selectName } = this.state;
		const { players } = this.props;
		return (
			<>
				<div className="game-content">
					<p className="content-description">경찰의 차례입니다.<br />경찰은 마피아로 의심되는 사람을 지목해 마피아가 맞는지 확인할 수 있습니다.</p>
					{!selected ?
						<div className="vote-btn-container">
							{
								players
									.filter((person) => person.jobName !== 'POLICE')
									.map((person, i) => (
										<button className="btn-sm" key={`police-select-${i}`} onClick={() => this.detectingMafiaByPolice(person.name)}>
											{person.name}
										</button>
									))}
						</div>
						:
						<p>
							{selectName}은 마피아가 {isMafia ? '맞습니다.' : '아닙니다.'}
						</p>
					}
				</div>
				{selected && <button className="btn-lg" onClick={this.handleNextOrder}>다음</button>}
			</>
		);
	}
}

Police.propTypes = {
	// context
	players: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			daytimeVoted: PropTypes.number,
			jobName: PropTypes.string.isRequired,
			code: PropTypes.number
		})
	).isRequired,
	nextOrder: PropTypes.func.isRequired,
	// parent
	handleConfirmAndCheck: PropTypes.func.isRequired
};

export default useGame(({ state, actions }) => ({
	players: state.players,
	nextOrder: actions.nextOrder
}))(Police);
