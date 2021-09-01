import React, { useReducer } from 'react';
import { RESET, SET_MATCHES_LOADING, SET_MATCHES_ERR,
	SET_TEAM_ERR , SET_TEAM_LOADING ,
	SET_MATCHES, SET_PAGINATION, SET_TEAM } from '../actions/teamViewActions';

export const TeamViewContext = React.createContext();

const initialState = {
	team : {
		team : [] ,
		loading : true , 
		err : false
	} ,
	matches : {
		matches : [] ,
		loading :true, 
		err : false
	}, 
	pagination : {
		page : 1 , 
		start : 0 , 
		end : 5
	} 
}

const reducer = (state , action) =>{
	switch(action.type){
		case SET_TEAM : return{
			...state , team :{...state.team , team :  action.team}
		}

		case SET_MATCHES : return{
			...state , matches : {...state.matches , matches :  action.matches}
		}

		case SET_PAGINATION :
			if(!state.matches.matches.length) return {...state}

			if(action.direction === 'next'){
				if(state.pagination.page === Math.ceil(state.matches.matches?.length / 5)){
				return{
					...state , pagination : {page : 1 ,
					start : 0 , end : 5 , }
				}
			}
				else return{
					...state , pagination : {page : state.pagination.page + 1 ,
					start : (state.pagination.page * 5) , end : (state.pagination.page + 1) * 5 , }
				}
			}
		else{
			if(state.pagination.page === 1){
				return{
				       ...state , pagination : {page : Math.ceil(state.matches.matches?.length / 5) ,
					       start : (Math.ceil(state.matches.matches?.length / 5) - 1) * 5 , end : (Math.ceil(state.matches.matches?.length / 5)) * 5 }
			       }
			       
			}
			else return{
			       ...state , pagination : {page : state.pagination.page - 1 ,
				       start : (state.pagination.page - 2) * 5 , end : (state.pagination.page - 1) * 5 , }
			       }
		} 

		case SET_MATCHES_LOADING : return{
			...state ,  matches : {...state.matches , loading : action.loading}
		}
		case SET_TEAM_LOADING : return{
			...state ,  team : {...state.team , loading : action.loading}
		}

		case SET_MATCHES_ERR : return{
			...state , matches : {...state.matches , err : action.err } 
		}
		case SET_TEAM_ERR : return{
			...state , team : {...state.team , err : action.err } 
		}
		case RESET : return{...initialState , ...state}
		default : return {...state}
	}
}

export default function TeamViewProvider({children}){
	const [store , dispatchStore] = useReducer(reducer , {
		...initialState ,
		setTeam(team){
			dispatchStore({type : SET_TEAM , team : team})
		} ,
		setMatches(matches){
			dispatchStore({type : SET_MATCHES , matches : matches})
		} ,
		setPagination(direction){
			dispatchStore({type : SET_PAGINATION , direction : direction})
		} ,
		setTeamLoading(loading){
			dispatchStore({type : SET_TEAM_LOADING , loading : loading})
		} ,
		setMatchesLoading(loading){
			dispatchStore({type : SET_MATCHES_LOADING , loading : loading})
		} ,
		setMatchesErr(err){
			dispatchStore({type : SET_MATCHES_ERR , err : err})
		} , 
		setTeamErr(err){
			dispatchStore({type : SET_TEAM_ERR , err : err})
		} , 
		reset(){
			dispatchStore({type : RESET})
		}
	});

	return(<TeamViewContext.Provider value = {store}>{children}</TeamViewContext.Provider>)
}