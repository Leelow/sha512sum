/* eslint-env mocha */

const path = require('path')
const assert = require('chai').assert
const sha512sum = require('../sha512sum.js')
const shas = require('./files/hash.sha512.json')

const shasCwd = path.join(__dirname, './files/dir')

describe('fromFileSync', function () {
  it('should return the corresponding hash', function () {
    shas.forEach(function (sha) {
      var shaPath = path.join(__dirname, 'files/dir', sha[0])
      assert.equal(sha512sum.fromFileSync(shaPath), sha[1] + '  ' + shaPath)
    })
  })

  it('should return the corresponding hash with cwd options', function () {
    shas.forEach(function (sha) {
      var shaPath = path.join(__dirname, 'files/dir', sha[0])
      assert.equal(sha512sum.fromFileSync(shaPath, {cwd: shasCwd}), sha[1] + '  ' + sha[0])
    })
  })

  it('should return the corresponding hash with custom separator', function () {
    shas.forEach(function (sha) {
      var shaPath = path.join(__dirname, 'files/dir', sha[0])
      assert.equal(sha512sum.fromFileSync(shaPath, {cwd: shasCwd, sep: '|'}), sha[1] + '|' + sha[0])
    })
  })
})
