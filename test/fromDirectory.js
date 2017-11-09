const test = require('ava')
const path = require('path')
const sha512sum = require('..')
const shas = require('./files/hash.sha512.json')

const shasCwd = path.join(__dirname, './files/dir')

function computeHashFile (sep, root) {
  return shas.map(function (sha) {
    return sha[1] + sep + (root ? path.join(root, sha[0]) : sha[0])
  }).join('\n')
}

test.cb('should return the corresponding hash', function (t) {
  const shaPath = path.join(__dirname, 'files/dir')
  sha512sum.fromDirectory(shaPath, function (err, res) {
    t.is(err, null)
    t.is(res, computeHashFile('  ', shaPath))
    t.end()
  })
})

test.cb('should return the corresponding hash with cwd options', function (t) {
  const shaPath = path.join(__dirname, 'files/dir')
  sha512sum.fromDirectory(shaPath, {cwd: shasCwd}, function (err, res) {
    t.is(err, null)
    t.is(res, computeHashFile('  '))
    t.end()
  })
})

test.cb('should return the corresponding hash with custom separator', function (t) {
  const shaPath = path.join(__dirname, 'files/dir')
  sha512sum.fromDirectory(shaPath, {cwd: shasCwd, sep: '|'}, function (err, res) {
    t.is(err, null)
    t.is(res, computeHashFile('|'))
    t.end()
  })
})
