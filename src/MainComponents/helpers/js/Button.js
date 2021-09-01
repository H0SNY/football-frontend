import styles from '../css/Button.module.css'
import React from 'react';

// adds a button with a and calls a click handler "onClick"
 class Button extends React.Component{
	constructor(props){
		super(props);
		this.onClickHandler = this.onClickHandler.bind(this);
		this.state = {
			onClick : props.onClick,
			classes : props.className , 
			text : props.text , 
			width : props.width , 
			bg : props.bg
		}

	}
	
	onClickHandler(){
		this.state.onClick();
	}
	
	render(){
		return(
				<div className = {this.state.classes}>
					<button type = 'button'  className = {styles.button} onClick = {this.onClickHandler} >{this.state.text}</button>
				</div>
			)
	}
		
		
	
}

export default Button;