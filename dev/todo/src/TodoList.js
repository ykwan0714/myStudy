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
		const todos = this.props.todos.map(({id, contents, isDone}, idx)=>{
			return <Todo
				id = {id}
				contents = {contents}
				isDone = {isDone}
				toggleTodo = {()=>this.props.toggleTodo(id)}
				deleteTodo = {()=>this.props.deleteTodo(id)}
			/>
		});

		return(
			<div className='todo-app__main'>
				<ul className="todo-list">
					{todos}
				</ul>
			</div>
		);
	}
}

TodoList.propTypes = propTypes;
TodoList.defaultProps = defaultProps;

export default TodoList;