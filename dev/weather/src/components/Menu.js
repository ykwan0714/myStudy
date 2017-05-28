import React, { Component, PropTypes } from 'react';
import MenuItem from './MenuItem';

const propTypes = {
};
const defaultProps = {
};
class Menu extends Component {
	constructor(props) {
		super(props);

	}
	render() {
		console.log(this.props.menus);
		const menuItems = this.props.menus.map(({text}, idx)=>{
			return <MenuItem
					text={text}
				/>
			});
		return(
			<header className="menu">
				{menuItems}
			</header>
		);
	}
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;