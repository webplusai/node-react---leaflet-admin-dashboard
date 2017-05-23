import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createSpecial } from '../../actions/SpecialActions';

import { SpecialForm } from '../../components';

class SpecialAddPage extends Component {

  static propTypes = {
    createSpecial: PropTypes.func.isRequired
  };

  render() {
    const { errorMessage, currentUser, createSpecial } = this.props;
    return (
      <div className="container">
        <SpecialForm errorMessage={errorMessage} onSave={special => createSpecial(special, currentUser)} />
      </div>
    );
  }
}

export default connect(({
  auth: { currentUser },
  specials: { errorMessage }
}) => ({ errorMessage, currentUser }), { createSpecial })(SpecialAddPage);