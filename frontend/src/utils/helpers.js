export function capitalize(str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function getEpoch() {
  return Math.round(Date.now() / 1000)
}
