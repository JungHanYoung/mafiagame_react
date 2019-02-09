import React from 'react';
import ReactDOM from 'react-dom';
import './initialize.css'
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
import Result from './routes/Result';

ReactDOM.render(
	<GameProvider>
		<Router>
			<>
				<Route exact path="/" component={App} />
				<Route path="/setting" component={Setting} />
				<Route path="/check" component={CheckRole} />
				<Route path="/about" component={About} />
				<Route path="/game" component={Game} />
				<Route path="/result" component={Result} />
			</>
		</Router>
	</GameProvider>,
	document.getElementById('root')
);
