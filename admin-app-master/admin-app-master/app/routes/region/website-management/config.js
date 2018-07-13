import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model() {

    const regionModel = this.modelFor('region');

    return hash({
      availableConfigs: this.store.findAll('available-config'),
      configs: this.store.query('config', {
        region: regionModel.id
      }),
      regionId: regionModel.id,
    });
  }
});
