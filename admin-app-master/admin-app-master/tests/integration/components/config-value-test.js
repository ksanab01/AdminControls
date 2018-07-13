import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | config-value', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('modelConfigs', [])

    await render(hbs`{{config-value configs=modelConfigs}}`);

    let plusIcon = find('md-icon[md-font-icon="add"]');

    assert.ok(plusIcon, 'Plus icon is missing');
  });
});
