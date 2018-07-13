import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('region', params.id);
  },
  actions: {
    willTransition() {
      this.controller.set('drawerOpen', false);
    },
  }
});
