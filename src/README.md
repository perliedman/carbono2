carbono²
========

A carbon dioxide (CO²) emission calculator for JavaScript.

Currently supports calculating emissions for different modes of transport, like air, car, train, etc.

Note, this is more "in progress" than you average node module, at the moment, so pretty limited functionality

## Using

Install:

```bash
npm i co2
```

Calculate:

```js
const co2 = require('carbono2')

const e = co2.fromTransport(400)

/* =>

  {
    air: {
      emissions: 76430,
      passengerClass: 'average',
      distanceClass: 'domestic'
    }
  }
*/
```
