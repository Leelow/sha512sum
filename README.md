# sha512sum
[![NPM downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Build Status][appveyor-image]][appveyor-url]
[![Codacy Coverage][codacy-coverage-image]][codacy-coverage-url]
[![Codacy Grade][codacy-grade-image]][codacy-grade-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![Dev-dependencies][dev-dependencies-image]][dev-dependencies-url]
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

* cwd: current work directory
* sep: separator between hash and filename, default value is double-space

## License

[MIT](LICENSE) © [Léo Lozach](https://github.com/Leelow)

[downloads-image]: https://img.shields.io/npm/dt/sha512sum.svg?maxAge=3600
[downloads-url]: https://www.npmjs.com/package/sha512sum
[travis-image]: https://travis-ci.org/Leelow/sha512sum.svg?branch=master
[travis-url]: https://travis-ci.org/Leelow/sha512sum
[appveyor-image]: https://ci.appveyor.com/api/projects/status/ltppe1sp0ucnm6r3?svg=true
[appveyor-url]: https://ci.appveyor.com/project/Leelow/sha512sum
[codacy-coverage-image]: https://api.codacy.com/project/badge/Coverage/32e42e7d81a343e1a9ea01326ca74a40
[codacy-coverage-url]: https://www.codacy.com/app/Leelow/sha512sum?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Leelow/sha512sum&amp;utm_campaign=Badge_Coverage
[codacy-grade-image]: https://api.codacy.com/project/badge/Grade/32e42e7d81a343e1a9ea01326ca74a40
[codacy-grade-url]: https://www.codacy.com/app/Leelow/sha512sum?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Leelow/sha512sum&amp;utm_campaign=Badge_Grade
[dependencies-image]: https://david-dm.org/leelow/sha512sum/status.svg
[dependencies-url]: https://david-dm.org/leelow/sha512sum?type=dev
[dev-dependencies-image]: https://david-dm.org/leelow/sha512sum/dev-status.svg
[dev-dependencies-url]: https://david-dm.org/leelow/sha512sum?type=dev
[javascript-standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[javascript-standard-url]: http://standardjs.com/
