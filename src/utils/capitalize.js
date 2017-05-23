export default function(value) {
  return value.replace(/\b\w/g, l => l.toUpperCase());
}