import React, { Component } from 'react';
import { connect } from "react-redux";
import { saveGame, fetchGame, updateGame } from '../../redux/actions';
import { Redirect }  from "react-router-dom";
import GameForm from './GameForm';

class GameFormPage extends Component {
	constructor(props) {
		super(props);

		this.saveGame = this.saveGame.bind(this);
	}

	state = {
		redirect: false
	};

	componentDidMount() {
		if (this.props.match.params._id) {
			this.props.fetchGame(this.props.match.params._id);
		}
	}

	saveGame({_id, title, coverUrl }) {
		if (_id) {
			return this.props.updateGame({ _id, title, coverUrl })
				.then(() => { this.setState({ redirect: true })})
		} else {
			return this.props.saveGame({ title, coverUrl })
				.then(() => { this.setState({ redirect: true })})
		}
	}

	render() {
		return (
			<React.Fragment>
				{
					this.state.redirect ?
						<Redirect to="/games" /> :
						<GameForm
							game={this.props.game}
							saveGame={this.saveGame}  />
				}
			</React.Fragment>
		);
	}
}


function mapStateToProps(state, props) {
	const _id = props.match.params._id;
	if (_id) {
		return {
			game: state.games.find(item => item._id === _id)
		};
	}

	return { game: null };
}

export default connect(mapStateToProps, { saveGame, fetchGame, updateGame })(GameFormPage);
