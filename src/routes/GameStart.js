import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class GameStart extends React.Component {
	// componentWillMount() {
	// 	const state = this.props.location.state;
	// 	if (!state) {
	// 		console.log('do not setting');
	// 		console.log(this.props.history);
	// 		// this.props.history.goBack({ hello: 'world' });
	// 		this.props.history.replace('/', { hello: 'world' });
	// 		return false;
	// 	}
	// }
	render() {
		const state = this.props.location.state;

		console.log(state ? state.jobs : 'no state');
		return (
			<div>
				GameStart Page... 준비중...
				{/* {!jobs && <Redirect to="/" />} */}
				{state ? (
					state.jobs.map((job) => <div key={job.code}>{`${job.jobName} : ${job.count}명`}</div>)
				) : (
					<Redirect to={{ pathname: '/', state: { redirectMesg: 'do not setting...' } }} />
				)}
			</div>
		);
	}
}

export default withRouter(GameStart);
