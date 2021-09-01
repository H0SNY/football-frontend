import '../../../MainHelper.css'
import classes from '../css/Message.module.css';
import React from 'react'
class Message extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			msg : props.msg , 
			loading : props.loading
		};
	}
	render(){
		return(
			<div className = {`container ${classes.messageRoot}`}>
				<div>
					<div className = {classes.textRoot}>
						
						<p>
							{this.state.msg}
						</p>
					</div>

					<div className = {this.state.loading ? '' : classes.hide}>

						<div className = {`${classes.loader} ${this.state.loading ? '' : classes.hide}`}/>
						<div className = {classes.loading}></div>

					</div>

				</div>

			</div>
		)
	}
}

export default Message;