import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import GamesList from "./GamesList";
import { fetchGames, deleteGame } from "../../redux/actions";

class GamesPage extends Component {
	static propTypes = {
		games: PropTypes.array.isRequired,
		fetchGames: PropTypes.func.isRequired
	};

	componentDidMount() {
		this.props.fetchGames();
	}

	render() {
		return (
			<div className="container">
				<h3>Games List</h3>
				<GamesList games={this.props.games} deleteGame={this.props.deleteGame} />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		games: state.games
	};
}

export default connect(mapStateToProps, { fetchGames, deleteGame })(GamesPage);
