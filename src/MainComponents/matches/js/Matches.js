import {Message , Pagination , Match} from '../../index'
import '../../../MainHelper.css';
import classes from '../css/Matches.module.css';
function Matches({leagueType , matches , leagueID , page , start , end , onPrev , onNext , loading , err}){
		function prevHandler(){
			onPrev();
		}
		function nextHandler(){
			onNext();
		}

		function matchToJSX(match){
			if(!match)return null;
			return <div key = {match.id} className = {`${classes.matchRoot}`}><Match leagueType = {leagueType} key = {match.id} match = {match} leagueID = {leagueID}/></div>
		}

		function matchesToJSX(matches){
			if(!matches)return null;
			return matches.map(matchToJSX);
		}


		
		return(
			<div className = {`${classes.root}`}>
				{matches && !loading  && <div className = {matches[0] && 'slideIn'}>
					{matchesToJSX(matches?.slice(start , end))}
				</div>}
				{err && !loading && !matches.length && <Message msg = {err}/>}
				{loading && <Message loading msg = 'retrieving data'/>}
			<Pagination disabled = {!matches || (!matches?.length > 0)} page = {page} onPrev = {prevHandler} onNext = {nextHandler}/>

			</div>
		)
	
}

export default Matches;