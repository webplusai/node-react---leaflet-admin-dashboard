import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchLocationTypes } from '../../actions/LocationTypeActions';
import { LocationTypesList, SearchForm } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class LocationTypesIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchLocationTypes: PropTypes.func.isRequired
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
    const { fetchLocationTypes } = this.props;
    this.setState({ search, fetched: false }, () => fetchLocationTypes({ order, search, filters })
      .then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items, count } = this.props;
    const { fetched, order } = this.state;

    return (
      <Loading className="container" ignoreLoader={(
        <div className="row m-b">
          <div className="col-md-2">
            <LinkTo className="btn btn-success" url="locationTypes/new">Create LocationType</LinkTo>
          </div>
          <div className="col-md-4">
            {fetched ? <h4>LocationTypes ({count})</h4> : null}
          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={({ search }) => this.fetchData({ search, order })} />
          </div>
        </div>
      )} loaded={fetched}>
        <LocationTypesList items={items} />
      </Loading>
    );
  }
}

export default connect(({ locationTypes: { items, count } }) => ({ items, count }), { fetchLocationTypes })(LocationTypesIndexPage);
