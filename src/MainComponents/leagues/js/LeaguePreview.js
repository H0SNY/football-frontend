import classes from '../css/LeaguePreview.module.css';
import {Link} from 'react-router-dom';
function LeaguePreview(props){
	const {league} = props;
	const {logo , name , country , id} = league;
	return(
		<Link to = {`/league/${id}`} className = {`container ${classes.leaguePreviewRoot}`}>
			<div className = {`container ${classes.imgRoot}`}>

				<div>
					<img alt = 'leaguepreview' src = {logo} className = {classes.img}/>
				</div>
			</div>

			<div className = {`container ${classes.nameRoot}`}>
				<div>
					<p>{name}</p>
				</div>
			</div>

			<div className = {`container ${classes.countryRoot}`}>
				<div>
					<p>{country}</p>
				</div>
			</div>

		</Link>
	)
}

export default LeaguePreview;