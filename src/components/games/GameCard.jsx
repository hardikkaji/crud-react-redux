import React, { Component } from 'react';
import { Link } from "react-router-dom";

class GameCard extends Component {
	render() {
		const { game, deleteGame } = this.props;
		return (
			<div className="col-md-4 col-xl-3">
				<div className="card" style={{marginBottom: "15px"}}>
					<img className="card-img-top img" src={game.coverUrl} alt={game.title} />
					<div className="card-body">
						<p className="card-text">{game.title}</p>
					</div>
					<div className="card-footer">
						<Link to={`/game/${game._id}`} className="btn btn-sm btn-success">Edit</Link>&nbsp;
						<button className="btn btn-sm btn-danger" onClick={() => deleteGame(game._id)}>Delete</button>
					</div>
				</div>
			</div>
		);
	}
}

export default GameCard;
