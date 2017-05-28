import React, { Component, PropTypes } from 'react';
import Todo from './Todo';

const propTypes = {
};
const defaultProps = {
};
class TodoList extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return(
			<div className='todo-app__main'>
				<ul className="todo-list">
					<Todo />
				</ul>
			</div>
		);
	}
}

TodoList.propTypes = propTypes;
TodoList.defaultProps = defaultProps;

export default TodoList;