import axios from 'axios';

import { ADD_DATA } from '../constants/Data';

import { UPLOAD_HOST } from '../config';

export function addData(item = {}) {
  return {
    type: ADD_DATA,
    item
  };
}

export function fetchData() {
  return dispatch => axios.get(`${UPLOAD_HOST}/data`).then(({ data }) => dispatch(addData(data)));
}