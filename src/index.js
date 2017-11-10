const transportCalculators = {
  air: require('./air')
}

module.exports = {
  fromTransport: (distance, options) => {
    options = options || {}
    const calculators = options.modes
      ? hashFilter(transportCalculators, (_, __, key) => key in options.modes)
      : transportCalculators
    return hashMap(calculators, (val, _, key) => val(distance, options[key]))
  }
}

const hashMap = (hash, fn) => Object.keys(hash).reduce((rs, key, i, keys) => {
  const value = hash[key]
  rs[key] = fn(value, i, key, value, keys, hash)
  return rs
}, {})

const hashFilter = (hash, fn) => Object.keys(hash).reduce((rs, key, i, keys) => {
  const value = hash[key]
  if (fn(value, i, key, value, keys, hash)) {
    rs[key] = value
  }

  return rs
}, {})
