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
				}
			]
		}
		this.toggleTodo = this.toggleTodo.bind(this);
		this.toggleAll = this.toggleAll.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.addTodo = this.addTodo.bind(this);
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
	/* 전부 체크일 때 전부 해제, 그 외에엔 모두 체크 하는 functon*/
	toggleAll(){

		const activate = this.state.todos.some(elem=>!elem.isDone); // isDone이 false->true 그 반대도 되야한다.
		const todos = [...this.state.todos];
		this.setState({
				todos : todos.map((elem, index)=>{
					return Object.assign({},elem,{
						isDone : activate
					})
				})
		});
		/*const isAllActivate = todos.every(elem=>elem.isDone); // 모두 true면 true
		if(isAllActivate){ // 모두 해제
			const newTodos = todos.map((elem, index)=>{
				return Object.assign({},elem,{
					isDone : false
				})
			});
			//newTodos.isChecked = false;
			this.setState({
				todos : newTodos,
				isChecked : false
			});
		}else{ // 모두 선택
			const newTodos = todos.map((elem, index)=>{
				return Object.assign({},elem,{
					isDone : true
				})
			});
			//newTodos.isChecked = true;
			this.setState({
				todos : newTodos,
				isChecked : true
			});
		}*/


	};
	/* todo를 delete하는 function */
	deleteTodo(id){
		const newTodos = [...this.state.todos];
		const deleteIndex = newTodos.findIndex(elem=>elem['id']==id);
		newTodos.splice(deleteIndex,1);

		this.setState({
			todos : newTodos
		});
	}
	/* todo를 add하는 function */
	addTodo(contents){
		/*
		const todo = {
			id : this.state.todos.length,
			contents : contents,
			isDone : false
		};
		const newTodos = [...this.state.todos, todo];
		*/
		this.setState({
			todos :
			[
				...this.state.todos,
				{
					id : this.state.todos.length,
					contents : contents,
					isDone : false
				}
			]
		});


	}
	render() {

		return(
			<div className='todo-app'>
				<Header
					addTodo={this.addTodo}
					toggleAll={this.toggleAll}
					isChecked={this.state.todos.every(elem=>elem.isDone)}
				/>
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