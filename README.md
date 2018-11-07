# node-zenhub

[![npm version](https://badge.fury.io/js/node-zenhub.svg)](https://badge.fury.io/js/node-zenhub)
[![Build Status](https://travis-ci.org/ilbonzo/node-zenhub.svg?branch=master)](https://travis-ci.org/ilbonzo/node-zenhub)
[![Coverage Status](https://coveralls.io/repos/github/ilbonzo/node-zenhub/badge.svg?branch=master)](https://coveralls.io/github/ilbonzo/node-zenhub?branch=master)
[![Dependencies Status](https://david-dm.org/ilbonzo/node-zenhub.svg)](https://david-dm.org/ilbonzo/node-zenhub)
[![BCH compliance](https://bettercodehub.com/edge/badge/ilbonzo/node-zenhub?branch=master)](https://bettercodehub.com/)

### A Node.js wrapper for the ZenHub API

### Install

```node-zenhub``` is available on ```npm``` and as such, can be installed through ```npm``` with ease.

To install ```node-zenhub``` and add it to your ```package.json``` file, use the following command:

```sh
$ npm install --save node-zenhub
```

### Documentation

The [official ZenHub documentation](https://github.com/ZenHubIO/API)

### Usage

In order to use ```node-zenhub``` you will need to generate an API token on the ZenHub website. Once you have this, add the library to your project with the following command:

```sh
$ npm install --save node-zenhub
```

Once installed you need to instantiate a new copy of ```node-zenhub``` in your application, like so:

```js
var ZenHub = require('node-zenhub'),
    api = new ZenHub('[token]');
```
*Note: replace [token] with your token.*

## Running the Tests

The tests are based on the [mocha](http://mochajs.org/)
module, which may be installed via npm. To run the tests make sure that the
npm dependencies are installed by running `npm install` from the project directory.

create file test/config.json from test/config.sample.json with your values
```
{
    "token": "xxxxxxxxxx",
    "repoId": "xxxxx",
    "issueId": 1
}

```

At the moment, test classes can only be run separately. This will e.g. run the Issues Api test:
```shell
npm test
```

### Issues

Please raise an issue on GitHub with as much information as possible and the steps to replicate (if possible).


## LICENSE

MIT license. See the LICENSE file for details.

---
Fork me on [github](https://github.com/ilbonzo/node-zenhub)

Created by [@ilbonzo](https://twitter.com/ilbonzo)

