const transportCalculators = {
  air: require('./air')
}

module.exports = {
  transport: (distance, options) => {
    options = options || {}
    return hashMap(transportCalculators, (val, _, key) => val(distance, options[key]))
  }
}

const hashMap = (hash, fn) => Object.keys(hash).reduce((rs, key, i, keys) => {
  const value = hash[key]
  rs[key] = fn(value, i, key, value, keys, hash)
  return rs
}, {})
