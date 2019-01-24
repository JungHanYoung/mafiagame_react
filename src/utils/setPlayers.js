export const setPlayers = (people,jobs) => {
	/*
	 * people 배열과 jobs 배열을 받아 players 반환
	 */
	let players = [];
	people.forEach((person,index) =>{
		let randomJobsIndex;
		do{
			randomJobsIndex = Math.floor(Math.random() * jobs.length);
		}while(!jobs[randomJobsIndex].count);
		players[index] = {
			name: person,
			code: jobs[randomJobsIndex].code,
			jobName: jobs[randomJobsIndex].jobName
		};
		jobs[randomJobsIndex].count -= 1;
		if(!jobs[randomJobsIndex].count){
			jobs.splice(randomJobsIndex,1);
		}
	});

	return players;
};
