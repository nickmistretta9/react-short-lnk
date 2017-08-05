import React from 'react';
import Modal from 'react-modal';
import {Meteor} from 'meteor/meteor';

export default class AddLink extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			isOpen: false,
			error:''
		};
	}
	onChange(e) {
		this.setState({
			url: e.target.value.trim()
		});
	}
	handleModalClose() {
		this.setState({isOpen:false, url:'', error:''});
	}
	onSubmit(e) {
		const {url} = this.state;
		e.preventDefault();
		Meteor.call('links.insert', url, (err, res) => {
			if(!err) {
				this.handleModalClose();
			} else {
				this.setState({error:err.reason});
			}
		});
	}
	render() {
		return (
			<div>
				<button className="button" onClick={() => this.setState({isOpen:true})}>+ Add Link</button>
				<Modal 
					isOpen={this.state.isOpen} 
					contentLabel="Add Link"
					onAfterOpen={() => {this.refs.url.focus()}}
					onRequestClose={this.handleModalClose.bind(this)}
					className="box"
					overlayClassName="boxed-view modal">
					<h1>Add Link</h1>
					{this.state.error ? <p>{this.state.error}</p> : undefined}
					<form onSubmit={this.onSubmit.bind(this)}>
						<input 
							type="text" 
							placeholder="Url"
							ref="url" 
							value={this.state.url} 
							onChange={this.onChange.bind(this)} />
						<button className="button">Add Link</button>
						<button type="button" className="button secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
					</form>
				</Modal>
			</div>
		);
	}
}