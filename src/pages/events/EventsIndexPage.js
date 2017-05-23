import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchEvents } from '../../actions/EventActions';
import { EventsList, SearchForm } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class EventsIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchEvents: PropTypes.func.isRequired
  };

  state = {
    fetched: false,
    search: '',
    order: '-createdAt',
    include: 'event_type,location,special'
  };

  componentDidMount() {
    const { order, include } = this.state;
    this.fetchData({ order, include });
  }

  fetchData({ search, order, filters, include }) {
    const { currentUser, fetchEvents } = this.props;
    this.setState({ search, fetched: false }, () => fetchEvents({ order, search, filters, include }, currentUser)
      .then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items, count } = this.props;
    const { fetched, order, include } = this.state;

    return (
      <Loading className="container" ignoreLoader={(
        <div className="row m-b">
          <div className="col-md-2">
            <LinkTo className="btn btn-success" url="events/new">Create Event</LinkTo>
          </div>
          <div className="col-md-4">
            {fetched ? <h4>Events ({count})</h4> : null}
          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={({ search }) => this.fetchData({ search, order, include })} />
          </div>
        </div>
      )} loaded={fetched}>
        <EventsList items={items} />
      </Loading>
    );
  }
}

export default connect(({
  auth: { currentUser },
  events: { items, count }
}) => ({ items, count, currentUser }), { fetchEvents })(EventsIndexPage);
