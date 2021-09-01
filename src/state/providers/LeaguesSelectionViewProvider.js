import React, { useReducer} from 'react';
import { REMOVE_ERR, SET_ERR, SET_PAGE ,SET_LEAGUES, SET_LOADING } from '../actions/leaguesSelectionViewActions'
export const LeaguesSelectionViewContext = React.createContext();

const reducer = (state , action) =>{
	switch(action.type){
		case SET_LEAGUES : return{
			...state , leagues : action.leagues
		}
		case SET_LOADING : return{
			...state , loading : action.loading
		}
		case SET_ERR : return{
			...state , err : action.err
		}
		case REMOVE_ERR : return{
			...state , err : false
		}
		case SET_PAGE : 
			if(action.direction === 'next'){
				if(state.pagination.page === Math.ceil(state.leagues.length / 10)){
					return{
						...state , pagination : { page :  1 , 
						start : 0 , end : 10 }
					}
				}

				else{
					return{
						...state , pagination : { page : state.pagination.page + 1 , 
						start : (state.pagination.page ) * 10 , end : (state.pagination.page + 1) * 10 }
					}
				}
			}else{
				if(state.pagination.page === 1){
					return{
						...state , pagination : { page :  Math.ceil(state.leagues.length / 10) , 
						start :( Math.ceil(state.leagues.length / 10) - 1) * 10 , end : ( Math.ceil(state.leagues.length / 10) ) * 10 }
					}
				}

				else{
					return{
						...state , pagination : { page : state.pagination.page - 1 , 
						start : (state.pagination.page - 2 ) * 10 , end : (state.pagination.page - 1) * 10 }
					}
				}
			}
		default : return{...state}

	}
}

export default function LeaguesSelectionViewProvider({children}){

	const [store , dispatchStore] = useReducer(reducer , {
		leagues : [] , 
		loading : true , 
		err : false , 
		pagination : {
			page : 1 , 
			start : 0 , 
			end : 10
		} ,
		
		setLeagues(leagues){
			dispatchStore({type : SET_LEAGUES , leagues : leagues})
		} ,
		setLoading(loading){
			dispatchStore({type : SET_LOADING , loading : loading})
		} ,
		setPagination(direction){
			dispatchStore({type : SET_PAGE , direction : direction})
		} , 
		setErr(err){
			dispatchStore({type : SET_ERR , err : err})
		} ,
		removeErr(){
			dispatchStore({type : SET_ERR})
		}
	});



	

	return(
		<LeaguesSelectionViewContext.Provider value = {store}>{children}</LeaguesSelectionViewContext.Provider>
	)
}