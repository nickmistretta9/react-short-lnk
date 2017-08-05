import React from 'react';
import {Link} from 'react-router';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ''
		};
	}
	onSubmit(e) {
		e.preventDefault();
		let email = this.refs.email.value.trim();
		let password = this.refs.password.value.trim();

		if(password.length < 7) {
			return this.setState({error: 'Password must be more than 6 characters long'});
		}

		Accounts.createUser({email, password}, (err) => {
			if(err) {
				this.setState({error:err.reason});
			} else {
				this.setState({error: ''});
			}
		});
	}
	render() {
		return (
			<div className="boxed-view">
				<div className="box">
					<h1>Join Short Lnk</h1>
					{this.state.error ? <p>{this.state.error}</p> : undefined}
					<form onSubmit={this.onSubmit.bind(this)} noValidate>
						<input type="email" ref="email" placeholder="Enter Your Email" name="Email" />
						<input type="password" ref="password" placeholder="Enter Your Password" name="Password" />
						<button className="button">Create Account</button>
					</form>
					<Link to="/">Already have an account?</Link>
				</div>
			</div>
		);
	}
}