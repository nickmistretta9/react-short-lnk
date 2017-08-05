import React from 'react';
import {Accounts} from 'meteor/accounts-base';

const PrivateHeader = (props) => {
	return (
		<div className="top-bar">
			<div className="header-content">
				<h1>{props.title}</h1>
				<button className="button link-text" onClick={() => Accounts.logout()}>Logout</button>
			</div>
		</div>
	);
}

PrivateHeader.propTypes = {
	title: React.PropTypes.string.isRequired
}

export default PrivateHeader;