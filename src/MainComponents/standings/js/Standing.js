import React from 'react';
import classes from '../css/Standing.module.css';
import '../../../MainHelper.css';
import { Message } from '../../index';
import {Link} from 'react-router-dom';
import { getViableName } from '../../../alg/helpers';
function Standing({standing , loading , leagueID}){
const {position , team , won , lost , draw , points , playedGames , goalsFor , goalsAgainst} = standing;
		
//jsx for standing
const standingJSX = (loading ? <Message loading/> : <Link to = {`/team/${leagueID}/${team?.id}`} className = {`container ${classes.root}`}> 
	<div className = 'container col-4'>
		<div className = "col-2">
			<p className = 'lightbold'>{position}</p>
		</div>

		<div className = "col-5">	

			<img alt = 'teamimg' src = {team?.crestUrl}/>
		</div>

		<div className = "col-5">
			<p className = 'lightbold'>{getViableName(team?.name)}</p>
		</div>

	</div>
	
	<div className = {`container col-6 ${classes.info}`}>
		<div className = "col-3">
			<p className = 'lightbold'>{playedGames}</p>
		</div>
		<div className = "col-3">
			<p className = 'lightbold'> {won}</p>
		</div>

		<div className = "col-3">
			<p className = 'lightbold'>{draw}</p>
		</div>

		<div className = "col-3">
			<p className = 'lightbold'>{lost}</p>
		</div>
		
	</div>

	
	
	<div className = "col-1">
		<p className = 'lightbold'>{`${goalsFor}:${goalsAgainst}`}</p>
	</div>
	<div className = "col-1">
		<p className = 'lightbold'>{points}</p>
	</div>
</Link> ) 

		return(
			<>
				{standingJSX}
			</>
		)
	
}

export default Standing;