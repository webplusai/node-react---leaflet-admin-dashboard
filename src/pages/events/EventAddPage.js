import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createEvent } from '../../actions/EventActions';

import { EventForm } from '../../components';

class EventAddPage extends Component {

  static propTypes = {
    createEvent: PropTypes.func.isRequired
  };

  render() {
    const { errorMessage, currentUser, createEvent } = this.props;
    return (
      <div className="container">
        <EventForm errorMessage={errorMessage} onSave={event => createEvent(event, currentUser)} />
      </div>
    );
  }
}

export default connect(({
  auth: { currentUser },
  events: { errorMessage }
}) => ({ errorMessage, currentUser }), { createEvent })(EventAddPage);