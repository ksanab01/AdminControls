import BaseValidator from 'ember-cp-validations/validators/base';

let errorMessage = 'This input must be integers seperated by pipe characters e.g. |1|77|39|';

export default BaseValidator.extend({
  validate(value /*, options, model, attribute*/) {

    let match = value.match(/^[|]\d*([|]\d*)*[|]$/);

    if(match) {
      return true;
    }

    return errorMessage;

  }
});
