import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchBundles } from '../../actions/BundleActions';
import { BundlesList, SearchForm } from '../../components';
import { LinkTo, Loading } from '../../helpers';

class BundlesIndexPage extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchBundles: PropTypes.func.isRequired
  };

  state = {
    fetched: false,
    order: '-createdAt',
    include: 'event_detail'
  };

  componentDidMount() {
    this.fetchData({});
  }

  fetchData({ search }) {
    const { fetchBundles } = this.props;
    const { order, include } = this.state;
    this.setState({ fetched: false }, () => fetchBundles({ order, include, search }).then(() => this.setState({ fetched: true })));
  }

  render() {
    const { items } = this.props;
    const { fetched, order, include } = this.state;
    return (
      <Loading className="container" ignoreLoader={(
        <div className="row m-b">
          <div className="col-md-6">
            <LinkTo className="btn btn-success" url="bundles/new">Create Bundle</LinkTo>
          </div>
          <div className="col-md-6 text-right">
            <SearchForm onSearch={({ search }) => this.fetchData({ search, order, include})} />
          </div>
        </div>
      )} loaded={fetched}>
        <BundlesList items={items} />
      </Loading>
    );
  }
}

export default connect(({ bundles: { items } }) => ({ items }), { fetchBundles })(BundlesIndexPage);
