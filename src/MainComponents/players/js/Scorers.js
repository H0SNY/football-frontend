import '../../../MainHelper.css';
import classes from '../css/Scorers.module.css'
import {Message , Pagination , Scorer} from '../../index';
function Scorers({scorers , page , start , end , onNext , onPrev , loading , err}){

	//pagination for scorers
	function nextHandler(){
		onNext();
	}

	function prevHandler(){
		onPrev();
	}

	function scorerToJSX(scorer){
		if(!scorer) return null;
		else return <Scorer key = {scorer.player.id} scorer = {scorer}/>
	}

	function scorersToJSX(scorers){
		if(!scorers || scorers.length === 0) return null;
		return scorers.map(scorerToJSX);
	}

	//setting ranks
	if(scorers){
		let count = 1;
		for(const scorer of scorers)
			scorer.rank = count++;	
	}
	


	return(
		<div className = {`${classes.root}`}>
			<div className = {`container ${classes.scorersDescRoot}`}>

				<div className = 'col-3'>
					<p>
						Rank
					</p>
				</div>

				<div className = 'col-3'>
					<p>
						Name
					</p>
				</div>

				<div  className = 'col-3'>
					<p>
						Team
					</p>
				</div>

				<div  className = 'col-3'>
					<p>
						Goals
					</p>
				</div>

			</div>

			<div className = {classes.scorersRoot}>
					<div className = {scorers[0] && 'slideIn'}>
						{scorersToJSX(scorers?.slice(start , end))}
					</div>
					{err && <Message msg = {err}/>}
					{loading && <Message loading msg = 'retrieving data'/>}

			</div>





			<Pagination disabled = {err || loading} page = {page} onPrev = {prevHandler} onNext = {nextHandler}/>
		</div>
	)
}

export default Scorers;