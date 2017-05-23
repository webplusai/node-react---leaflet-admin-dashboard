import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';

import { fetchUsers } from '../../actions/UserActions';
import { UsersList, SearchForm } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class UsersIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchUsers: PropTypes.func.isRequired
  };

  state = {
    fetched: false,
    search: '',
    limit: 30,
    page: 1,
    order: '-createdAt'
  };

  componentDidMount() {
    const { order, limit, page } = this.state;
    this.fetchData({ order, limit, page });
  }

  fetchData({ search, order, filters, limit, page }) {
    const { fetchUsers } = this.props;
    this.setState({ search, fetched: false }, () => fetchUsers({ order, search, filters, limit, page })
      .then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items, count } = this.props;
    const { fetched, order, limit, page } = this.state;

    return (
      <Loading className="container" ignoreLoader={(
        <div className="row m-b">
          <div className="col-md-2">
            {fetched ? <h4>Users ({count})</h4> : null}
          </div>
          <div className="col-md-4">

          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={({ search }) => this.fetchData({ search, order, limit, page: 1 })} />
          </div>
        </div>
      )} loaded={fetched}>
        <UsersList items={items} />
        {count > limit ? (
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              bsSize="medium"
              items={Math.floor(count / limit)}
              maxButtons={5}
              activePage={page}
              onSelect={p => this.setState({ page: p }, () => this.fetchData({ order, limit, page: this.state.page }))}
            />
          ) : null}
      </Loading>
    );
  }
}

export default connect(({ users: { items, count } }) => ({ items, count }), { fetchUsers })(UsersIndexPage);
