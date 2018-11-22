import React from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import moment from 'moment';

class ListTemp extends React.Component {


	render () {

		const {item, rowNo} = this.props;

		return (
			<ListItem >
	          <Avatar>{rowNo+1}</Avatar>

	          <ListItemText  secondary={moment(item.trip_date).format('MMMM Do YYYY, h:mm:ss a')} >
	          		Vehicle ID: {item.vehicle_id}, Trip Duration: {item.trip_duration}
	          </ListItemText>
	        </ListItem>
		);
	}
}	

ListTemp.propTypes = {
  	
  	item: PropTypes.object.isRequired,
  	rowNo: PropTypes.number.isRequired
};

export default ListTemp;