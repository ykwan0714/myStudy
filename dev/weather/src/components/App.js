import React from 'react';
import Menu from './Menu';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			menus : [
				{
					text : '지금ss'
				},
				{
					text : '예보'
				},
				{
					text : '알림'
				},
				{
					text : '지도'
				},
				{
					text : '설정'
				}
			]
		};
	}

	render(){
		return (
				<div id='lms-app'>
					<Menu menus = {this.state.menus}/>
				</div>
		);
	}
}

export default App;