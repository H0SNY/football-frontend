import '../../../MainHelper.css';
import classes from '../css/Pagination.module.css';
import {BiChevronRightCircle , BiChevronLeftCircle} from 'react-icons/all';
function Pagination({onPrev , onNext , page , disabled}){

	function prevHandler(){
		onPrev();
	}

	function nextHandler(){
		onNext();
	}
	return(
		<div className = {`container ${classes.control}`}>
					<div className = {`col-4`}>
						
						<button disabled = {disabled}  type = 'button' onClick = {prevHandler}><BiChevronLeftCircle className = 'icon'/></button>
					</div>

					<div className = {`col-4`}>
						<p>
							{page}
						</p>
					</div>
					
					<div className = {`col-4`}>

						<button disabled = {disabled} type = 'button' onClick = {nextHandler}><BiChevronRightCircle className = 'icon'/></button>
					</div>
			
		</div>
	)
}

export default Pagination;