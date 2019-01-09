import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Route Component
import Setting from './routes/Setting';
import GameStart from './routes/GameStart';
import About from './routes/About';

ReactDOM.render(
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route path="/setting" component={Setting} />
			<Route path="/start" component={GameStart} />
			<Route path="/about" component={About} />
		</div>
	</Router>,
	document.getElementById('root')
);
