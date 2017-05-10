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
  it('should return the corresponding hash', function () {
    var shaPath = path.join(__dirname, 'files/dir')
    assert.equal(sha512sum.fromDirectorySync(shaPath), computeHashFile('  ', shaPath))
  })

  it('should return the corresponding hash with cwd options', function () {
    var shaPath = path.join(__dirname, 'files/dir')
    assert.equal(sha512sum.fromDirectorySync(shaPath, {cwd: shasCwd}), computeHashFile('  '))
  })

  it('should return the corresponding hash with custom separator', function () {
    var shaPath = path.join(__dirname, 'files/dir')
    assert.equal(sha512sum.fromDirectorySync(shaPath, {cwd: shasCwd, sep: '|'}), computeHashFile('|'))
  })
})
