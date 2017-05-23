import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createLocation } from '../../actions/LocationActions';

import { LocationForm } from '../../components';

class LocationAddPage extends Component {

  static propTypes = {
    createLocation: PropTypes.func.isRequired
  };

  render() {
    const { errorMessage, createLocation } = this.props;
    return (
      <div className="container">
        <LocationForm errorMessage={errorMessage} onSave={location => createLocation(location)} />
      </div>
    );
  }
}

export default connect(({ locations: { errorMessage } }) => ({ errorMessage }), { createLocation })(LocationAddPage);