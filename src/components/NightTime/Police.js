import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { JOB_NAME_OF_MAFIA } from '../../contants/Job';
import Layout from './Layout';

export default function Police({
	players, me, revoted, toggleConfirmed, changeNightTimeOrder
}) {

	const [selected, setSeleted] = useState(false)
	const [jobName, setJobName] = useState('')
	const [selectName, setSelectName] = useState('')

	function detectingByPolice(name) {
		const player = players.find(person => person.get('name') === name)

		setSeleted(true)
		setSelectName(player.get('name'))
		setJobName(player.get('jobName'))
	}

	function handleNextOrder() {
		toggleConfirmed()
		changeNightTimeOrder()
	}

	return revoted ? (
		<>
			<Layout describe={`재투표 중일때 경찰은 다른 이의 직업을 볼 수 없습니다.`} />
			<button onClick={handleNextOrder}>다음</button>
		</>
	) : (
			<>
				<Layout
					describe={`경찰의 차례입니다.
				한 사람을 선택해 마피아가 맞는지
				확인할 수 있습니다.`}>
					{!selected ?
						<div className="vote-btn-container">
							<div>
								{
									players
										.filter((person) => person.get('name') !== me.get('name'))
										.map((person, i) => (
											<button
												key={`police-select-${i}`}
												onClick={() => detectingByPolice(person.get('name'))}
												className="btn-sm"
											>
												{person.get('name')}
											</button>
										))
								}
							</div>
						</div>
						: <div>{selectName}님은 {jobName === JOB_NAME_OF_MAFIA ? <><b style={{ color: 'white' }}>마피아</b>입니다.</> : '마피아가 아닙니다.'}</div>}
				</Layout>
				{selected &&
					<button
						className="btn-lg"
						onClick={handleNextOrder}>다음</button>}
			</>
		)
}

// class Police extends Component {
// 	state = {
// 		selected: false,
// 		jobName: '',
// 		selectName: ''
// 	};
// 	detectingByPolice = (name) => {
// 		const { players } = this.props;
// 		const player = players.find((person) => person.get('name') === name);
// 		//.get('jobName') === JOB_NAME_OF_MAFIA
// 		this.setState({
// 			selected: true,
// 			selectName: player.get('name'),
// 			jobName: player.get('jobName')
// 		})
// 		// ? this.setState({
// 		// 	selected: true,
// 		// 	selectName: name,
// 		// 	jobName: true
// 		// })
// 		// : this.setState({
// 		// 	selected: true,
// 		// 	selectName: name,
// 		// 	isMafia: false
// 		// });
// 	};
// 	handleNextOrder = () => {
// 		const { changeNightTimeOrder, toggleConfirmed } = this.props;
// 		toggleConfirmed()
// 		changeNightTimeOrder()
// 	};
// 	render() {
// 		const { selected, selectName, jobName } = this.state;
// 		const { players, me, revoted } = this.props;
// 		return revoted ? (
// 			<>
// 				<Layout describe={`재투표 중일때 경찰은 다른 이의 직업을 볼 수 없습니다.`} />
// 				<button onClick={this.handleNextOrder}>다음</button>
// 			</>
// 		) : (
// 				<>
// 					<Layout
// 						describe={`경찰의 차례입니다.
// 							한 사람을 선택해 마피아가 맞는지
// 							확인할 수 있습니다.`}>
// 						{!selected ?
// 							<div className="vote-btn-container">
// 								<div>
// 									{
// 										players
// 											.filter((person) => person.get('name') !== me.get('name'))
// 											.map((person, i) => (
// 												<button
// 													key={`police-select-${i}`}
// 													onClick={() => this.detectingByPolice(person.get('name'))}
// 													className="btn-sm"
// 												>
// 													{person.get('name')}
// 												</button>
// 											))
// 									}
// 								</div>
// 							</div>
// 							: <div>{selectName}님은 {jobName === JOB_NAME_OF_MAFIA ? <><b style={{ color: 'white' }}>마피아</b>입니다.</> : '마피아가 아닙니다.'}</div>}
// 					</Layout>
// 					{selected &&
// 						<button
// 							className="btn-lg"
// 							onClick={this.handleNextOrder}>다음</button>}
// 				</>
// 			)
// 	}
// }

Police.propTypes = {
	// // context
	// players: PropTypes.arrayOf(
	// 	PropTypes.shape({
	// 		name: PropTypes.string.isRequired,
	// 		daytimeVoted: PropTypes.number,
	// 		jobName: PropTypes.string.isRequired,
	// 		code: PropTypes.number
	// 	})
	// ).isRequired,
	// nextOrder: PropTypes.func.isRequired,
	// // parent
	// handleConfirmAndCheck: PropTypes.func.isRequired
	players: ImmutablePropTypes.list,
	me: ImmutablePropTypes.map,
	revoted: PropTypes.bool.isRequired,
	toggleConfirmed: PropTypes.func.isRequired,
	changeNightTimeOrder: PropTypes.func.isRequired
};

// export default Police
