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

test('should return the corresponding hash', function (t) {
  const shaPath = path.join(__dirname, 'files/dir')
  t.is(sha512sum.fromDirectorySync(shaPath), computeHashFile('  ', shaPath))
})

test('should return the corresponding hash with cwd options', function (t) {
  const shaPath = path.join(__dirname, 'files/dir')
  t.is(sha512sum.fromDirectorySync(shaPath, {cwd: shasCwd}), computeHashFile('  '))
})

test('should return the corresponding hash with custom separator', function (t) {
  const shaPath = path.join(__dirname, 'files/dir')
  t.is(sha512sum.fromDirectorySync(shaPath, {cwd: shasCwd, sep: '|'}), computeHashFile('|'))
})
