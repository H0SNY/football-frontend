import React, {useContext , useEffect} from 'react';
import classes from '../css/MainView.module.css';
import '../../MainHelper.css';
import { MainViewContext } from '../../state/providers/MainViewProvider';
import { getMainCalender } from '../../alg/helpers';
import { getMatchesByDate } from '../../BackendConnections/getFootball';
import { Matches } from '../../MainComponents/index';


function MainView(){
	const {loading , matches , err , pagination , calender , setErr , setMatches , setLoading , 
	setCalenderDay , setPagination , setPaginationPage , reset} = useContext(MainViewContext);

		//fetching matches for certain date
	useEffect(() =>{
		let mounted = true;
		const fetchData = async () =>{
			try{
				const matchesRes = await getMatchesByDate(calender.day);
				if(!matchesRes || (matchesRes.length < 1) ) throw new Error('No Matches This Day');
				if(mounted){
					setMatches(matchesRes);
					setLoading(false);
				}
			}catch(err){
				if(mounted){
					setErr(err.message);
					setLoading(false);
					setMatches([]);
				}
			}
		}

		fetchData();
		return () => mounted = false;
	} , [calender.day , setMatches , setLoading , setErr]);


	useEffect(() =>{
		return () =>{
			reset();
		}
	} , [reset])


	const nextHandler = () =>{
		setPagination("next");
	}
	const prevHandler = () =>{
		setPagination("prev");
	}

	const calenderHandler = e =>{
		setLoading(true)
		setCalenderDay(new Date(e.target.ariaLabel));
		setPaginationPage(1);
	}

	//creating calender
	const arr = getMainCalender(calenderHandler)

	return(
		<div className = {classes.mainviewRoot}>
			<div className = {`container ${classes.coverageRoot} fadeIn`}>
				<p>Top Leagues Coverage</p>
			</div>

			<div className = {`${classes.calenderRoot} fadeIn`}>
			{arr.map((row) =>
					<div key = {Math.random() * 1213215} className = {`container ${classes.row}`}>
						{row}
					</div>)}
			</div>

			<div className = {classes.curr}>
				<p>{String(calender.day).split(' ').slice(0 , 3).join(' ')}</p>
			</div>

			<Matches page = {pagination.page} start = {pagination.start}
			 end = {pagination.end} onNext = {nextHandler} onPrev = {prevHandler}
			  leagueID = {null} matches = {matches}  loading = {loading} err = {err}/>
			
		
		</div>
	)
}

export default MainView;