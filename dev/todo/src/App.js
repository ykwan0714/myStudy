import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos : [
				{
					id : 0,
					contents : '오늘 할 일1',
					isDone : true
				},
				{
					id : 1,
					contents : '오늘 할 일2',
					isDone : false
				},
				{
					id : 2,
					contents : '오늘 할 일3',
					isDone : false
				},

			]
		}
		this.toggleTodo = this.toggleTodo.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
	}
	/* todo를 toggle하는 function */
	toggleTodo(id){
		const newTodos = [...this.state.todos];
		const editIndex = newTodos.findIndex(elem=>elem['id']==id);
		newTodos[editIndex] = Object.assign({}, newTodos[editIndex],{
			isDone : !newTodos[editIndex].isDone
		});

		this.setState({
			todos : newTodos
		});
	}
	/* todo를 delete하는 function */
	deleteTodo(id){
		const newTodos = [...this.state.todos];
		const deleteIndex = newTodos.findIndex(elem=>elem['id']==id);
		newTodos.splice(deleteIndex,1);

		this.setState({
			todos : newTodos
		});
	}
	render() {

		return(
			<div className='todo-app'>
				<Header/>
				<TodoList
					todos = {this.state.todos}
					toggleTodo = {this.toggleTodo}
					deleteTodo = {this.deleteTodo}
				/>
				<Footer/>
			</div>
		);
	}
}

export default App;