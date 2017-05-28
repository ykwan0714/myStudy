
import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames';

const propTypes = {
};
const defaultProps = {
};
class Header extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<header>
				<h1 className ='todo-app__header'>todos</h1>
				<input
					type='text'
					className='todo-app__new-todo'
					placeholder='What needs to be done?'
				/>
				<button className='toggle-all'/>
			</header>

		);
	}
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;