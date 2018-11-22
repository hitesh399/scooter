import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import { typography } from '@material-ui/core/styles';
import API from '../../aep';
import {geolocated} from 'react-geolocated';
const  iconMarker = require('../../assets/images/scooter-icon.png');

class GoogleMapsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.getDistance = this.getDistance.bind(this);
  }


  componentWillMount() {

    this.props.callApi(API.SCOOTER_LIST, {})
      .then( (response)  => {

      })
  }

   onMarkerClick (props, marker, e) {


    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClick (props) {

    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  distance(lat1, lon1, lat2, lon2, unit) {

        if ((lat1 == lat2) && (lon1 == lon2)) {
          return 0;
        }
        else {
          var radlat1 = Math.PI * lat1/180;
          var radlat2 = Math.PI * lat2/180;
          var theta = lon1-lon2;
          var radtheta = Math.PI * theta/180;
          var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist > 1) {
            dist = 1;
          }
          dist = Math.acos(dist);
          dist = dist * 180/Math.PI;
          dist = dist * 60 * 1.1515;
          if (unit=="K") { dist = dist * 1.609344 }
          if (unit=="N") { dist = dist * 0.8684 }
          return Math.round(dist).toFixed(2);
        }
  }

  /**
   * Calculate the login user distance from the selected scooter.
   */
  getDistance(lat, lng) {

    if(!this.props.isGeolocationAvailable) {

      return 'Your browser does not support Geolocation';
    }
    else if(!this.props.isGeolocationEnabled) {

      return 'Geolocation is not enabled'
    } 
    else if(!this.props.coords) {

      return '...';
    }
    else {

      return <p>Distance : {this.distance(lat, lng, this.props.coords.latitude, this.props.coords.longitude, 'K')}  KM</p>
    }
  }
  /**
   * Component should only update when any change in server data.
   */
  // shouldComponentUpdate(nextProps) {

  //     return this.props.helper.shouldUpdate(nextProps, this.props, [API.SCOOTER_LIST.sectionName]);
  // }

  render() {

    const data = this.props.helper.deepFind(this.props.rootState,'server.'+API.SCOOTER_LIST.sectionName +'.response.data.scooters', []);
    const style = {
      width: '100%',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }
    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 16 }
        initialCenter={{lat: 1.290270 ,lng: 103.851959 }}
      >

      {data.map( (scooter, key) => 
          <Marker
            onClick = { this.onMarkerClick }
            icon= {iconMarker}
            key={`scooter_marker_${scooter.id}`}
            title = { `Battery ${scooter.battery}%` }
            position = {{ lat: parseFloat(scooter.lat), lng: parseFloat(scooter.lng) }}
            name = {`scooter_marker_${scooter.id}`}
            battery={scooter.battery}
            scooter_id={scooter.id}
            scooter_serial_code={scooter.serial_code}
          />

      )}
       
        <InfoWindow

            marker = { this.state.activeMarker }
            visible = { this.state.showingInfoWindow }
          >

            <Paper>
              <Typography
                component = 'h4'
              >
                Serial Code: { this.state.selectedPlace.scooter_serial_code } 
              </Typography>
              <Typography
                component = 'div'
              >
                
                Battery: { this.state.selectedPlace.battery } %
                {this.getDistance(this.state.selectedPlace.position? this.state.selectedPlace.position.lat : undefined, this.state.selectedPlace.position? this.state.selectedPlace.position.lng : undefined )}
              </Typography>

            </Paper>
          </InfoWindow>

        
      </Map>
    );
  }
}
const ScooterMap = GoogleApiWrapper({
    api: (process.env.GOOGLE_API_KEY)
})(GoogleMapsContainer)

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(ScooterMap);


