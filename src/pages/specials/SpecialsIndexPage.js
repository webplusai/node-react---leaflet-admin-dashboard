import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchSpecials } from '../../actions/SpecialActions';
import { SpecialsList, SearchForm } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class SpecialsIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchSpecials: PropTypes.func.isRequired
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
    const { currentUser, fetchSpecials } = this.props;
    this.setState({ search, fetched: false }, () => fetchSpecials({ order, search, filters }, currentUser)
      .then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items, count } = this.props;
    const { fetched, order } = this.state;

    return (
      <Loading className="container" ignoreLoader={(
        <div className="row m-b">
          <div className="col-md-2">
            <LinkTo className="btn btn-success" url="specials/new">Create Special</LinkTo>
          </div>
          <div className="col-md-4">
            {fetched ? <h4>Specials ({count})</h4> : null}
          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={({ search }) => this.fetchData({ search, order })} />
          </div>
        </div>
      )} loaded={fetched}>
        <SpecialsList items={items} />
      </Loading>
    );
  }
}

export default connect(({
  auth: { currentUser },
  specials: { items, count }
}) => ({ items, count, currentUser }), { fetchSpecials })(SpecialsIndexPage);
