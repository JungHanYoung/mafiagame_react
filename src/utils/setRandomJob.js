export const setRandomJob = (people,jobs) => {
	/*
	 * people 배열을 랜덤으로 job을 붙여 주는 함수
	 */
	people.forEach((person,index) =>{
		let randomJobsIndex;
		do{
			randomJobsIndex = Math.floor(Math.random() * jobs.length);
		}while(!jobs[randomJobsIndex].count);
		people[index] = {
			name: person,
			code: jobs[randomJobsIndex].code,
			jobName: jobs[randomJobsIndex].jobName
		};
		jobs[randomJobsIndex].count -= 1;
		if(!jobs[randomJobsIndex].count){
			jobs.splice(randomJobsIndex,1);
		}
	});

	return people;
};
