import React, { Component } from 'react';
import classnames from 'classnames';

class GameForm extends Component {
	constructor(props) {
		super(props);

		this._onChange = this._onChange.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
	}

	state = {
		_id: this.props.game ? this.props.game._id : null,
		title: this.props.game ? this.props.game.title : '',
		coverUrl: this.props.game ? this.props.game.coverUrl :  '',
		errors: {}
 	};

	_onChange(event) {
		let errors = Object.assign({}, this.state.errors);
		delete errors[event.target.name];
		this.setState({
			[event.target.name]: event.target.value,
			errors
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.game && nextProps.game._id) {
			this.setState({
				_id: nextProps.game._id,
				title: nextProps.game.title,
				coverUrl: nextProps.game.coverUrl
			});
		}
	}

	_onSubmit(event) {
		event.preventDefault();

		let errors = {};

		if (this.state.title === '') errors.title = "This field is required";
		if (this.state.coverUrl === '') errors.coverUrl = "This field is required";

		this.setState({ errors });
		const isValid = Object.keys(errors).length === 0;

		if (isValid) {
			const { _id, title, coverUrl } = this.state;
			this.props.saveGame({ _id, title, coverUrl })
				.catch((err) => {
					err.response.json().then(({ errors }) => {
						this.setState({ errors });
					})
				});
		}
	}

	render() {
		return (
			<form noValidate onSubmit={this._onSubmit}>
				<div className="container">
					<h3 automationid="heading">{ this.state._id ? "Edit" : "Add" } Game</h3>
					{
						!!this.state.errors.global &&
						<div className="alert alert-danger" role="alert">
							{this.state.errors.global}
						</div>
					}
					<div className="form-group">
						<label htmlFor="title">Title</label>
						<input type="text" autoFocus
							placeholder="Title"
							className={classnames("form-control", {
								"is-invalid": !!this.state.errors.title
							})}
							onChange={this._onChange}
						 	name="title" value={this.state.title}
							id="title" />
							<div className="invalid-feedback">
								{this.state.errors.title}
							</div>
					</div>
					<div className="form-group">
						<label htmlFor="title">Cover URL</label>
						<input type="text"
							onChange={this._onChange}
							placeholder="Cover URL"
							className={classnames("form-control", {
								"is-invalid": !!this.state.errors.coverUrl
							})}
							name="coverUrl"
							value={this.state.coverUrl}
							id="coverUrl" />
						<div className="invalid-feedback">
							{this.state.errors.coverUrl}
						</div>
					</div>
					<div className="form-group">
						{
							this.state.coverUrl !== "" ?
								<img src={this.state.coverUrl} alt="cover" className="img" width="200"></img> :
								null
						}
					</div>
					<div className="form-group">
						<button className="btn btn-primary">Save</button>
					</div>
				</div>
			</form>
		);
	}
}


export default GameForm;
