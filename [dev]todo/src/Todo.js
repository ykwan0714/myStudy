import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames'

const propTypes = {
};
const defaultProps = {
};
class ToDo extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(

			<li className='todo-item'>
				<button className='toggle'/>
				<div className='todo-item__view'>
					<div className='todo-item__view__text'></div>
					<button className='todo-item__destroy'/>
				</div>
				<input
					type='text'
					className='todo-item__edit'
				/>
			</li>
		);
	}
}

ToDo.propTypes = propTypes;
ToDo.defaultProps = defaultProps;

export default ToDo;