import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createEventType } from '../../actions/EventTypeActions';

import { EventTypeForm } from '../../components';

class EventTypeAddPage extends Component {

  static propTypes = {
    createEventType: PropTypes.func.isRequired
  };

  render() {
    const { errorMessage, createEventType } = this.props;
    return (
      <div className="container">
        <EventTypeForm errorMessage={errorMessage} onSave={eventType => createEventType(eventType)} />
      </div>
    );
  }
}

export default connect(({ eventTypes: { errorMessage } }) => ({ errorMessage }), { createEventType })(EventTypeAddPage);