import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import LinkItem from "./LinkItem";

class Header extends Component {

	static contextTypes = {
		router:PropTypes.object.isRequired
	};

	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-success" style={{ marginBottom: "15px" }}>
				<Link className="navbar-brand" to="/">Games Admin Portal</Link>
				<button className="navbar-toggler"
					type="button" data-toggle="collapse"
					data-target="#navbarNav" aria-controls="navbarNav"
					aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav">
						<LinkItem to="/">Home</LinkItem>
						<LinkItem to="/games">Games</LinkItem>
						<LinkItem to="/games/new">Add New Game</LinkItem>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Header;
