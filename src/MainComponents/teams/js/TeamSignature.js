import classes from '../css/TeamSignature.module.css'

export default function TeamSignature({crestUrl , name , founded}){

	return(
		<div className = {`container ${classes.root}`}> 
		<div>
			<img alt = 'teamImg' src = {crestUrl} className = {classes.img}/>

		</div>

		<div>
			<p>{name}</p>

		</div>

		<div>
			<p>{founded}</p>
		</div>

	</div>

	)
}