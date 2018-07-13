import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    save(model) {
      model.save();
    },
    reset(model) {
      model.rollbackAttributes();
    }
  }


});
