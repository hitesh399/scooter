import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Error404 from '../pages/404';
import Home from '../pages/Home';
import TripList from '../pages/trip/TripList';

export default () => {

	return (
		
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/trip" component={TripList} />
			<Route  component={Error404} />
		</Switch>
	)
}