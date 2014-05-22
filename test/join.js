var test = require('tap').test;
var joinStream = require('../');
var split = require('event-stream').split;
var concat = require('concat-stream');
var from = require('from')

test('join a split stream', function (t) {
  t.plan(1);
  
  from(['abc\ndef\nhi\njkl'])
    .pipe(split())
    .pipe(joinStream(','))
    .pipe(concat(function (data) {
      t.equal(data.toString(), 'abc,def,hi,jkl')
    }))


});

test('include final seperator', function (t) {
  t.plan(1);
  
  from(['abc\ndef\nhi\njkl'])
    .pipe(split())
    .pipe(joinStream(',', {end: true}))
    .pipe(concat(function (data) {
      t.equal(data.toString(), 'abc,def,hi,jkl,')
    }))

})