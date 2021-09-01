import { useEffect, useState } from "react";
import {  LEAGUES   , getLeagueScorers} from './BackendConnections/getFootball';
import axios from "axios";
const options = {
	headers : {
		'X-Auth-Token' : '90ef1041226a42918d8eb49a57b53bf3'
	}
}


function Test(){
	
	const arr = [{
		name : 'hosny' , 
		age : 22 , 
		job :'cce'
	} , {
		name : 'hossam' , 
		age : 23 , 
		job :'med'
	} , {
		name : 'maged' , 
		age : 23 , 
		job :'mme'
	}]
	


	const [valid , setValid] = useState(false);
	const [input , setInput] = useState();
	function sleep(ms){
		return new Promise(resolve => setTimeout(resolve , ms));
	}

	useEffect(() =>{
		if(!valid)return;
		const fetchData = async () =>{
			for(const l of LEAGUES){
				const standings = await axios.get(`https://api.football-data.org/v2/competitions/${input}/teams` , options);
				console.log(JSON.stringify(standings.data.teams));			

			}
				// const matches = await getLeagueMatches(input);
				// console.log(JSON.stringify(matches[0]))
				// const scorers = await getLeagueScorers(input);
				// console.log(JSON.stringify(scorers[0]))
				// const res = await updateLeague(input , standings , {} , scorers);
				// console.log(res);
		};	
		fetchData();
	} , [valid]);

	function onClickHandler(){
		if(!valid)setValid(true);
		else setValid(false);
	}

	function onChangeHandler(e){
		setInput(e.target.value);
	}
	return(
		<div>
			<input onChange = {onChangeHandler}/>
			<button style = {{width : '100px' , height : '100px'}} onClick = {onClickHandler}></button>
		</div>
	)
}

export default Test;