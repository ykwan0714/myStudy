import React, { Component, PropTypes } from 'react';

const propTypes = {
};
const defaultProps = {
};
class MenuItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggle : false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.setState({
			isToggle : !this.state.isToggle
		});
	}

	render() {
		const style = this.state.isToggle ? {fontWeight:'bold'} : {fontWeight : 'normal'};
		return(
			<div className="menu__item"
				onClick={this.handleClick}
				style={style}
			>
				{this.props.text}
			</div>
		);
	}
}

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;