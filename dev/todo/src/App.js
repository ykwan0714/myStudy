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
			],
			editingId : null,
			filterName : 'All'
		}
		this.toggleTodo = this.toggleTodo.bind(this);
		this.toggleAll = this.toggleAll.bind(this);
		this.deleteTodo = this.deleteTodo.bind(this);
		this.addTodo = this.addTodo.bind(this);
		this.editTodo = this.editTodo.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.saveTodo = this.saveTodo.bind(this);
		this.selectFilter = this.selectFilter.bind(this);
		this.clearComplete = this.clearComplete.bind(this);
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

		const todos = [...this.state.todos];
		const activate = todos.some(elem=>!elem.isDone); // isDone이 false->true 그 반대도 되야한다.
		this.setState({
				todos : todos.map((elem, idx)=>{
					return Object.assign({},elem,{
						isDone : activate
					})
				})
		});

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

		this.setState({
			todos :
			[
				...this.state.todos,
				{
					id : new Date(),
					contents : contents,
					isDone : false
				}
			]
		});
	}
	/* todo를 edit 모드로 변경하는 function */
	editTodo(id){
		this.setState({
			editingId : id
		});
	}
	/* todo의 edit 모드를 해제하는 function */
	cancelEdit(){
		this.setState({
			editingId : null
		});
	}
	/* 새로운 todo를 추가하는 function */
	saveTodo(id, newContents){
		const newTodos = [...this.state.todos];
		const saveIndex = newTodos.findIndex(elem=>elem['id'] == id);
		newTodos[saveIndex] = Object.assign({}, newTodos[saveIndex], {
			contents : newContents
		});
		this.setState({
			todos : newTodos,
			editingId : null
		});
	}
	/* 선택된 filter이름을 변경하는 function */
	selectFilter(filterName){
		this.setState({
			filterName : filterName
		})
	}
	/* 완료한 todo를 filtering하여 없애는 function */
	clearComplete(){
		const newTodos = this.state.todos.filter(elem=>!elem.isDone);
		this.setState({
			todos : newTodos
		})
	}

	render() {
		// 활성화 된 todo를 filtering 한다.
		const filterTodos = (this.state.filterName == 'All' ? this.state.todos :
			this.state.todos.filter(elem=>(
				(this.state.filterName == 'Active' && !elem.isDone) ||
				(this.state.filterName == 'Completed' && elem.isDone)
			))
		);

		// 활성화 된 todo의 length를 계
		const activeLength = filterTodos.filter(elem=>!elem.isDone).length;
		// 완료된 todo가 존재하는지 확인
		const hasComplete = filterTodos.some(elem=>elem.isDone);

		return(
			<div className='todo-app'>
				<Header
					addTodo={this.addTodo}
					toggleAll={this.toggleAll}
					isChecked={this.state.todos.every(elem=>elem.isDone)}
				/>
				<TodoList
					todos = {filterTodos}
					toggleTodo = {this.toggleTodo}
					deleteTodo = {this.deleteTodo}
					editTodo = {this.editTodo}
					editingId = {this.state.editingId}
					cancelEdit = {this.cancelEdit}
					saveTodo = {this.saveTodo}
				/>
				<Footer
					activeLength = {activeLength}
					filterName = {this.state.filterName}
					selectFilter = {this.selectFilter}
					clearComplete = {this.clearComplete}
					hasComplete = {hasComplete}
				/>
			</div>
		);
	}
}

export default App;