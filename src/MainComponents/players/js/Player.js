import '../../../MainHelper.css';
import classes from '../css/Player.module.css';
function Player(props){
	const {player} = props; 
	const { name , position , dateOfBirth , 
	nationality , shirtNumber} = player;


	const date = new Date();
	const currentYear = date.getFullYear();
	const playerBornYear = dateOfBirth ? dateOfBirth.slice(0 , 4) : 'Cannot Load';
	return(
		<div className = {`container ${classes.playerRoot} `}>
			<div className = 'col-2'>
				<p>{shirtNumber}</p>
			</div>

			<div className = 'col-2'>
				<p>{name}</p>
			</div>	
			
			<div className = 'col-2'>
				<p>{nationality}</p>
			</div>

			<div className = 'col-2'>
				<p>{position}</p>
			</div>

			<div className = 'col-2'>
				<p>{`${currentYear - playerBornYear}`}</p>
			</div>

			
		</div>
	)
}

export default Player;