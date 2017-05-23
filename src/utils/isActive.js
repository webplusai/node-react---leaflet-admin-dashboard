export default function(path) {
  return new RegExp(`/${path}`).test(location.pathname);
}