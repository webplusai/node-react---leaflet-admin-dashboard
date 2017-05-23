import moment from 'moment';

export default function(value) {
  return moment(value, 'X').format('MM/DD/YYYY');
}