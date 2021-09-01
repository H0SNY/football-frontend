import React, { useReducer } from 'react';
import { SET_STANDINGS , SET_MATCHES , SET_SCORERS  , SET_STANDINGS_PAGINATION, SET_MATCHES_PAGINATION, SET_SCORERS_PAGINATION, SET_CALENDER_MATCHDAY, SET_CALENDER_TOTAL, SET_SCORERS_LOADING, SET_MATCHES_LOADING, SET_STANDINGS_LOADING, SET_STANDINGS_ERR, SET_MATCHES_ERR, SET_SCORERS_ERR, REMOVE_STANDINGS_ERR, REMOVE_MATCHES_ERR, REMOVE_SCORERS_ERR, RESET, SET_LEAGUE_TYPE } from '../actions/leagueViewActions';
export const LeagueViewContext = React.createContext();


const initialState = {
	leagueType : null ,
	standings : [] , 
	matches : [] ,
	scorers : [] , 
	standings_loading : true ,
	matches_loading : true ,
	scorers_loading : true ,
	standings_err : false ,
	matches_err : false ,
	scorers_err : false ,
	standingsPagination : {
		page : 1 , 
		start : 0 , 
		end : 1 , 

	}  ,
	matchesPagination : {
		page : 1 , 
		start : 0 , 
		end : 5 , 
	}  ,
	scorersPagination : {
		page : 1 , 
		start : 0 , 
		end : 5 , 
	}  ,

	calender : {
		matchday : 1 , 
		total : 1
	}
}


const reducer = (state , action) =>{
	switch(action.type){
		case SET_LEAGUE_TYPE : return{
			...state , leagueType : action.leagueType
		}
		case SET_STANDINGS : return{
			...state , standings : action.standings
		}
		case SET_MATCHES : return{
			...state , matches : action.matches
		}
		case SET_SCORERS : return{
			...state , scorers : action.scorers
		}
		case SET_STANDINGS_LOADING : return{
			...state , standings_loading : action.loading
		}
		case SET_MATCHES_LOADING : return{
			...state , matches_loading : action.loading
		}
		case SET_SCORERS_LOADING : return{
			...state , scorers_loading : action.loading
		}
		case SET_STANDINGS_ERR : return{
			...state , standings_err : action.err
		}
		case SET_MATCHES_ERR : return{
			...state , matches_err : action.err
		}
		case SET_SCORERS_ERR : return{
			...state , scorers_err : action.err
		}
		case REMOVE_STANDINGS_ERR : return{
			...state , standings_err : false
		}
		case REMOVE_MATCHES_ERR : return{
			...state , matches_err : false
		}
		case REMOVE_SCORERS_ERR : return{
			...state , scorers_err : false
		}
				
	
		case SET_STANDINGS_PAGINATION:
		if(!state.standings.length) return {...state};
		 if(action.direction === 'next'){
			 if(state.standingsPagination.page === Math.ceil(state.standings?.length)){
				 return{
					 ...state , standingsPagination : {page :  1 ,
					 start : 1 , end : 2 }
				 }
			}
				
		else{
				return{
					...state , standingsPagination : {page : state.standingsPagination.page + 1 ,
					start : (state.standingsPagination.page) , end : (state.standingsPagination.page + 1) , }
				}
			 }

		 }
		
		
		else{
			if(state.standingsPagination.page === 1 ){

				return{
					...state , standingsPagination : {page : state.standings.length,
						start : (state.standings.length - 1) , end : (state.standings.length) , }
				}
			}

			else{
				return{
					...state , standingsPagination : {page : state.standingsPagination.page - 1 ,
						start : (state.standingsPagination.page - 2) , end : (state.standingsPagination.page - 1) , }
				}

			}

		} 




		case SET_MATCHES_PAGINATION: 	if(!state.matches.length) return {...state}
		if(action.direction === 'next'){
			if(state.matchesPagination.page === Math.ceil(state.matches?.length / 5)){
				return{
					...state , matchesPagination : {page : 1 ,
					start : 0 , end : 5 , }
				}
			}
			else return{
				...state , matchesPagination : {page : state.matchesPagination.page + 1 ,
				start : (state.matchesPagination.page * 5) , end : (state.matchesPagination.page + 1) * 5 , }
			}
		}
		else{
			if(state.matchesPagination.page === 1){
				return{
				       ...state , matchesPagination : {page : Math.ceil(state.matches?.length / 5) ,
					       start : (Math.ceil(state.matches?.length / 5) - 1) * 5 , end : (Math.ceil(state.matches?.length / 5)) * 5 }
			       }
			       
			}
			else return{
			       ...state , matchesPagination : {page : state.matchesPagination.page - 1 ,
				       start : (state.matchesPagination.page - 2) * 5 , end : (state.matchesPagination.page - 1) * 5 , }
			       }
		} 



		case SET_SCORERS_PAGINATION: 
		if(!state.scorers.length) return{...state};
		if(action.direction === 'next') {
			if(state.scorersPagination.page === Math.ceil(state.scorers.length / 5) ){
				return{
					...state , scorersPagination : {page : 1 ,
						start : 0 , end :  5 , }
				}
			}
			else return{
				...state , scorersPagination : {page : state.scorersPagination.page + 1 ,
				start : (state.standingsPagination.page) * 5 , end : (state.standingsPagination.page + 1) * 5 , }
			}
			
		}

		else{
			if(state.scorersPagination.page === 1){
				return{
					...state , scorersPagination : {page : Math.ceil(state.scorers.length / 5) ,
						start : (Math.ceil(state.scorers.length / 5) - 1) * 5 , end : (Math.ceil(state.scorers.length / 5) ) * 5 , }
				}
			}
			
			else {
				
				return{
					...state , scorersPagination : {page : state.scorersPagination.page - 1 ,
						start : (state.scorersPagination.page - 2) * 5 , end : (state.scorersPagination.page - 1) * 5 , }
				}
			}
		}
		
		case SET_CALENDER_MATCHDAY : return{
			...state , calender : {...state.calender , matchday : action.matchday}
		}

		case SET_CALENDER_TOTAL : return{
			...state , calender: {...state.calender , total : action.total}
		}
		
		case RESET : return  {
			...state,
			...initialState  
		 } ;

		default : return {...state}
	}
}





export default function LeagueViewProvider({children}){
	const [store , dispatchStore] = useReducer(reducer , {
		...initialState ,
		setLeagueType(leagueType){
			dispatchStore({type : SET_LEAGUE_TYPE , leagueType : leagueType})
		} ,
		setStandings(standings){
			dispatchStore({type : SET_STANDINGS , standings : standings});
		} ,
		setMatches(matches){
			dispatchStore({type : SET_MATCHES , matches : matches})
		} ,
		setScorers(scorers){
			dispatchStore({type : SET_SCORERS , scorers : scorers})
		} ,
		setStandingsLoading(loading){
			dispatchStore({type : SET_STANDINGS_LOADING , loading : loading})
		} ,
		setMatchesLoading(loading){
			dispatchStore({type : SET_MATCHES_LOADING, loading : loading})
		} ,
		setScorersLoading(loading){
			dispatchStore({type : SET_SCORERS_LOADING , loading : loading})
		} ,
		setStandingsErr(err){
			dispatchStore({type : SET_STANDINGS_ERR , err : err})
		} ,
		setMatchesErr(err){
			dispatchStore({type : SET_MATCHES_ERR , err : err})
		} ,
		setScorersErr(err){
			dispatchStore({type : SET_SCORERS_ERR , err : err})
		} ,
		removeStandingsErr(){
			dispatchStore({type : REMOVE_STANDINGS_ERR})
		} ,
		removeMatchesErr(){
			dispatchStore({type : REMOVE_MATCHES_ERR})
		} ,
		removeScorersErr(){
			dispatchStore({type : REMOVE_SCORERS_ERR})
		} ,
	
		setStandingsPagination(direction){
			dispatchStore({type : SET_STANDINGS_PAGINATION , direction : direction});
		} ,
		setMatchesPagination(direction){
			dispatchStore({type : SET_MATCHES_PAGINATION , direction : direction});
		} ,
		setScorersPagination(direction){
			dispatchStore({type : SET_SCORERS_PAGINATION , direction : direction});
		} ,
		setCalenderMatchday(matchday){
			dispatchStore({type : SET_CALENDER_MATCHDAY , matchday : matchday});
		} , 
		setCalenderTotal(total){
			dispatchStore({type : SET_CALENDER_TOTAL , total : total})
		} , 
	
		reset(){
			dispatchStore({type : RESET});
		}
		
	}
	)

	

	return(<LeagueViewContext.Provider value = {store}>{children}</LeagueViewContext.Provider>)
}