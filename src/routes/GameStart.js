import React from 'react';

class GameStart extends React.Component {
	render() {
		const { jobs } = this.props.location.state;

		console.log(jobs);
		return (
			<div>
				GameStart Page... 준비중...
				{jobs.map((job) => <div key={job.code}>{`${job.jobName} : ${job.count}명`}</div>)}
			</div>
		);
	}
}

export default GameStart;
