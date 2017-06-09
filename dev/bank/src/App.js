import React from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			balance : 0,
			history : [
			]
		};
		this.depositToAccount = this.depositToAccount.bind(this);
		this.withdrawFromAccount = this.withdrawFromAccount.bind(this);
	}
	depositToAccount(balance){
		const newBalance = this.state.balance + balance;
		const newHistory = [...this.state.history, {
			deposit : balance,
			withdraw  : 0,
			balance : newBalance
		}];
		
		this.setState({
			balance : newBalance,
			history : newHistory
		});
	}

	withdrawFromAccount(balance){
		const newBalance = this.state.balance - balance;
		const newHistory = [...this.state.history, {
			deposit : 0,
			withdraw  : balance,
			balance : newBalance
		}];
		this.setState({
			balance : newBalance,
			history : newHistory
		})
	}
	render(){
		return (
			<div>
				<InputBox 
					depositToAccount = {this.depositToAccount}
					withdrawFromAccount = {this.withdrawFromAccount}
				/>
				<AccountBook
					history = {this.state.history}
				/>
			</div>
		)
	}
}

export default App;