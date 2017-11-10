const path = require('path')
const hasha = require('hasha')
const slash = require('slash')
const walker = require('walk')
const defaults = require('defaults')

const hashaOptions = {algorithm: 'sha512'}
const defaultOptions = {sep: '  '}

function normPath (cwd, file) {
  return slash(path.relative(cwd, file))
}

function computeExtendedHash (file, stat, options, callback) {
  hasha.fromFile(file, hashaOptions)
    .catch(callback)
    .then(function (res) {
      const normed = options.cwd ? normPath(options.cwd, file) : file
      const hash = {
        depth: (normed.match(/\/|\\/g) || []).length,
        fname: stat.name,
        value: res + options.sep + normed
      }
      callback(null, hash)
    })
}

function computeExtendedHashSync (file, stat, options) {
  const normed = options.cwd ? normPath(options.cwd, file) : file
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
  if (typeof callback === 'undefined') callback = options
  options = defaults(options, defaultOptions)

  hasha.fromFile(file, hashaOptions)
    .catch(callback)
    .then(function (hash) {
      file = options.cwd ? normPath(options.cwd, file) : file
      callback(null, hash + options.sep + file)
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
  const hash = hasha.fromFileSync(file, hashaOptions)
  file = options.cwd ? normPath(options.cwd, file) : file
  return hash + options.sep + file
}

/**
 * Compute the sha512 hash of all files recusrively in a directory in the format "<hash>  /path/to/file\n<hash>  /path/to/file"
 * @param directory
 * @param options
 * @param callback
 */
module.exports.fromDirectory = function (directory, options, callback) {
  if (typeof callback === 'undefined') callback = options
  options = defaults(options, defaultOptions)

  const hashes = []

  walker.walk(directory)
    .on('errors', callback)
    .on('file', function (root, stat, next) {
      const file = path.normalize(path.join(root, stat.name))
      computeExtendedHash(file, stat, options, function (err, hash) {
        if (err) return callback(err)
        hashes.push(hash)
        next()
      })
    })
    .on('end', function () {
      const res = sortExtendedHashes(hashes).map(function (hash) {
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
  const hashes = []

  const walkerOptions = {
    listeners: {
      file: function (root, stat, next) {
        const file = path.normalize(path.join(root, stat.name))
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
