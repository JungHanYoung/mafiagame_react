export const setPlayers = (people, jobs, randomJobs) => {
	/*
	 * people 배열과 jobs 배열을 받아 players 반환
	 */
	let players = [];
	let tmpJobs = [];
	tmpJobs = jobs.map((job) => ({ ...job }));

	let hasRandomJobs = randomJobs.length ? true : false;

	people.forEach((person, index) => {
		let randomJobsIndex;
		// count가 0인 직업 배열에서 제거
		tmpJobs = tmpJobs.filter((job) => (job.count));
		// 직업 랜덤 인덱스
		randomJobsIndex = Math.floor(Math.random() * tmpJobs.length);
		// 랜덤 직업 설정
		players[index] = {
			name: person,
			code: tmpJobs[randomJobsIndex].code,
			jobName: tmpJobs[randomJobsIndex].jobName
		};
		// 설정된 직업 카운트 다운
		tmpJobs[randomJobsIndex].count -= 1;
		// 설정 된 직업 카운트 0일 경우
		if (!tmpJobs[randomJobsIndex].count) {
			// 필수 직업들 배치 모두 끝난 경우 나머지 랜덤직업으로 세팅
			if(tmpJobs.length === 1 && hasRandomJobs){
				tmpJobs = randomJobs.map((job) => ({ ...job }));
				hasRandomJobs = false;
			}else{
				// 아직 필수 직업이 남은 경우 해당 직업만 배열에서 제거
				tmpJobs.splice(randomJobsIndex, 1);
			}
		}
	});
	console.table(players);

	return players;
};
