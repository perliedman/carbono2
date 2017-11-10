const co2 = require('../src')

test('can calculate transport emissions', () => {
  const e = co2.transport(400)
  expect(e).toBeDefined()
  expect(e.air).toBeDefined()
  expect(e.air.emissions).toBeGreaterThan(0)
})
