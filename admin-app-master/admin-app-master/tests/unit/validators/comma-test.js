import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let validator;

function goodString(assert, string) {
  assert.equal(validator.validate(string), true, string);
}

function badString(assert, string) {
  assert.equal(
    validator.validate(string),
    'Your inputs must be seperated with a comma and/or use numbers only',
    string,
  );
}

module('Unit | Validator | comma', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    validator = this.owner.lookup('validator:comma');
  })

  test('valid examples work', function(assert) {
    goodString(assert, '1');
    goodString(assert, '1,2,3,4');
    goodString(assert, '14,1,28878723472,5');

  })

  test('invalid examples thow errors', function(assert) {
    badString(assert, `'hello'`);
    badString(assert, 'hello');
    badString(assert, '1,face');
    badString(assert, ',1,');
    badString(assert, ',1');
    badString(assert, '1,');
    badString(assert, ',,,,,');
    badString(assert, ',,,5,,');
  })
});
