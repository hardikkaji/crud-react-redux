import React, { Component } from 'react';
import PropTypes from "prop-types";
import GameCard from './GameCard';

class GamesList extends Component {
	static propTypes = {
		games: PropTypes.array.isRequired,
		deleteGame: PropTypes.func.isRequired
	};

	render() {
		const { games, deleteGame } = this.props;
		const emptyMessage = (
			<p>You dont have data in games collection.</p>
		);

		const gamesCollection = (
			<div className="row">
				<div className="card-deck">
					{ games.map(game => <GameCard game={game} key={game._id} deleteGame={deleteGame} />) }
				</div>
			</div>
		);

		return (
			<React.Fragment>
				{ games.length === 0 ? emptyMessage : gamesCollection }
			</React.Fragment>
		);
	}
}

export default GamesList;
