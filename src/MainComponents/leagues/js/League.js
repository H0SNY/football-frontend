import '../../../MainHelper.css';
import React from 'react'
import classes from '../css/League.module.css';
import {Link} from 'react-router-dom';
function League(props){
	const {league} = props;
	const {id , country , name   , currentSeasonStart , currentSeasonEnd} = league;

		return(
			<Link  to = {`/league/${id}`}  className = {`container ${classes.leagueRoot}`}>
				<div>
					<p className = 'bold'>{country}</p>
				</div>
				
				<div>
					<p className = 'bold'>{name}</p>
				</div>
				
				<div>
					<p className = 'bold'>{currentSeasonStart ? currentSeasonStart : 'Cannot Load'}</p>
				</div>
				
				<div>
					<p className = 'bold'>{currentSeasonEnd ? currentSeasonEnd : 'Cannot Load'}</p>
				</div>
			</Link>
		)
	
}

export default League;