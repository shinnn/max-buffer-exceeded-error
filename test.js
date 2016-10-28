'use strict';

const MaxBufferExceededError = require('.');
const test = require('tape');

test('MaxBufferExceededError', t => {
  t.plan(7);

  const err = new MaxBufferExceededError('stdout', 1);

  t.strictEqual(err instanceof Error, true, 'should create an error.');

  t.strictEqual(err.message, 'stdout maxBuffer exceeded. (>1)', 'should set an error message.');

  t.strictEqual(err.maxBuffer, 1, 'should add `maxBuffer` property to the error.');

  t.throws(
    MaxBufferExceededError,
    /TypeError/,
    'should disallow function call without `new`.'
  );

  t.throws(
    () => new MaxBufferExceededError(1, 1),
    /TypeError.*1 is not a string\. Expected a non-empty string\./,
    'should throw a type error when the first argument is not a string.'
  );

  t.throws(
    () => new MaxBufferExceededError('', 1),
    /TypeError.*Expected a non-empty string but recieved an empty string\./,
    'should throw a type error when the first argument is an empty string.'
  );

  t.throws(
    () => new MaxBufferExceededError('stdout', true),
    /TypeError.*true is not a number\. Expected a number of max buffer size\./,
    'should throw a type error when the second argument is not a number.'
  );
});
