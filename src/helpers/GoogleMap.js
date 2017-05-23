import React, { PropTypes } from 'react';
import { Gmaps, Marker } from 'react-gmaps';

import { GOOGLE_MAP_API_KEY } from '../config';

function GoogleMap({ location: { latitude, longitude } }) {
  return (
    <Gmaps
      width={'600px'}
      height={'400px'}
      lat={latitude}
      lng={longitude}
      zoom={12}
      loadingMessage={'Be happy'}
      params={{ v: '3.exp', key: GOOGLE_MAP_API_KEY }}
    >
      <Marker
        lat={latitude}
        lng={longitude}
        draggable={false}
      />
    </Gmaps>
  );
}

GoogleMap.propTypes = {
  location: PropTypes.object.isRequired,
};

export default GoogleMap;
