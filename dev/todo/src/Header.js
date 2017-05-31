
import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';

const propTypes = {
};
const defaultProps = {
};
class Header extends Component {
	constructor(props) {
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	handleKeyDown(event){
		const content = event.target.value;
		if(content.length>0 && event.keyCode == 13){
			this.props.addTodo(content);
			event.target.value = '';
		}
	}

	render() {
		return(
			<header>
				<h1 className ='todo-app__header'>todos</h1>
				<input
					type='text'
					className='todo-app__new-todo'
					placeholder='What needs to be done?'
					onKeyDown={this.handleKeyDown}
				/>
				<button
					className={
						ClassNames('toggle-all', {'checked' : this.props.isChecked})
					}
					onClick={this.props.toggleAll}
				/>
			</header>

		);
	}
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;