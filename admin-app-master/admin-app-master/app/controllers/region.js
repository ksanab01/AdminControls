import Controller, { inject as controller } from '@ember/controller';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  application: controller(),
  allRegions: alias('application.model'),
  router: service(),
  currentRouteName: alias('router.currentRouteName'),

  actions: {
    sendToRegion(region) {
      this.transitionToRoute(this.currentRouteName, region.id);
    }
  },

  expandedItem: computed('router.currentRouteName', function () {
    const matched = this.currentRouteName.match(/^region\.([\w-]*)\..*$/)

    if(matched) {
      return matched[1];
    }
  })
});
