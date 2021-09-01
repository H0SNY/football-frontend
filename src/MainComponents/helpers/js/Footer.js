import classes from '../css/Footer.module.css'
export default function Footer(){

	return(
		<div className = {`${classes.root} container`}>
			<a target = '_blank' rel = "noreferrer" href = '/aboutapp' className = {`${classes.aboutapp}`}>
				<p>How This Is Build</p>
			</a>

			<div className = {`container ${classes.contact}`}>
				<div className = {`${classes.github}`}>
					<a target = '_blank' rel="noreferrer" href = 'https://github.com/H0SNY'>
						<p>GITHUB</p>
					</a>
				</div>
				<div className = {`${classes.linkedin}`}>
					<a target = '_blank' rel="noreferrer" href = 'https://www.linkedin.com/in/hosny-elnemr-6969ab213/'>
						<p>LINKED IN</p>
					</a>
				</div>

			</div>
		</div>
	)
}