import React from 'react';

class AccountBook extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const {history} = this.props;

		const tr = history.map(({deposit, withdraw,balance},idx)=>(
				<tr key={idx} className={deposit > 0 ? 'dep' : 'with'}>
					<td>{deposit}</td>
					<td>{withdraw}</td>
					<td>{balance}</td>
				</tr>
			));
		return (
			<table>
				<thead>
					<tr>
						<th>입금</th>
						<th>출금</th>
						<th>잔액</th>
					</tr>
				</thead>
				<tbody>
					{tr}
				</tbody>
			</table>
		);
	}
}

export default AccountBook;
