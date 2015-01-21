# Midichlorian.js - Access the Force, straight from Node.js

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][codeclimatecov-image]][codeclimatecov-url]
[![Code climate][codeclimate-image]][codeclimate-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]


## Install

```sh
$ npm install --save swapi
```


## Usage

```js
var midichlorian = require('midichlorian');

midichlorian.people.get(1).then(function(p) {
  //Prints 'Luke Skywalker'
  console.log(p.name);
});
```


## License

MIT © [Fábio Oliveira](https://twitter.com/fanoliveira)

[npm-image]: https://img.shields.io/npm/v/midichlorian.svg?style=flat-square
[npm-url]: https://npmjs.org/package/midichlorian
[travis-image]: https://img.shields.io/travis/foliveira/midichlorian.svg?style=flat-square
[travis-url]: https://travis-ci.org/foliveira/midichlorian
[codeclimatecov-image]: https://img.shields.io/codeclimate/coverage/github/foliveira/midichlorian.svg?style=flat-square
[codeclimatecov-url]: https://coveralls.io/r/foliveira/midichlorian?branch=master
[codeclimate-image]: https://img.shields.io/codeclimate/github/foliveira/midichlorian.svg?style=flat-square
[codeclimate-url]: https://coveralls.io/r/foliveira/midichlorian?branch=master
[david-image]: http://img.shields.io/david/foliveira/midichlorian.svg?style=flat-square
[david-url]: https://david-dm.org/foliveira/midichlorian
[license-image]: http://img.shields.io/npm/l/midichlorian.svg?style=flat-square
[license-url]: LICENSE.md
[downloads-image]: http://img.shields.io/npm/dm/midichlorian.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/midichlorian
