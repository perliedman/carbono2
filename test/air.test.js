const air = require('../src/air')

test('can calculate emissions', () => {
  const e = air(100)
  expect(e).toBeDefined()
  expect(e.emissions).toBeGreaterThan(0)
})

test('can set domestic range', () => {
  const e = air(100, {domesticLimit: 200})
  expect(e.distanceClass).toBe('domestic')
})

test('can set short haul range', () => {
  const e = air(100, {domesticLimit: 50, shortHaulLimit: 200})
  expect(e.distanceClass).toBe('shortHaul')

  const e2 = air(250, {domesticLimit: 50, shortHaulLimit: 200})
  expect(e2.distanceClass).toBe('longHaul')
})

test('setting passenger class has effect', () => {
  const average = air(400, {domesticLimit:50, shortHaulLimit: 200})
  const economy = air(400, {passengerClass: 'economy', domesticLimit:50, shortHaulLimit: 200})
  const business = air(400, {passengerClass: 'business', domesticLimit:50, shortHaulLimit: 200})
  const first = air(400, {passengerClass: 'first', domesticLimit:50, shortHaulLimit: 200})

  expect(average.emissions).toBeGreaterThan(economy.emissions)
  expect(average.emissions).toBeLessThan(business.emissions)
  expect(average.emissions).toBeLessThan(first.emissions)
  expect(first.emissions).toBeGreaterThan(business.emissions)
})

test('setting gcd uplift has effect', () => {
  const eWithoutUplift = air(800, {gcdUpliftFactor: 0})
  const eWithUplift = air(800, {gcdUpliftFactor: 0.1})
  expect(eWithUplift.emissions).toBeGreaterThan(eWithoutUplift.emissions)
})
