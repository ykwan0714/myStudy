import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames'

const propTypes = {
};
const defaultProps = {
};
class Footer extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<footer className='footer'>
				<span className='todo-count'>
					0 items left
				</span>
				<ul className='todo-filters'>
					<li><a>All</a></li>
					<li><a>Active</a></li>
					<li><a>Completed</a></li>
				</ul>
				<button className='todo-delete-completed'>
					Clear Completed
				</button>
			</footer>
		);
	}
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;