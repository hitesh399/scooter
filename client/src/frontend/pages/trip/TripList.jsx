import React from 'react';
import { mapDispatchToProps, mapStateToProps} from '../../../features/root/root-props';
import List from '../../../features/fetch/components/List';
import FullWidthTemplate from '../../layouts/FullWidth'
import TripListTemp from '../../components/trip/ListTemplate';
import  {connect } from 'react-redux';
import API from '../../aep';
import MUIList from '@material-ui/core/List';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class TripList extends React.Component {


	render () {

		return (

			<FullWidthTemplate {...this.props} >
				<div style={{padding: '30px'}}>
				<Typography gutterBottom variant="h5" component="h2">
		            My Trips
		         </Typography>
				    <Paper style={{marginBottom: '60px'}}>
						<List {...this.props} endPoint={API.TRIP_LIST} itemConponent={TripListTemp} dataKey="trips" tagName={MUIList}/>
							
					</Paper>
				</div>
			</FullWidthTemplate>
		)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TripList)