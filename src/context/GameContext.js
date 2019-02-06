import React, { createContext, Component } from 'react';
import createUseConsumer from '../lib/createUseConsumer';
import { Object } from 'es6-shim';
import { setPlayers } from '../utils/setPlayers';

// Constant 상수
// import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_POLICE, JOB_NAME_OF_CITIZEN } from '../contants/Job';
import { DAY_TIME, NIGHT_TIME } from '../contants/turnOfGame/Game';
import { TURN_OF_DISCUSS_AT_DAY, TURN_OF_RESULT_AT_DAY, TURN_OF_VOTE_AT_DAY } from '../contants/turnOfGame/DayTime';
import { JOB_NAME_OF_MAFIA, JOB_NAME_OF_POLICE, JOB_NAME_OF_DOCTOR, JOB_NAME_OF_CITIZEN } from '../contants/Job';

const Context = createContext();

const { Provider, Consumer: GameConsumer } = Context;

// State Interface
/**
 * people: [string]		- 세팅시 입력받은 플레이어들의 이름
 * players: [{			- people과 jobs를 합쳐서 무작위로 역할지정된 다음의 플레이어들
 * 	code: number,
 * 	name: string,
 * 	jobName: string,
 * 	daytimeVoted: number
 * }]
 * jobs: [{				- 세팅 시에 정한 직업과 그 직업의 수
 * 	code: number
 * 	jobName: string
 * 	count: number
 * }]
 * isEndGame: boolean	- 게임이 끝나는 조건을 충족했을 때의 값
 * gameOrder: DAY_TIME | NIGHT_TIME		- 낮과 밤 설정
 * 
 * - 낮일 때 현재 게임 순서 (토론, 투표, 투표결과)
 * dayTimeOrder: TURN_OF_DISCUSS_AT_DAY | TURN_OF_VOTE_AT_DAY | TURN_OF_RESULT_AT_DAY
 * 
 * dayTimeVotedPerson: string	- 낮에 투표를 가장 많이 받은 사람
 * isEndVoteDayTime: boolean	- 낮에 투표가 끝났는지의 여부
 * isReVoted: boolean			- 재투표를 해야되는 지의 여부
 * isEndVoteNight: boolean		- 밤에 투표가 끝났는지 여부
 * mafiaVotes: [{
 * 	name: string
 * 	voter: [string]
 * }]
 * // Empty object | { [string]: number }	- 밤에 마피아에게 투표받은 사람이름과 투표갯수
 * doctorVotes: Empty object | { [string]: number }	- 밤에 의사에게 투표받은 사람이름과 투표갯수
 * victory: 'mafia' | 'citizen'	- 게임이 끝났을 때 누가 이겼는 지
 */

class GameProvider extends Component {
	// 데이터
	state = {
		people: [],
		jobs: [
			{
				code: 1,
				jobName: JOB_NAME_OF_MAFIA,
				count: 0
			},
			{
				code: 2,
				jobName: JOB_NAME_OF_POLICE,
				count: 0
			},
			{
				code: 3,
				jobName: JOB_NAME_OF_DOCTOR,
				count: 0
			},
			{
				code: 4,
				jobName: JOB_NAME_OF_CITIZEN,
				count: 0
			}
		],
		randomJobs: [
			{
				code: 1,
				jobName: JOB_NAME_OF_MAFIA,
				count: 0
			},
			{
				code: 2,
				jobName: JOB_NAME_OF_POLICE,
				count: 0
			},
			{
				code: 3,
				jobName: JOB_NAME_OF_DOCTOR,
				count: 0
			},
			{
				code: 4,
				jobName: JOB_NAME_OF_CITIZEN,
				count: 0
			}
		]
		// isEndGame: false,
		// gameOrder: DAY_TIME,
		// dayTimeOrder: TURN_OF_DISCUSS_AT_DAY,
		// dayTimeVotedPerson: '',
		// isEndVoteDayTime: false,
		// isReVoted: false,
		// isEndVoteNight: false,
		// mafiaVotes: [],
		// doctorVotes: [],
		// victory: '',
		// //
		// killed: ''
	};

	actions = {
		// Setting > onPeopleChange - 드롭박스로 사람인원을 정했을 때, people에 배열 요소 할당
		setPeopleNum: (value) => {
			this.setState({
				people: Array.from({ length: value }, (v, k) => k).map(() => '')
			});
		},
		// Setting > input:number - job의 수를 입력받아 핸들링
		onChangeJobCount: (code, value) => {
			const { jobs } = this.state;
			if (value >= 0) {
				this.setState({
					jobs: jobs.map(job => job.code === code ? { ...job, count: value } : job)
				})
			}
		},
		onChangeRandomJobCount: (code, value) => {
			const { randomJobs } = this.state;
			if (value >= 0) {
				this.setState({
					randomJobs: randomJobs.map(job => job.code === code ? { ...job, count: value } : job)
				})
			}
		},
		// Setting > render > input - 세팅에서 플레이어이름 입력 인풋 핸들링
		onChangePeopleName: (i, value) => {
			const { people } = this.state;

			this.setState({
				people: people.map((v, index1) => (i === index1 ? value : v))
			});
		},
		// CheckRole > componentWillMount - 세팅 끝난 후, players 무작위 역할지정 및 마피아,의사투표 초기화
		setRolePeople: () => {
			const { jobs, people, randomJobs } = this.state;

			// console.log(randomJobs)

			const players = setPlayers(people, jobs, randomJobs);

			this.setState({
				players
			});
		},
		// Game > componentWillMount - 게임이 시작되었을 때, 플레이어들의 낮 투표수 초기화
		setPeopleVoted: () => {
			this.setState({
				players: [
					...this.state.players.map((person) => {
						return Object.assign(person, { daytimeVoted: 0 });
					})
				]
			});
		},
		// VoteTime > handleVote 	- 낮 투표
		votePerson: (name) => {
			return new Promise((resolve, reject) => {
				this.setState({
					players: this.state.players.map((person) => {
						if (person.name === name) {
							return {
								...person,
								daytimeVoted: person.daytimeVoted + 1
							};
						} else {
							return person;
						}
					})
				});
				resolve()
			})

		},
		// VoteTime > handleVote	- 모든 플레이어가 투표를 끝내면 가장 많은 투표를 받은 인원을 제외시킴, 승리여부판단까지
		endVoteTime: () => {
			// 투표 끝..
			// 투표를 많이 받은 사람은 people에서 삭제
			// 투표 수를 초기화시킴.
			const { players } = this.state;
			console.table(players)
			const maxNumOfVotes = players.reduce(
				(max, cur) => max.daytimeVoted > cur.daytimeVoted ? max : cur
			).daytimeVoted;
			console.log(maxNumOfVotes)
			const maxOfVotesPlayers = players.filter(player => player.daytimeVoted === maxNumOfVotes)
			console.log(maxOfVotesPlayers)
			const c_people = [...players];

			if (maxOfVotesPlayers.length === 1) {
				const maxVotedIndex = players.reduce((max, cur, index) =>
					players[max].daytimeVoted < cur.daytimeVoted ? index : max
					, 0);
				const votedPerson = c_people.splice(maxVotedIndex, 1)[0];
				c_people.forEach((person) => {
					Object.assign(person, { daytimeVoted: 0 });
				});

				// 마피아인 사람
				const mafias = c_people.filter((person) => person.jobName === JOB_NAME_OF_MAFIA);
				// 마피아가 아닌 사람
				const citizen = c_people.filter((person) => person.jobName !== JOB_NAME_OF_MAFIA);
				// 만약 마피아가 1명도 없다면
				if (mafias.length === 0) {
					this.setState({
						players: c_people,
						dayTimeOrder: TURN_OF_RESULT_AT_DAY,
						dayTimeVotedPerson: votedPerson,
						// 게임은 끝나고
						isEndGame: true,
						// 시민이 승리
						victory: 'citizen'
					});
					// 만약 마피아가 마피아가 아닌 사람과 같거나 많으면
				} else if (mafias.length >= citizen.length) {
					this.setState({
						players: c_people,
						dayTimeOrder: TURN_OF_RESULT_AT_DAY,
						dayTimeVotedPerson: votedPerson,
						// 게임은 끝나고
						isEndGame: true,
						// 마피아가 승리
						victory: 'mafia'
					});
					// 위의 두 조건이 만족하지 않으면
				} else {
					// 그대로 게임 진행..
					this.setState({
						players: c_people,
						dayTimeOrder: TURN_OF_RESULT_AT_DAY,
						isEndVoteDayTime: true,
						dayTimeVotedPerson: votedPerson
					});
				}
			} else {
				c_people.forEach((person) => {
					Object.assign(person, { daytimeVoted: 0 });
				});
				this.setState({
					players: c_people,
					dayTimeOrder: TURN_OF_RESULT_AT_DAY,
					isReVoted: true
				})
			}
		},
		// DayTimeDiscuss > button	- 토론 끝나고 투표로 넘어갈 때
		changeDayTimeOrder: () => {
			const { dayTimeOrder } = this.state;
			if (dayTimeOrder === TURN_OF_VOTE_AT_DAY) {
				this.setState({
					dayTimeOrder: TURN_OF_RESULT_AT_DAY
				});
			} else if (dayTimeOrder === TURN_OF_DISCUSS_AT_DAY) {
				this.setState({
					dayTimeOrder: TURN_OF_VOTE_AT_DAY
				});
			} else if (dayTimeOrder === TURN_OF_RESULT_AT_DAY) {
				this.setState({
					dayTimeOrder: TURN_OF_DISCUSS_AT_DAY,
					isReVoted: false
				});
			}
		},
		// WhetherVictory > button	- 낮 투표결과 후 밤으로 갈때
		setNightTime: () => {
			const { players } = this.state;
			this.setState({
				gameOrder: NIGHT_TIME,
				isEndVoteDayTime: false,
				mafiaVotes: players.map(person => ({
					name: person.name,
					voter: []
				})),
				doctorVotes: players.map(person => ({
					name: person.name,
					voter: []
				})),
				isReVoted: false
			});
		},
		// Mafia > handleSelectBtn	- 마피아가 제외시킬 사람 투표
		votePersonAtMafiaTime: (name, voter) => {
			const { mafiaVotes } = this.state;
			return new Promise((resolve, reject) => {
				this.setState({
					mafiaVotes: mafiaVotes.map(person =>
						person.name === name ? { ...person, voter: person.voter.concat(voter) } : person
					)
				})
				resolve()
			})
		},
		// Doctor > handleSelectBtn - 의사가 투표
		votePersonAtDoctor: (name, voter) => {
			const { doctorVotes } = this.state;
			return new Promise((resolve, reject) => {
				this.setState({
					doctorVotes: doctorVotes.map(person => person.name === name ? { ...person, voter: person.voter.concat(voter) } : person),
				});
				resolve()
			})
		},
		// Result(Night) > componentWillMount - 밤 투표 결과 셋팅, 승리여부, 마피아, 의사
		resultAtNight: () => {
			const { players, doctorVotes, mafiaVotes } = this.state;

			// 마피아에게 받은 가장 많은 투표수 - 동률체크
			const maxNumOfVotedByMafia = mafiaVotes.reduce(
				(max, cur) =>
					max.voter.length > cur.voter.length
						? max
						: cur
			).voter.length
			// 
			const isOverlapOfMafia = mafiaVotes.filter(person => person.voter.length === maxNumOfVotedByMafia).length !== 1

			if (isOverlapOfMafia) {
				this.setState({
					isReVoted: true
				})
			} else {

				const killName = mafiaVotes.find(person => person.voter.length === maxNumOfVotedByMafia).name

				const afterKilled = players.filter((player) => player.name !== killName);
				const mafias = afterKilled.filter((player) => player.jobName === JOB_NAME_OF_MAFIA);
				const citizen = afterKilled.filter((player) => player.jobName !== JOB_NAME_OF_MAFIA);


				/**
				 * doctorVotes: [
				 * 	{
					* 	name: '1',
					* 	voter: ['2', '3']
					* }
				 * ]
				 */

				const savePeople = doctorVotes
					.filter(person => person.voter.length > 0)
					.map(person => person.name)

				console.table(savePeople);
				console.log('killName:', killName)
				if (!savePeople.includes(killName)) {
					// 마피아 승리조건을 충족 ( 마피아 수가 시민 수와 같으면 )
					if (mafias.length >= citizen.length) {
						this.setState({
							players: afterKilled,
							isEndGame: true,
							victory: 'mafia',
							killed: killName
						});
						// 아님 마피아는 사람을 죽임.
					} else {
						this.setState({
							players: afterKilled,
							killed: killName
						});
					}
				}
			}
		},
		// WhetherVictory > button - 재투표하기로 결과가 나왔을 때, 재투표 버튼 핸들링
		voteAgainAtNight: () => {
			this.setState({
				isReVoted: false,
				mafiaVotes: {},
				doctorVotes: {}
			});
		},
		// WhetherVictory > button - 낮으로 전환
		setDayTime: () => {
			const { players } = this.state;
			this.setState({
				players: players.map((person) => {
					return Object.assign(person, { daytimeVoted: 0 });
				}),
				isEndVoteDayTime: false,
				isEndVoteNight: false,
				gameOrder: DAY_TIME,
				dayTimeOrder: TURN_OF_DISCUSS_AT_DAY
			});
		},
		// WhetherVictory > moveToMain - 게임 마무리 됬을 때, 메인화면으로 나옴.
		moveToMainAndReset: () => {
			this.setState(
				{
					players: [],
					isEndGame: false,
					gameOrder: DAY_TIME,
					dayTimeOrder: TURN_OF_DISCUSS_AT_DAY,
					dayTimeVotedPerson: '',
					isEndVoteDayTime: false,
					isEndVoteNight: false,
					mafiaVotes: {},
					doctorVotes: {}
				},
				() => console.log(this.state.jobs)
			);
		},
		setIsEndVoteAtNight: () => {
			return new Promise((resolve, reject) => {
				this.setState({
					isEndVoteNight: true
				})
				resolve(0)
			})
		}
	};

	render() {
		const { state, actions } = this;
		const value = { state, actions };
		return <Provider value={value}>{this.props.children}</Provider>;
	}
}

const useGame = createUseConsumer(GameConsumer);

export { GameProvider, GameConsumer, useGame };
