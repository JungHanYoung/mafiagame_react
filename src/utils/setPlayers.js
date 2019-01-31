export const setPlayers = (people, jobs, randomJobs) => {
	/*
	 * people 배열과 jobs 배열을 받아 players 반환
	 */
	let players = [];
	let tmpJobs = [];
	tmpJobs = jobs.map((job) => ({ ...job }));

	people.forEach((person, index) => {
		let randomJobsIndex;
		do {
			randomJobsIndex = Math.floor(Math.random() * tmpJobs.length);
		} while (!tmpJobs[randomJobsIndex].count);
		players[index] = {
			name: person,
			code: tmpJobs[randomJobsIndex].code,
			jobName: tmpJobs[randomJobsIndex].jobName
		};
		tmpJobs[randomJobsIndex].count -= 1;
		if (!tmpJobs[randomJobsIndex].count) {
			tmpJobs.splice(randomJobsIndex, 1);
		}
		// 필수 직업 배치 후 나머지 랜덤직업으로 세팅
		if(tmpJobs.length === 0 && randomJobs && randomJobs.length && index < people.length -1){
			tmpJobs = randomJobs.map((job) => ({ ...job }));
		}
	});

	return players;
};
