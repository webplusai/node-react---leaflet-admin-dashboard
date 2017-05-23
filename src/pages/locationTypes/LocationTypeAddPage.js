import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createLocationType } from '../../actions/LocationTypeActions';

import { LocationTypeForm } from '../../components';

class LocationTypeAddPage extends Component {

  static propTypes = {
    createLocationType: PropTypes.func.isRequired
  };

  render() {
    const { errorMessage, createLocationType } = this.props;
    return (
      <div className="container">
        <LocationTypeForm errorMessage={errorMessage} onSave={locationType => createLocationType(locationType)} />
      </div>
    );
  }
}

export default connect(({ locationTypes: { errorMessage } }) => ({ errorMessage }), { createLocationType })(LocationTypeAddPage);