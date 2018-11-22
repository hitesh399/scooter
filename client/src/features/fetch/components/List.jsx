import React from 'react';
import PropTypes from 'prop-types';

class List extends React.Component {

	componentWillMount() {

		this.props.callApi(this.props.endPoint, {})
	      .then( (response)  => {

	      })
	}
	render () {

		const dataKey = this.props.dataKey ? '.response.data.'+this.props.dataKey: '.response.data';
		const data = this.props.helper.deepFind(this.props.rootState,'server.'+this.props.endPoint.sectionName +dataKey, []);
		
		return (

			React.createElement(this.props.tagName, null, data.map((item, index) => {

				return React.createElement(this.props.itemConponent, { item: item, key: this.props.dataKey+'_'+item.id, rowNo: index});
			}))
		);
	}
}


List.propTypes = {
  	
  	endPoint: PropTypes.object.isRequired,
  	dataKey: PropTypes.string.isRequired,
  	itemConponent: PropTypes.any.isRequired,
  	tagName: PropTypes.any.isRequired
};

export default List;