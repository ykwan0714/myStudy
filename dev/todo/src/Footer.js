import React, { Component, PropTypes } from 'react';
import ClassNames from 'classnames'

const propTypes = {
};
const defaultProps = {
};
class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filterNames : ['All', 'Active', 'Completed']
		}

		this.handleClick = this.handleClick.bind(this);
	}
	/* a 태그를 클릭하면 실행되는 function */
	handleClick(e){
		var filterName = e.target.text;
		this.props.selectFilter(filterName);
	}
	render() {
		const {
			activeLength,
			filterName,
			clearComplete,
			hasComplete
		} = this.props;

		const filterButtons = this.state.filterNames.map((elem,idx)=>{
			return <li key={idx}>
						<a className=
							{ClassNames({'selected' : filterName == elem})}
							onClick={this.handleClick}
						>
							{elem}
						</a>
					</li>
		});
		return(
			<footer className='footer'>
				<span className='todo-count'>
					<strong>{activeLength}</strong>
					{' '}item
					{activeLength>0 ? 's' : ''}
					{' '}left
				</span>
				<ul className='todo-filters'>
					{filterButtons}
				</ul>
				<button
					className={
						ClassNames('todo-delete-completed',
						{hidden : !hasComplete})
					}
					onClick={clearComplete}
				>
					Clear Completed
				</button>
			</footer>
		);
	}
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;