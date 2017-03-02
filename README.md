# sha512sum
> The same behaviour as linux command with directories support. [https://linux.die.net/man/1/sha512sum](https://linux.die.net/man/1/sha512sum)

Works Linux and Windows.

## Install

```
$ npm install --save sha512sum
```

## Usage

> For a file

```js
const sha512sum = require('sha512sum');

// 992 ... 80a  /path/to/file
sha512sum.fromFile('/path/to/file', options, function(err, hash) {
  if (err) throw err
  console.log(hash)
});

console.log(sha512sum.fromFileSync('/path/to/file', options)) // sync
```
Similar to linux command:

    $ sha512sum 992 ... 80a /path/to/file
  
 > For a directory

```js
const sha512sum = require('sha512sum');

// 992 ... 80a  /path/to/dir/h.txt
// erf ... e3f  /path/to/dir/b/e.doc
// cd5 ... r9g  /path/to/dir/b/l.png
// b2r ... v2f  /path/to/dir/c/l.csv
// adr ... 9t6  /path/to/dir/d/o.world
sha512sum.fromDirectory('/path/to/dir', options, function(err, hash) {
  if (err) throw err
  console.log(hash)
});

console.log(sha512sum.fromDirectorySync('/path/to/dir', options)) // sync
```

Similar to linux command:

    $ find files -type f -printf "%d%p\n" | sort -n | cut -c 2- | xargs sha512sum

## Options

* cwd: current work directory
* sep: separator between hash and filename, default value is double-space

## License

[MIT](LICENSE) © [Léo Lozach](https://github.com/Leelow)

[downloads-image]: https://img.shields.io/npm/dt/object-reader.svg?maxAge=3600
[downloads-url]: https://www.npmjs.com/package/sha512sum
[travis-image]: https://travis-ci.org/Leelow/sha512sum.svg?branch=master
[travis-url]: https://travis-ci.org/Leelow/osha512sum
[dependencies-image]: https://david-dm.org/leelow/sha512sum/status.svg
[dependencies-url]: https://david-dm.org/leelow/sha512sum?type=dev
[dev-dependencies-image]: https://david-dm.org/leelow/sha512sum/dev-status.svg
[dev-dependencies-url]: https://david-dm.org/leelow/sha512sum?type=dev
[javascript-standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[javascript-standard-url]: http://standardjs.com/
