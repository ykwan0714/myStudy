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
		const {
			todos,
			toggleTodo,
			deleteTodo,
			editTodo,
			editingId,
			cancelEdit,
			saveTodo
		} = this.props;

		const todoArr = todos.map(({id, contents, isDone}, idx)=>{
			return <Todo
					key = {idx}
					id = {id}
					contents = {contents}
					isDone = {isDone}
					toggleTodo = {()=>toggleTodo(id)}
					deleteTodo = {()=>deleteTodo(id)}
					editTodo = {()=>editTodo(id)}
					editingId = {editingId}
					cancelEdit = {cancelEdit}
					saveTodo = {(newContents)=>saveTodo(id, newContents)}
				/>
		});

		return(
			<div className='todo-app__main'>
				<ul className="todo-list">
					{todoArr}
				</ul>
			</div>
		);
	}
}

TodoList.propTypes = propTypes;
TodoList.defaultProps = defaultProps;

export default TodoList;