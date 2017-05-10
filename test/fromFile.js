/* eslint-env mocha */

const path = require('path')
const async = require('async')
const assert = require('assert')
const sha512sum = require('../sha512sum.js')
const shas = require('./files/hash.sha512.json')

const shasCwd = path.join(__dirname, './files/dir')

describe('fromFile', function () {
  it('should return the corresponding hash', function (done) {
    async.each(shas, function (sha, next) {
      var shaPath = path.join(__dirname, 'files/dir', sha[0])
      sha512sum.fromFile(shaPath, function (err, res) {
        assert.equal(err, null)
        assert.equal(res, sha[1] + '  ' + shaPath)
        next()
      })
    }, done)
  })

  it('should return the corresponding hash cwd options', function (done) {
    async.each(shas, function (sha, next) {
      var shaPath = path.join(__dirname, 'files/dir', sha[0])
      sha512sum.fromFile(shaPath, {cwd: shasCwd}, function (err, res) {
        assert.equal(err, null)
        assert.equal(res, sha[1] + '  ' + sha[0])
        next()
      })
    }, done)
  })

  it('should return the corresponding hash with custom separator', function (done) {
    async.each(shas, function (sha, next) {
      var shaPath = path.join(__dirname, 'files/dir', sha[0])
      sha512sum.fromFile(shaPath, {cwd: shasCwd, sep: '|'}, function (err, res) {
        assert.equal(err, null)
        assert.equal(res, sha[1] + '|' + sha[0])
        next()
      })
    }, done)
  })
})
