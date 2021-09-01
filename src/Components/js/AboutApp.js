import '../../MainHelper.css'
import classes from '../css/AboutApp.module.css';
function AboutApp(){
	return(
		<div className = {`${classes.root} fadeIn`}>
			<div className = {`container ${classes.frontendRoot}`}>
				<div className = {`container ${classes.frontendheaderRoot}`}>
					<h2>Front End</h2>
				</div>

				<div className = {`container ${classes.frontendpreviewRoot}`}>
					<a target = '_blank' rel="noreferrer" href = 'https://reactjs.org/'>
						<p>React.js</p>
					</a>
				</div>
				
				<div className = {`container ${classes.frontendcontentRoot}`}>
					<div>
						<p>
							This app is built using React.js
						</p>
					</div>

					<div>
						<p>
							 Context API for state management
						</p>
					</div>

					<div>
						<p>
							 react-router-dom library for routing
						</p>
					</div>

					<div>
						<p>
							Using CSS modules for styling
						</p>
					</div>
				</div>

			</div>




			<div className = {`${classes.backendRoot}`}>

				<div className = {`container ${classes.frontendheaderRoot}`}>
					<h2>Back End</h2>
				</div>
				
				<div className = {`container ${classes.backendpreviewRoot}`}>

					<a target = '_blank' rel="noreferrer" href = 'https://nodejs.org/en/' className = {`${classes.p1}`}>
						<p>Node.js</p>
					</a>

					<a target = '_blank' rel="noreferrer" href = 'https://expressjs.com/' className = {`${classes.p2}`}>
						<p>Express.js</p>
					</a>

					<a target = '_blank' rel="noreferrer" href = 'https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_emea_egypt_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624392' className = {`${classes.p3}`}>
						<p>MongoDB</p>
					</a>

					<a target = '_blank' rel="noreferrer" href = 'https://us-east-2.console.aws.amazon.com/elasticbeanstalk' className = {`${classes.p4}`}>
						<p>AWS</p>
					</a>
				</div>
				
				<div className = {`container ${classes.backendcontentRoot}`}>
					<div>
						
						<p>
							This app is built using Node.js
						</p>
					</div>

					<div>
						<p>
							Using Express.js library for creating web API's
						</p>
					</div>

					<div>
						<p>
							 NOSQL MongoDB 
						</p>
					</div>

					<div>
						<p>
							Using AWS beanstalk service for hosting our front-end and back-end
						</p>
					</div>
				</div>

			</div>
		</div>
	)
}

export default AboutApp;