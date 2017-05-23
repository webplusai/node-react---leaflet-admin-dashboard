import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchBoosts } from '../../actions/BoostActions';
import { BoostsList, SearchForm } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class BoostsIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchBoosts: PropTypes.func.isRequired
  };

  state = {
    fetched: false,
    search: '',
    order: '-createdAt',
  };

  componentDidMount() {
    const { order } = this.state;
    this.fetchData({ order });
  }

  fetchData({ search, order, filters, include }) {
    const { currentUser, fetchBoosts } = this.props;
    this.setState({ search, fetched: false }, () => fetchBoosts({ order, search, filters }, currentUser)
      .then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items, count } = this.props;
    const { fetched, order } = this.state;

    return (
      <Loading className="container" ignoreLoader={(
        <div className="row m-b">
          <div className="col-md-2">
            <LinkTo className="btn btn-success" url="boosts/new">Create Boost</LinkTo>
          </div>
          <div className="col-md-4">
            {fetched ? <h4>Boosts ({count})</h4> : null}
          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={({ search }) => this.fetchData({ search, order })} />
          </div>
        </div>
      )} loaded={fetched}>
        <BoostsList items={items} />
      </Loading>
    );
  }
}

export default connect(({
  auth: { currentUser },
  boosts: { items, count }
}) => ({ items, count, currentUser }), { fetchBoosts })(BoostsIndexPage);
