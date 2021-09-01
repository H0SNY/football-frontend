import '../../../MainHelper.css';
import classes from '../css/Scorer.module.css';

function Scorer(props){
	const {scorer} = props;
	const {player , team , numberOfGoals , rank} = scorer;
	return(
		<div className = {`container ${classes.playerRoot}`}>
			<div className = 'col-3'>
				<p className = 'lightbold'>
					{rank}
				</p>
			</div>

			<div className = 'col-3'>
				<p className = 'lightbold'>
					{player.name}
				</p>
			</div>

			<div className = 'col-3'>
				<p className = 'lightbold'>
					{team.name}
				</p>
			</div>

			<div className = 'col-3'>
				<p className = 'lightbold'>
					{numberOfGoals}
				</p>
			</div>
		</div>
	)
}

export default Scorer;