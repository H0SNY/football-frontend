import classes from '../css/Leagues.module.css';
import '../../../MainHelper.css'
function Leagues(props){

	return(
		<div className = {`${classes.root} fadeIn`}>
			<div    className = {`container ${classes.leagueDescRoot}`}>
				<div>
				<p className = {classes.leaguesRootText}>Country</p>
				</div>
				
				<div>
				<p className = {classes.leaguesRootText}>Name</p>
				</div>
				
				<div>
				<p className = {classes.leaguesRootText}>Start Date</p>
				</div>
				
				<div>
				<p className = {classes.leaguesRootText}>End Date</p>
				</div>
			</div>

			<div className = {classes.leaguesRoot}>
				{props.leagues}
			</div>
		</div>
	)
}

export default Leagues;