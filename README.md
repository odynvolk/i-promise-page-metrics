# i-promise-page-metrics
> A node module for retrieving different page metrics for an URL

For those of you who want to get page metrics for different URLs. This module will supply you with `Google+` and `Moz metrics`.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i-promise-page-metrics --save
```

## Usage

```js

const pageMetrics = require("i-promise-page-metrics");

pageMetrics.googleplus(url)
  .then((response) => {
    //=> {count: 66}
  });

pageMetrics.moz(url)
  .then((response) => {
    //=> {da: 1, pa: 22, rank: 2, links: 100}
  });

````

## Running tests

Install dev dependencies:

```sh
$ npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/odynvolk/i-promise-page-metrics/issues/new)

## Author

+ [github/odynvolk](https://github.com/odynvolk)

## License

Released under the MIT license.

