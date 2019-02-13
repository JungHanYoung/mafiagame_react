export const setPlayers = (people, jobs) => {
	/*
	 * people 배열과 jobs 배열을 받아 players 반환
	 */

	let players = [];

	// 직업 이름 배열 만들기
	let jobNameList = [];
	let randJobNameList = [];
	jobs.forEach((job) => {
		for (let i = 0; i < job.minCount; i++) {
			jobNameList.push(job.jobName);
		}
		for (let i = 0; i < job.maxCount; i++) {
			randJobNameList.push(job.jobName);
		}
	});
	// 순서 섞기
	shuffleArray(jobNameList);

	// 최대 직업 이름 배열 만들고 순서 섞기
	//maxJobs.forEach((job) => {
	//	for(let i=0; i<job.count; i++){
	//		randJobNameList.push(job.jobName);
	//	}
	//});
	shuffleArray(randJobNameList);

	// 두 배열 합치기 뒤에 최대 직업이름이 들어가도록
	let totalJobNameList = [];
	totalJobNameList = jobNameList.concat(randJobNameList);

	people.forEach((person, idx) => {
		players[idx] = {
			name: person,
			jobName: totalJobNameList[idx]
		};
	});
	console.log(players);
	return players;
};

// 배열 섞는 함수
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
