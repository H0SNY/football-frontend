import { useReducer } from "react";
import {REMOVE_ERR, SET_CALENDER_DAY, SET_CALENDER_TOTAL, SET_ERR, SET_MATCHES, SET_LOADING , SET_PAGINATION, SET_PAGINATION_PAGE, RESET} from '../actions/mainViewActions'
import React from 'react';

const initialState = {
	matches : [] , 
	loading : true , 
	err : false , 
	pagination : {
		page : 1 , 
		start : 0 , 
		end : 5
	} ,
	calender : {
		day : new Date() , 
		total : 30
	}
}

export const MainViewContext = React.createContext();

const reducer = (state , action) =>{
	switch(action.type){
		case SET_MATCHES : return{
			...state , matches : action.matches
		}
		case SET_LOADING : return {
			...state , loading : action.loading
		} 
		case SET_ERR : return{
			...state , err : action.err
		}
		case REMOVE_ERR : return{
			...state, err : false
		}

		case SET_PAGINATION: 
			if(!state.matches.length) return {...state}

			if(action.direction === 'next'){
				if(state.pagination.page === Math.ceil(state.matches?.length / 5)){
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
				       ...state , pagination : {page : Math.ceil(state.matches?.length / 5) ,
					       start : (Math.ceil(state.matches?.length / 5) - 1) * 5 , end : (Math.ceil(state.matches?.length / 5)) * 5 }
			       }
			       
			}
			else return{
			       ...state , pagination : {page : state.pagination.page - 1 ,
				       start : (state.pagination.page - 2) * 5 , end : (state.pagination.page - 1) * 5 , }
			       }
		} 

		case SET_PAGINATION_PAGE : return{
			...state , pagination : {page : action.page , start : 0 , end : 5}
		}

		case SET_CALENDER_DAY : return{
			...state , calender : {...state.calender , day : action.day}
		}
		case SET_CALENDER_TOTAL : return{
			...state , calender : {...state.calender , total : action.total}
		}
		case RESET : return{
			...initialState , 
			...state
		}
		default : return{...state}

	}
}

export default function MainViewProvider({children}){
	const [store , dispatchStore] = useReducer(reducer , {
		...initialState ,
		setMatches(matches){
			dispatchStore({type : SET_MATCHES , matches : matches})
		} ,
		setLoading(loading){
			dispatchStore({type : SET_LOADING , loading : loading})
		} , 
		setErr(err){
			dispatchStore({type : SET_ERR , err : err})
		} , 
		removeErr(){
			dispatchStore({type : SET_ERR})
		} , 
		setPagination(direction){
			dispatchStore({type : SET_PAGINATION , direction : direction});
		} ,
		setPaginationPage(page){
			dispatchStore({type : SET_PAGINATION_PAGE , page : page})
		} ,
		setCalenderDay(day){
			dispatchStore({type : SET_CALENDER_DAY , day : day})
		} , 
		setCalenderTotal(total){
			dispatchStore({type : SET_CALENDER_TOTAL , total : total})
		} , 
		reset(){
			dispatchStore({type : RESET})
		}
	});

	
	
	return (
		<MainViewContext.Provider value  ={store}>{children}</MainViewContext.Provider>
	)
}

