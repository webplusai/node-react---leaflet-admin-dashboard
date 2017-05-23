import includes from 'lodash/includes';
import isString from 'lodash/isString';

export default function(value) {
  if (isString(value)) {
    return !includes(['no', 'false'], value);
  } else {
    return !!value;
  }
}