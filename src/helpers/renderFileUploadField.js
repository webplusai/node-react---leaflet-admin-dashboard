import isObject from 'lodash/isObject';
import React, { PropTypes } from 'react';
import DropzoneComponent from 'react-dropzone-component';
import cl from 'classnames';

import { UPLOAD_HOST_URI } from '../config';
import { fileUrl } from '../utils';

function renderFileUploadField({ input, label, meta: { touched, error, warning } }) {
  const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: UPLOAD_HOST_URI
  };
  
  const eventHandlers = {
    success: (file) => input.onChange(JSON.parse(file.xhr.response))
  };

  return (
    <fieldset className={cl('form-group', { 'has-error': (touched && error) })}>
      {label ? <label>{label}</label> : null}

      {isObject(input.value) && input.value.path ? (
        <img className="img-responsive upload-image" src={fileUrl(input.value.path)} alt="" />
        ) : null}
      
      <DropzoneComponent
        config={componentConfig}
        eventHandlers={eventHandlers}
      />
      {touched && ((error && <div className="error help-block">{error}</div>) || (warning && <div className="error">{warning}</div>))}
    </fieldset>
  );
}

renderFileUploadField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

export default renderFileUploadField;