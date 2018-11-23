import React, { Component } from 'react';
import { Route } from "react-router-dom";
import GamesPage from '../games/GamesPage';
import GameFormPage from '../games/GameFormPage';
import Header from '../header/Header';
import Home from '../home/Home';

class App extends Component {
	render() {
		return (
			<div className="container">
				<Header />
				<div className="router-container">
					<Route exact path="/" component={Home} />
					<Route exact path="/games" component={GamesPage} />
					<Route exact path="/games/new" component={GameFormPage} />
					<Route exact path="/game/:_id" component={GameFormPage} />
				</div>
			</div>
		);
	}
}

export default App;
