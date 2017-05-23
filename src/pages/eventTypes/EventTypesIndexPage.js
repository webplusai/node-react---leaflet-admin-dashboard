import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchEventTypes } from '../../actions/EventTypeActions';
import { EventTypesList, SearchForm } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class EventTypesIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchEventTypes: PropTypes.func.isRequired
  };

  state = {
    fetched: false,
    search: '',
    order: '-createdAt'
  };

  componentDidMount() {
    const { order } = this.state;
    this.fetchData({ order });
  }

  fetchData({ search, order, filters }) {
    const { fetchEventTypes } = this.props;
    this.setState({ search, fetched: false }, () => fetchEventTypes({ order, search, filters })
      .then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items, count } = this.props;
    const { fetched, order } = this.state;

    return (
      <Loading className="container" ignoreLoader={(
        <div className="row m-b">
          <div className="col-md-2">
            <LinkTo className="btn btn-success" url="eventTypes/new">Create EventType</LinkTo>
          </div>
          <div className="col-md-4">
            {fetched ? <h4>EventTypes ({count})</h4> : null}
          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={({ search }) => this.fetchData({ search, order })} />
          </div>
        </div>
      )} loaded={fetched}>
        <EventTypesList items={items} />
      </Loading>
    );
  }
}

export default connect(({ eventTypes: { items, count } }) => ({ items, count }), { fetchEventTypes })(EventTypesIndexPage);
