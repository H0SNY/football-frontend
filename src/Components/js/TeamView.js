import React, { useContext } from 'react';
import '../../MainHelper.css';
import classes from '../css/TeamView.module.css';
import {Squad  , CompetitionPreview , TeamSignature, Matches} from '../../MainComponents/index';
import {  useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {getTeam, getTeamMatches} from '../../BackendConnections/getFootball'
import { TeamViewContext } from '../../state/providers/TeamViewProvider';
function TeamView(){
	const param = useParams();
	const {team : teamState , matches : matchesState , pagination , reset , setMatchesErr , setMatchesLoading , 
	setMatches , setTeamErr , setTeam , setTeamLoading , setPagination} = useContext(TeamViewContext);
	const {loading : teamLoading , err : teamErr , team} = teamState;
	const {loading : matchesLoading , err : matchesErr , matches} = matchesState;
	const {start , end , page} = pagination;


	//effect for fetching team if needed
	useEffect(() =>{
		let mounted = true;
		const fetchTeam = async () =>{
			try{
				const teamRes = await getTeam(param.teamID);
				if(!teamRes) throw new Error('Cannot Fetch Team');
				else{
					if(mounted){
						setTeam(teamRes);
						setTeamLoading(false);
					}
				}
				
				
			}catch(err){
				console.log(`${err.message} , teamView/useEffect`);
				if(mounted){
					setTeam();
					setTeamLoading(false);
					setTeamErr(err.message);
				}
			}
		};
		fetchTeam();
		return () => mounted = false;
	} , [param.leagueID , param.teamID , setTeam , setTeamLoading , setTeamErr]);
	
	useEffect(() =>{
		let mounted = true;
		const fetchData = async () =>{
			try{
				const teamMatchesRes = await getTeamMatches(param.teamID);
				if(!teamMatchesRes || !teamMatchesRes.length) throw new Error('Matches Not Found');
				if(mounted) setMatches(teamMatchesRes);
				setMatchesLoading(false);
			}catch(err){
				setMatches([]);
				setMatchesLoading(false);
				setMatchesErr(err.message);
			}
		};
		fetchData();

		return() => mounted = false;
	} , [setMatches , setMatchesErr , setMatchesLoading, param.teamID])

	useEffect(() =>{
		return () => reset();
	} , [reset])


	const nextHandler = () =>{
		setPagination('next');
	}
	const prevHandler = () =>{
		setPagination('prev');
	}

	
	const competitionPreviewToJSX = comp =>{
		return <div key = {comp.id} className = {`${classes.competitionPreviewRoot}`}> <CompetitionPreview loading = {teamLoading} err = {teamErr} key = {comp.id} {...comp}/> </div>
	}

	const competitionPreviewsToJSX = comps =>{
		return comps.map(competitionPreviewToJSX)
	}



	return(

	<div className = {`container ${classes.teamRoot} slideIn`}>

			
			{!teamLoading && !teamErr && <TeamSignature loading = {teamLoading} err = {teamErr} crestUrl = {team?.crestUrl} name = {team?.name} founded = {team?.founded}/>}
			
			<div className = {`${classes.activeCompetitionsRoot} container`}>
				<div className = {`${classes.activeCompetitionsDesc} container`}>
					<p>Active Competitions</p>
				</div>
				<div className = {`${classes.competitions} container`}>
					{!teamLoading && !teamErr && competitionPreviewsToJSX(team.activeCompetitions)}
				</div>
			</div>

			<div className = {`${classes.matchesDesc}`}>
				<p>Matches</p>
			</div>
			<Matches matches = {matches} start = {start} end = {end} page = {page}
			loading = {matchesLoading} err = {matchesErr} onNext = {nextHandler}
			onPrev = {prevHandler}
			/>
			<div className = {`${classes.squadDesc}`}>
				<p>Squad</p>
			</div>

			<Squad squad = {team?.squad}/>

			

		</div>
	
		
	)
}

export default TeamView;