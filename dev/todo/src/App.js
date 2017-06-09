import React from 'react';
import axios from 'axios'; //axios 추가
import update from 'immutability-helper'; // immutability-helper 추가

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

/* axios 인스턴스를 생성하여 반복을 줄인다. */
const ax = axios.create({
	baseURL : 'http://localhost:2403/todos'
});

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos : [],
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

	/* 컴포넌트가 마운트 되기전 실행되는 componentWillMount를 통해 todos를 수신한다. (최초 렌더링 직전)*/
	componentWillMount(){
		ax.get('/')
			.then(res=>{
				this.setState({
					todos : res.data
				})
			});
	}

	/* todo를 toggle하는 function */
	toggleTodo(id){
		const newTodos = [...this.state.todos];
		const editIndex = newTodos.findIndex(elem=>elem['id']==id);

		ax.put(`/${id}`, {isDone : !newTodos[editIndex].isDone})
			.then(res=>{
				newTodos[editIndex] = res.data;
				this.setState({
					todos : newTodos
				});
			});


	}
	/* 전부 체크일 때 전부 해제, 그 외에엔 모두 체크 하는 functon*/
	toggleAll(){
		const todos = [...this.state.todos];
		const activate = todos.some(elem=>!elem.isDone); // isDone이 false->true 그 반대도 되야한다.
		const axArr = todos.map(elem=>{
			return ax.put(`/${elem.id}`, {isDone : activate})
		}); //axArr = [ax.put(...) , ax.put(...), ...]

		axios.all(axArr).then(res=>{
			// res는 [res, res, res, ...] 의 형태
			const newTodos = res.map(elem=>elem.data);
			this.setState({
				todos : newTodos
			});
		});

	};
	/* todo를 delete하는 function */
	deleteTodo(id){
		const newTodos = [...this.state.todos];
		const deleteIndex = newTodos.findIndex(elem=>elem['id']==id);

		ax.delete(`/${id}`)
			.then(res=>{
				// apply immutability-helper
				this.setState({
					todos : update(newTodos,{$splice:[[deleteIndex, 1]]})
				});
			});
	}
	/* todo를 add하는 function */
	addTodo(contents){
		console.log('addTodo')
		ax.post('/', { contents : contents})
			.then(res=>{
				// apply immutability-helper
				this.setState({
					todos : update(this.state.todos, {$push : [res.data]})
				});
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
	/* 변경된 todo를 저장하는 function */
	saveTodo(id, newContents){
		const newTodos = [...this.state.todos];
		const saveIndex = newTodos.findIndex(elem=>elem['id'] == id);

		ax.put(`/${id}`, {contents : newContents})
			.then(res=>{
				newTodos[saveIndex] = res.data;
				this.setState({
					todos : newTodos,
					editingId : null
				});
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

		const axArr = this.state.todos
					.filter(elem=>elem.isDone)
					.map(elem=> ax.delete(`/${elem.id}`));
		axios.all(axArr)
			.then(()=>{
				const newTodos = this.state.todos.filter(elem=>!elem.isDone);
				this.setState({
					todos : newTodos
				});
			});

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