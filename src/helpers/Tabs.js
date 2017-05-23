import React, { PropTypes } from 'react';

import { LinkTo } from '../helpers';

function Tabs({ modelsName, itemID, listable, addable, editable, deletable }) {
  return (
    <div className="row m-b">
      <div className="col-md-12">
        <div className="btn-group">
          {listable ? (
              <LinkTo button color="default" url={modelsName}>
                All Records
              </LinkTo>
            ) : null}
          {addable ? (
              <LinkTo button color="success" url={`${modelsName}/new`}>
                Create
              </LinkTo>
            ) : null}
          {itemID ? (
              <LinkTo button color="info" url={`${modelsName}/${itemID}`}>
                Show
              </LinkTo>
            ) : null}
          {editable && itemID ? (
              <LinkTo button color="primary" url={`${modelsName}/${itemID}/edit`}>
                Edit
              </LinkTo>
            ) : null}
          {deletable && itemID ? (
              <LinkTo button color="danger" url={`${modelsName}/${itemID}/delete`}>
                Delete
              </LinkTo>
            ) : null}
        </div>
      </div>
    </div>
  );
}

Tabs.defaultProps = {
  listable: true,
  addable: true,
  editable: true,
  deletable: true,
};

Tabs.propTypes = {
  itemID: PropTypes.string,
  listable: PropTypes.bool,
  addable: PropTypes.bool,
  editable: PropTypes.bool,
  deletable: PropTypes.bool,
};

export default Tabs;
