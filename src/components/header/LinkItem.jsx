import React, { Component } from 'react';
import classnames from "classnames";
import { Link, withRouter } from "react-router-dom";

class LinkItem extends Component {
	render() {
		const { to, location, children } = this.props;
		const listClassName = classnames("nav-item", {
			"active": location.pathname === to
		});
		return (
			<li className={listClassName}>
				<Link className="nav-link" to={to} automationid={children}>{children}</Link>
			</li>
		);
	}
}

export default withRouter(LinkItem);
