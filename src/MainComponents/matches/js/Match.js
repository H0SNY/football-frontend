import React from 'react';
import '../../../MainHelper.css';
import classes from '../css/Match.module.css';
import '../../../MainHelper.css'
import { useEffect , useState } from 'react';
import { getLeague, getTeamImg } from '../../../BackendConnections/getFootball';
import { getViableName, stageToText } from '../../../alg/helpers';
function Match ({match , leagueType}){
	const {homeTeam , awayTeam , score  , matchday , utcDate , status , time , stage , leagueID , id} = match;
	const [homeImg , setHomeImg] = useState('');
	const [awayImg , setAwayImg] = useState('');
	const [leagueName , setLeagueName] = useState('');
	//getting teams logos
	useEffect(() =>{
		let mounted = true;
		const fetchImgs = async () =>{
			const Img1 = await getTeamImg(homeTeam.id);
			const Img2 = await getTeamImg(awayTeam.id);
			const league = await getLeague(leagueID);
			if(mounted){
				setHomeImg(Img1);
				setAwayImg(Img2);
				setLeagueName(league?.name);
			} 
		};
		fetchImgs();

		return () => mounted = false;
	} , [setHomeImg , setAwayImg, setLeagueName , homeTeam.id , awayTeam.id , leagueID])
		
	
	return(
		<div to = {`/match/${id}`} className = {`container ${classes.matchRoot}`}>
			<div className = {`${classes.teams} container col-4`}>

				<div className = {`container ${classes.homeTeam}`}>
						<img   aria-label = 'team-logo' src = {homeImg}/>	

						<p className = 'lightbold'>{ getViableName(homeTeam.name)}</p>
				</div>

				<div className = {` container ${classes.awayTeam}`}>
						<img  aria-label = 'team-logo' src = {awayImg} className = {`${classes.awayTeamLogo}`}/>

						<p className = 'lightbold'>{getViableName(awayTeam.name)}</p>
				</div>

			</div>

			<div className = {`container col-2 ${classes.score}`}>
				<p className = 'lightbold'>{score.fullTime.homeTeam}</p>
				<p className = 'lightbold'>{score.fullTime.awayTeam}</p>
			</div>

			<div className = {`container col-6 ${classes.info}`}>
				<div className = 'container'>
					<p className = {classes.dayL}>{utcDate}</p>
					<p className = {classes.time}>{time}</p>
					
				</div>
				
				
				<div>
					<p>{status}</p>
				</div>

				<div>
					<p>{leagueType === 'c' ? `Stage : ${stageToText(stage)}` : `WEEK : ${matchday}`} </p>
				</div>
				<div>
					<p>{leagueName} </p>
				</div>
			</div>
		</div>
			)
		
}

export default Match;