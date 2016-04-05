# node-zenhub

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

The tests are based on the [mocha](http://visionmedia.github.com/mocha/)
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
node_modules/mocha/bin/mocha test
```

### Issues

Please raise an issue on GitHub with as much information as possible and the steps to replicate (if possible).


## LICENSE

MIT license. See the LICENSE file for details.

