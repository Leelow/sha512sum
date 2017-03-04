const path = require('path')
const hasha = require('hasha')
const slash = require('slash')
const defaults = require('defaults')
const walker = require('walk')

const hashaOptions = {algorithm: 'sha512'}
const defaultOptions = {
  sep: '  '
}

function normPath (file, options) {
  if (options.cwd) return slash(path.relative(options.cwd, file))
  else return file
}

function computeExtendedHash (file, stat, options, callback) {
  hasha.fromFile(file, hashaOptions)
    .catch(callback)
    .then(function (res) {
      var normed = normPath(file, options)
      var hash = {
        depth: (normed.match(/\/|\\/g) || []).length,
        fname: stat.name,
        value: res + options.sep + normed
      }
      callback(null, hash)
    })
}

function computeExtendedHashSync (file, stat, options) {
  var normed = normPath(file, options)
  return {
    depth: (normed.match(/\/|\\/g) || []).length,
    fname: stat.name,
    value: hasha.fromFileSync(file, hashaOptions) + options.sep + normed
  }
}

function sortExtendedHashes (hashes) {
  hashes.sort(function (h1, h2) {
    return (h1.depth < h2.depth ? -1 : (h1.depth > h2.depth ? 1 : h1.fname.localeCompare(h2.fname)))
  })
  return hashes
}

/**
 * Compute the sha512 hash of a file in the format "<hash>  /path/to/file"
 * @param file
 * @param options
 * @param callback
 */
module.exports.fromFile = function (file, options, callback) {
  var isCallback = callback
  callback = callback || options
  options = isCallback ? options : {}

  options = defaults(options, defaultOptions)

  hasha.fromFile(file, hashaOptions)
    .catch(callback)
    .then(function (hash) {
      callback(null, hash + options.sep + normPath(file, options))
    })
}

/**
 * <SYNC> Compute the sha512 hash of a file in the format "<hash>  /path/to/file"
 * @param file
 * @param options
 * @returns {*}
 */
module.exports.fromFileSync = function (file, options) {
  options = defaults(options, defaultOptions)
  return hasha.fromFileSync(file, hashaOptions) + options.sep + normPath(file, options)
}

/**
 * Compute the sha512 hash of all files recusrively in a directory in the format "<hash>  /path/to/file\n<hash>  /path/to/file"
 * @param directory
 * @param options
 * @param callback
 */
module.exports.fromDirectory = function (directory, options, callback) {
  callback = callback || options
  options = defaults(options, defaultOptions)
  var hashes = []

  walker.walk(directory)
    .on('errors', callback)
    .on('file', function (root, stat, next) {
      var file = path.normalize(path.join(root, stat.name))
      computeExtendedHash(file, stat, options, function (err, hash) {
        if (err) return callback(err)
        hashes.push(hash)
        next()
      })
    })
    .on('end', function () {
      var res = sortExtendedHashes(hashes).map(function (hash) {
        return hash.value
      }).join('\n')
      return callback(null, res)
    })
}

/**
 * <SYNC> Compute the sha512 hash of all files recusrively in a directory in the format "<hash>  /path/to/file\n<hash>  /path/to/file"
 * @param directory
 * @param options
 * @returns {string}
 */
module.exports.fromDirectorySync = function (directory, options) {
  options = defaults(options, defaultOptions)
  var hashes = []

  var walkerOptions = {
    listeners: {
      file: function (root, stat, next) {
        var file = path.normalize(path.join(root, stat.name))
        hashes.push(computeExtendedHashSync(file, stat, options))
        next()
      },
      errors: function () {
        throw new Error(JSON.stringify([].slice.call(arguments), null, 4))
      }
    }
  }
  walker.walkSync(directory, walkerOptions)

  return sortExtendedHashes(hashes).map(function (hash) {
    return hash.value
  }).join('\n')
}
