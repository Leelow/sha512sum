const test = require('ava')
const path = require('path')
const async = require('async')
const sha512sum = require('..')
const shas = require('./files/hash.sha512.json')

const shasCwd = path.join(__dirname, './files/dir')

test.cb('should return the corresponding hash', function (t) {
  async.each(shas, function (sha, next) {
    const shaPath = path.join(__dirname, 'files/dir', sha[0])
    sha512sum.fromFile(shaPath, function (err, res) {
      t.is(err, null)
      t.is(res, sha[1] + '  ' + shaPath)
      next()
    })
  }, t.end)
})

test.cb('should return the corresponding hash cwd options', function (t) {
  async.each(shas, function (sha, next) {
    const shaPath = path.join(__dirname, 'files/dir', sha[0])
    sha512sum.fromFile(shaPath, {cwd: shasCwd}, function (err, res) {
      t.is(err, null)
      t.is(res, sha[1] + '  ' + sha[0])
      next()
    })
  }, t.end)
})

test.cb('should return the corresponding hash with custom separator', function (t) {
  async.each(shas, function (sha, next) {
    const shaPath = path.join(__dirname, 'files/dir', sha[0])
    sha512sum.fromFile(shaPath, {cwd: shasCwd, sep: '|'}, function (err, res) {
      t.is(err, null)
      t.is(res, sha[1] + '|' + sha[0])
      next()
    })
  }, t.end)
})
