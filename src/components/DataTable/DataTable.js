import take from 'lodash/take';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchData } from '../../actions/DataActions';

class DataTable extends Component {

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { item } = this.props;

    return (
      <table className="table table-bordered table-hover table-striped table-responsive">
        <tbody>
          <tr>
            <td>Users</td>
            <td>{item.users_count}</td>
          </tr>
          <tr>
            <td>Ages</td>
            <td>
              <table className="table table-bordered table-hover table-striped table-responsive">
                <tbody>
                  {take(item.users_ages || [], 10).map(({ age, per_cent }, index) => (
                    <tr key={index}>
                      <td>{age}</td>
                      <td>{per_cent.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>Users Added This Month</td>
            <td>{item.new_users_count}</td>
          </tr>
          <tr>
            <td>Available Plans</td>
            <td>{item.available_itineraries}</td>
          </tr>
          <tr>
            <td>Plans Expiring In The Next 7 Days</td>
            <td>{item.plans_expiring_count}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default connect(({ data: { item } }) => ({ item }), { fetchData })(DataTable);
