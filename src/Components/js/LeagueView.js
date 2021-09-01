import { useContext, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import '../../MainHelper.css';
import {Standings , Matches , Scorers } from '../../MainComponents/index';
import {    getLeagueScorers  , getLeagueStandings, getMatchesByMatchday, getTotalMatchdays, getMatchesByStage, isCompetition, getTotalStages, getCurrentMatchday } from '../../BackendConnections/getFootball';
import { LeagueViewContext } from '../../state/providers/LeagueViewProvider';
import classes from '../css/LeagueView.module.css';
import { getCompCalender, getLeagueCalender, isComp, stageToText, textToStage } from '../../alg/helpers.js';
function LeagueView(){
	let {leagueType , standings , matches , scorers , standings_loading , matches_loading , scorers_loading , 
	standings_err , matches_err , scorers_err , 
	 standingsPagination , matchesPagination , scorersPagination ,
	 calender , setLeagueType , setCalenderMatchday , setCalenderTotal , setStandingsErr , setMatchesErr , 
	 setScorersErr, setStandings , setMatches , setScorers , setStandingsLoading , setMatchesLoading , setScorersLoading , 
	 setStandingsPagination , setMatchesPagination , setScorersPagination , reset} = useContext(LeagueViewContext);

	const param = useParams();

	
//effect to fetch standings 
useEffect(() =>{
	let mounted = true;
	const fetchData = async () =>{
		try{
			const standingsRes = await getLeagueStandings(param.leagueID);
			if(!standingsRes) throw new Error('Standings Not Found');
			else{
				if(mounted){
					setStandings(standingsRes);
					setStandingsLoading(false);
				}
			} 
			
		}catch(err){
			if(mounted){
				setStandingsLoading(false);
				setStandings([]);
				setStandingsErr(err.message);
			}
		}
	};
	fetchData();
	return () => mounted = false;
} , [param.leagueID , setStandings , setStandingsErr , setStandingsLoading]);
		
		
	//fetching total weekdays or stages
useEffect(() =>{
	let mounted = true;
	const fetchData = async () =>{
		try{
			const check = await isCompetition(param.leagueID);
			if(mounted){
				if(check){
					setLeagueType('c');
					const stages = await getTotalStages(param.leagueID);
					setCalenderTotal(stages);
					setCalenderMatchday(stages[0]);
				}else{
					const matchdays = await getTotalMatchdays(param.leagueID);
					const curr = await getCurrentMatchday(param.leagueID);
					setLeagueType('l');
					setCalenderTotal(matchdays);
					setCalenderMatchday(curr);
				}
			} else return;

			
		}catch(err){
			if(mounted){
				setMatchesErr(err.message);
				setCalenderTotal();
				setMatches([]);
			}
		}
	};
	fetchData();
	return () => mounted = false;
} , [param.leagueID , setCalenderTotal , setCalenderMatchday , setMatchesErr , setMatches , setLeagueType]);


//fetching matches
useEffect(() =>{
	let mounted = true;
	const fetchData = async () =>{
		try{
			let matchesRes = [];
			if(leagueType === 'c') matchesRes = await getMatchesByStage(param.leagueID , calender.matchday);
			
			else  matchesRes = await getMatchesByMatchday(param.leagueID , calender.matchday);
			
			if(!matchesRes) throw new Error('Cannot Retrieve Matches');

			else{
				if(mounted){
						setMatches(matchesRes);	
						setMatchesLoading(false)
				} 
			} 
			
			
		}catch(err){
			if(mounted){
				setMatchesLoading(false);
				setMatches([]);
				setMatchesErr(err.message);
			}
		}
		
	};
	fetchData();
	return () => mounted = false;
} , [param.leagueID , leagueType , calender.matchday , setMatches , setMatchesLoading , setMatchesErr , setCalenderTotal]);


//fetching scorers
useEffect(() =>{
	let mounted = true;
	const fetchData = async () =>{
		try{
			const scorersRes = await getLeagueScorers(param.leagueID);
			if(!scorersRes) throw new Error('Cannot Retrieve Scorers')
			else{
				if(mounted){
					setScorers(scorersRes);
					setScorersLoading(false);	
				}
			}
		}catch(err){
			if(mounted){
				setScorersErr(err.message);
				setScorers([]);
				setScorersLoading(false);
			}

		}
		
	};
	fetchData();
	return () => mounted = false;
} , [param.leagueID , setScorers , setScorersErr , setScorersLoading]);


//componentWillUnmount , reset state
useEffect(() =>{
	return () =>{
		reset();
	}
} , [reset])



const standingsNextHandler = () =>{
	setStandingsPagination("next");
}
const standingsPrevHandler = () =>{
	setStandingsPagination("prev");
}


const matchesNextHandler = () =>{
	setMatchesPagination("next");
}
const matchesPrevHandler = () =>{
	setMatchesPagination("prev");
}


const scorersNextHandler = () =>{
	setScorersPagination("next");
}
const scorersPrevHandler = () =>{
	setScorersPagination("prev");

}


const calenderHandler = (e) =>{
	const result = leagueType === 'c' ? textToStage(e.target.textContent) : e.target.textContent;
	setCalenderMatchday(result);
	setMatchesLoading(true)
}	



let {total , matchday} = calender;
let arr = [[]];
	//creating calender

	//if its a competition
	if(leagueType === 'c') arr = getCompCalender(total , calenderHandler);

	//if its a league
	else arr = getLeagueCalender(total , calenderHandler) 

	return(
		<div className = {`fadeIn ${classes.root}`}>

			<Standings leagueType = {leagueType}  page = {standingsPagination.page} start = {standingsPagination.start} 
			end = {standingsPagination.end} onNext = {standingsNextHandler} onPrev = {standingsPrevHandler} 
			leagueID = {param.leagueID} standings = {standings} loading = {standings_loading} err = {standings_err}/>

				<div className = {`${classes.calenderRoot} slideIn`}>
					{arr.map((row) =>
					<div key = {Math.random() * 1213215} className = {`container ${classes.row}`}>
						{row}
					</div>)}
				</div>

				<div className = {`container ${classes.currentmatchday}`}>
					<p>{!Number(matchday) || `Weekday`} {isComp(matchday) ?  stageToText(calender.matchday) : calender.matchday}</p>
				</div>

			<Matches leagueType = {leagueType} page = {matchesPagination.page} start = {matchesPagination.start}
			 end = {matchesPagination.end} onNext = {matchesNextHandler} onPrev = {matchesPrevHandler}
			  matches = {matches} leagueID = {param.leagueID} loading = {matches_loading} err = {matches_err}/>


			<Scorers page = {scorersPagination.page} start = {scorersPagination.start}
			 end = {scorersPagination.end} onNext = {scorersNextHandler} onPrev = {scorersPrevHandler}
			  leagueID = {param.leagueID} scorers = {scorers} loading = {scorers_loading} err = {scorers_err}/>


		</div>
	)
}
export default LeagueView;