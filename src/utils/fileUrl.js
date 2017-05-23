import { UPLOAD_HOST } from '../config';

export default function(file) {
  return `${UPLOAD_HOST}/uploads/${file}`;
}