import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'animate.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { GameProvider } from './context/GameContext';

// Route Component
import Setting from './routes/Setting';
import CheckRole from './routes/CheckRole';
import About from './routes/About';
import Game from './routes/Game';

ReactDOM.render(
	<GameProvider>
		<Router>
			<Fragment>
				<Route exact path="/" component={App} />
				<Route path="/setting" component={Setting} />
				<Route path="/check" component={CheckRole} />
				<Route path="/about" component={About} />
				<Route path="/game" component={Game} />
			</Fragment>
		</Router>
	</GameProvider>,
	document.getElementById('root')
);
