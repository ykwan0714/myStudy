import React from 'react';

class InputBox extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
	componentDidUpdate(){
		this._input.value = '';
		this._input.focus();
	}
	handleChange(e){
		const value = e.target.value.replace(/[^\d]+/g,'');
		e.target.value = value;
	}
	handleClick(e){
		const text = e.target.innerHTML;
		const newBalance = parseInt(this._input.value,10);
		if(!newBalance){
			alert('숫자 입력하세요');
			return;
		}
		if(text == '입금'){
			this.props.depositToAccount(newBalance);
		}else{
			this.props.withdrawFromAccount(newBalance);
		}
	}
	handleKeyDown(e){
		const newBalance = parseInt(e.target.value,10);
		if(newBalance > 0 && e.keyCode == 13){
			this.props.depositToAccount(newBalance);
			e.target.value = '';
		}
	}
	render(){
		return (
			<div>
				<input
					ref = { ref=>this._input = ref }
					type="text"
					placeholder="숫자를 입력하세요."
					onChange = {this.handleChange}
					onKeyDown = {this.handleKeyDown}
				/>
				<button
					onClick = {this.handleClick}
				>
					입금
				</button>
				<button
					onClick = {this.handleClick}
				>
					출금
				</button>
			</div>
		);
	}
}

export default InputBox