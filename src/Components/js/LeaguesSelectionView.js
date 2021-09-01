import React, {  useContext } from "react";
import {Message , LeaguePreview} from '../../MainComponents/index';
import { useEffect } from "react";
import { getAllLeagues } from "../../BackendConnections/getFootball";
import { LeaguesSelectionViewContext } from "../../state/providers/LeaguesSelectionViewProvider";
import classes from '../css/LeagueSelectionView.module.css';

function getLeagues(l){
	return(<div  key = {l.id} className = {`container ${classes.rowRoot}`}>
		<LeaguePreview  league = {l}/>
	</div>)
}


function LeaguesSelectionView(){
	const {loading , err , leagues , setErr , setLoading , setLeagues } = useContext(LeaguesSelectionViewContext);
	useEffect( () =>{
		let mounted = true;
		const fetchData = async () =>{
			try{
				const leagues = await getAllLeagues();
				if(!leagues) throw new Error('Cannot Retrieve Leagues');
				else{
					if(mounted){
						setLeagues(leagues);
						setLoading(false);
					}
				}


			}catch(err){
				console.error(`${err.message} LeagueSelectionView/useEffect`);
				if(mounted){
					setLeagues([]);
					setErr(err.message);
					setLoading(false);
				}
			}
		};
		fetchData();
		return () => mounted = false;
	} , [setLeagues , setLoading , setErr]);
	

	return(
		<React.Fragment>
			
			{leagues && !loading && !err && <div className = {`${classes.leaguesRoot} fadeIn`}> {leagues.map(getLeagues)} </div>}
			{err && !loading && <Message msg = {err}/>}
			{loading && !err && <Message loading/>}
		</React.Fragment>
	)
}

export default LeaguesSelectionView;