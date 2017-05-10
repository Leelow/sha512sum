/* eslint-env mocha */

const path = require('path')
const assert = require('assert')
const sha512sum = require('../sha512sum.js')
const shas = require('./files/hash.sha512.json')

const shasCwd = path.join(__dirname, './files/dir')

function computeHashFile (sep, root) {
  return shas.map(function (sha) {
    return sha[1] + sep + (root ? path.join(root, sha[0]) : sha[0])
  }).join('\n')
}

describe('fromDirectorySync', function () {
  it('should return the corresponding hash', function (done) {
    var shaPath = path.join(__dirname, 'files/dir')
    sha512sum.fromDirectory(shaPath, function (err, res) {
      assert.equal(err, null)
      assert.equal(res, computeHashFile('  ', shaPath))
      done()
    })
  })

  it('should return the corresponding hash with cwd options', function (done) {
    var shaPath = path.join(__dirname, 'files/dir')
    sha512sum.fromDirectory(shaPath, {cwd: shasCwd}, function (err, res) {
      assert.equal(err, null)
      assert.equal(res, computeHashFile('  '))
      done()
    })
  })

  it('should return the corresponding hash with custom separator', function (done) {
    var shaPath = path.join(__dirname, 'files/dir')
    sha512sum.fromDirectory(shaPath, {cwd: shasCwd, sep: '|'}, function (err, res) {
      assert.equal(err, null)
      assert.equal(res, computeHashFile('|'))
      done()
    })
  })
})
