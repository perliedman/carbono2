module.exports = (distance, options) => {
  options = options || {}
  options = {
    ...defaults,
    ...options
  }

  const dClass = distance <= options.domesticLimit
    ? 'domestic'
    : distance <= options.shortHaulLimit
      ? 'shortHaul'
      : 'longHaul'

  const pClass = options.passengerClass || 'average'
  const perKm = emissions[dClass][pClass] || emissions[dClass]['average']

  return {
    emissions: distance * (1 + options.gcdUpliftFactor) * perKm,
    passengerClass: pClass,
    distanceClass: dClass
  }
}

const defaults = {
  gcdUpliftFactor: 0.09 /* Section 24 */,
  domesticLimit: 750, /* d < domesticLimit => domestic flight */
  shortHaulLimit: 1500, /* d < shortHaul => domestic flight */
  passengerClass: undefined, /* "economy", "business", "first" */
}

const emissions = {
  'domestic': {
    'average': 175.3
  },
  'shortHaul': {
    'average': 98.3,
    'economy': 93.7,
    'business': 140.5,
    'first': 140.5
  },
  'longHaul': {
    'average': 110.6,
    'economy': 80.7,
    'business': 234.0,
    'first': 322.8
  }
}