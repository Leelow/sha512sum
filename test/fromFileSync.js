const test = require('ava')
const path = require('path')
const sha512sum = require('..')
const shas = require('./files/hash.sha512.json')

const shasCwd = path.join(__dirname, './files/dir')

test('should return the corresponding hash', function (t) {
  shas.forEach(function (sha) {
    const shaPath = path.join(__dirname, 'files/dir', sha[0])
    t.is(sha512sum.fromFileSync(shaPath), sha[1] + '  ' + shaPath)
  })
})

test('should return the corresponding hash with cwd options', function (t) {
  shas.forEach(function (sha) {
    const shaPath = path.join(__dirname, 'files/dir', sha[0])
    t.is(sha512sum.fromFileSync(shaPath, {cwd: shasCwd}), sha[1] + '  ' + sha[0])
  })
})

test('should return the corresponding hash with custom separator', function (t) {
  shas.forEach(function (sha) {
    const shaPath = path.join(__dirname, 'files/dir', sha[0])
    t.is(sha512sum.fromFileSync(shaPath, {cwd: shasCwd, sep: '|'}), sha[1] + '|' + sha[0])
  })
})
