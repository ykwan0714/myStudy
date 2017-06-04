import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames'

const propTypes = {
};
const defaultProps = {
};
class ToDo extends Component {
	constructor(props) {
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	/* render가 된 직후 호출된다. */
	componentDidUpdate(prevProps){
		if(prevProps.editingId == null && this.props.editingId !== null){
			this._input.focus();
			this._input.value = this.props.contents;
		}
	}
	/* input 태그에서 keydown 이벤트가 발생되면 호출되는 function */
	handleKeyDown(e){
		const id = e.target.id;
		const text = e.target.value;
		if(!text || e.keyCode != 13) return;

		this.props.saveTodo(text);
		e.target.value = '';
	}

	render() {
		const {
			isDone,
			id,
			contents,
			toggleTodo,
			deleteTodo,
			editTodo,
			editingId,
			cancelEdit
		} = this.props;
		return(
			<li className={
					ClassNames('todo-item', {'completed' : isDone},{'editing' : id == editingId ? true : false})
				}>
				<button
					className='toggle'
					onClick={toggleTodo}
				/>
				<div
					className='todo-item__view'
					id = {id}
					onDoubleClick={editTodo}
				>
					<div className='todo-item__view__text'>
						{contents}
					</div>
					<button
						className='todo-item__destroy'
						onClick={deleteTodo}
					/>
				</div>
				<input
					ref={ref=>{this._input = ref;}}
					type='text'
					className='todo-item__edit'
					onBlur={cancelEdit}
					onKeyDown={this.handleKeyDown}
				/>
			</li>
		);
	}
}

ToDo.propTypes = propTypes;
ToDo.defaultProps = defaultProps;

export default ToDo;