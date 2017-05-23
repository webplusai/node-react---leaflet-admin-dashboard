import moment from 'moment';

export default function(value) {
  return moment(value, 'HHmm').format('hh:mm A');
}