import { useState } from "react";
import {Player , Pagination} from "../../index";
import classes from '../css/Squad.module.css';
function Squad({squad}){
	const [page , setPage] = useState(1);
	const pageLimit = 3;
	const lastPage = Math.ceil(squad ?  squad.length / pageLimit : 1);
	const start = (page - 1) * pageLimit;
	const end = page * pageLimit;
	function playerToJSX(player){
		return <Player key = {player.id} player = {player}/>
	}

	function playersToJSX(players){
		return players.map(playerToJSX);
	}

	function prevHandler(){
		if(page === 1) setPage(lastPage);
		else setPage(page - 1);
	}

	function nextHandler(){
		if(page === lastPage) setPage(1);
		else setPage(page + 1);

	}

	return(
		<div className = {classes.squadRoot}>

			<div className = {`container ${classes.playerDescRoot}`}>
				<div className = 'col-2'>
					<p>Shirt Number</p>
				</div>

				<div className = 'col-2'>
					<p>Name</p>
				</div>	
			
				<div className = 'col-2'>
					<p>Nationality</p>
				</div>

				<div className = 'col-2'>
					<p>Position</p>
				</div>

				<div className = 'col-2'>
					<p>Age</p>
				</div>

			
			</div>

			{squad ? playersToJSX(squad.slice(start , end)) : null}
			<Pagination onPrev = {prevHandler} onNext = {nextHandler}/>
		</div>	
	)
}

export default Squad;