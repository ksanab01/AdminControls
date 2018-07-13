import BaseValidator from 'ember-cp-validations/validators/base';

let errorMessage = 'Your inputs must be seperated with a comma and/or use numbers only';

export default BaseValidator.extend({
  validate(value /*, options, model, attribute*/) {
    if(value.endsWith(',')) {
      return errorMessage;
    }

    let match = value.match(/^[0-9]+(?:,[0-9]*)*$/);

    if (match) {
      return true;
    }

    return errorMessage;
  }
});
