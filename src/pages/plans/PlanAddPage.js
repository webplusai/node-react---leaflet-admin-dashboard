import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createPlan } from '../../actions/PlanActions';

import { PlanForm } from '../../components';

class PlanAddPage extends Component {

  static propTypes = {
    createPlan: PropTypes.func.isRequired
  };

  render() {
    const { errorMessage, createPlan } = this.props;
    return (
      <div className="container">
        <PlanForm errorMessage={errorMessage} onSave={plan => createPlan(plan)} />
      </div>
    );
  }
}

export default connect(({ plans: { errorMessage } }) => ({ errorMessage }), { createPlan })(PlanAddPage);