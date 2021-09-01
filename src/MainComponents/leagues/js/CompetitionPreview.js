import { NavLink } from 'react-router-dom'
import classes from '../css/CompetitionPreview.module.css'

export default function CompetitionPreview({id , area , name , code , plan , lastUpdated}){

	
	return(
		<NavLink to = {`/league/${id}`} className = {`container ${classes.root}`}>
			<div className = {`${classes.name}`}>
				<p>{name}</p>
			</div>
			<div className = {`${classes.countryName}`}>
				<p>{area.name}</p>
			</div>	
		</NavLink>
		
	)
}