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
			<li className={
					ClassNames('todo-item', {'completed' : this.props.isDone})
				}>
				<button
					className='toggle'
					onClick={this.props.toggleTodo}
				/>
				<div
					className='todo-item__view'
					id = {this.props.id}
				>
					<div className='todo-item__view__text'>
						{this.props.contents}
					</div>
					<button
						className='todo-item__destroy'
						onClick={this.props.deleteTodo}
					/>
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