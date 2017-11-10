# sha512sum

[![npm version][npm-version-image]][npm-version-url]
[![Build Status][travis-image]][travis-url]
[![Build Status][appveyor-image]][appveyor-url]
[![Coverage][coveralls-image]][coveralls-url]
[![JavaScript Style Guide][javascript-standard-image]][javascript-standard-url]

> The same behaviour as linux command with directories support. [https://linux.die.net/man/1/sha512sum](https://linux.die.net/man/1/sha512sum)

Works on Linux and Windows.

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

console.log(sha512sum.fromFileSync('/path/to/file', options))
```
Similar to linux command:

    $ sha512sum /path/to/file

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

console.log(sha512sum.fromDirectorySync('/path/to/dir', options))
```

Similar to linux command:

    $ find files -type f -printf "%d%p\n" | sort -n | cut -c 2- | xargs sha512sum

## Options

* `cwd`: current work directory
* `sep`: separator between hash and filename, default value is double-space

## License

[MIT](LICENSE) © [Léo Lozach](https://github.com/Leelow)

[npm-version-image]: https://badge.fury.io/js/sha512sum.svg
[npm-version-url]: https://www.npmjs.com/package/sha512sum
[travis-image]: https://travis-ci.org/Leelow/sha512sum.svg?branch=master
[travis-url]: https://travis-ci.org/Leelow/sha512sum
[appveyor-image]: https://ci.appveyor.com/api/projects/status/ltppe1sp0ucnm6r3?svg=true
[appveyor-url]: https://ci.appveyor.com/project/Leelow/sha512sum
[coveralls-image]: https://coveralls.io/repos/github/Leelow/sha512sum/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/Leelow/sha512sum?branch=master
[javascript-standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[javascript-standard-url]: http://standardjs.com/
