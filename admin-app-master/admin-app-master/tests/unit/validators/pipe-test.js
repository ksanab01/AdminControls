import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let validator;

function goodString(assert, string) {
  assert.equal(validator.validate(string), true, string);
}

function badString(assert, string) {
  assert.equal(
    validator.validate(string),
    'This input must be integers seperated by pipe characters e.g. |1|77|39|',
    string,
  );
}

module('Unit | Validator | pipe', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    validator = this.owner.lookup('validator:pipe');
  })

  test('valid examples work', function(assert) {
    goodString(assert, '|1|');
    goodString(assert, '|1|1|2|5|');
    goodString(assert, '|14|1|28878723472|5|');

    /**
     * I know it may look a bit odd but the below inputs are not exactly invalid 😳
     *
     * The PHP implementations that we could find that use this search for the user's ID
     * in the string by doing strstr('|' . $UserId . '|') so technically any number of
     * | characters in sequence is correct... strange...
     */
    goodString(assert, '||445|');
    goodString(assert, '||');
    goodString(assert, '||||6|');
    goodString(assert, '|3|||6|');
    goodString(assert, '|3||||');
  })

  test('invalid examples thow errors', function(assert) {
    badString(assert, `|'hello'|`);
    badString(assert, '|hello|');
    badString(assert, '|1|face|');
  })
});
