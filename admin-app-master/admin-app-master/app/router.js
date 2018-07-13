import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('region', { path: ':id' }, function() {

    this.route('website-management', function() {
      this.route('config');
    });
  });
});

export default Router;
