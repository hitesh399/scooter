import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
const  logoUrl = require('../assets/images/scooter-icon.png');
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Head extends React.Component {

	render () {
		const {classes} = this.props;

		return (

			<AppBar className={classes.appBar}>
				<Toolbar>
					<Link to="/">
						<img src={logoUrl} alt="Scooter"/>
					</Link>						
					 <Typography variant="title" color="inherit" className={classes.grow}>

						<Link to="/">Singsys Pvt. Lte.</Link>
					</Typography>
					<Button><Link to="/trip">Trip</Link></Button>				

				</Toolbar>
			</AppBar>
		);
	}
}

export default Head;