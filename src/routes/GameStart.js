import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

// component
import Game from './Game';

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
			<div className="App-header">
				GameStart Page... 준비중...
				{/* {!jobs && <Redirect to="/" />} */}
				{state ? (
					state.jobs.map((job) => <div key={job.code}>{`${job.jobName} : ${job.count}명`}</div>)
				) : (
					<Redirect to={{ pathname: '/', state: { redirectMesg: 'do not setting...' } }} />
				)}
				<Game num={state.num} jobs={state.jobs} people={state.people} />
			</div>
		);
	}
}

export default withRouter(GameStart);
