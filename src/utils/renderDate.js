import moment from 'moment';

export default function(value) {
  return moment(value).format('MM/DD/YYYY');
}