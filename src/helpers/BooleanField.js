import React, { PropTypes } from 'react';

import { toBool } from '../utils';

function BooleanField({ value }) {
  return (
    <span>
      {toBool(value) ? 'Yes' : 'No'}
    </span>
  );
}

BooleanField.propTypes = {
  value: PropTypes.bool
};

export default BooleanField;
