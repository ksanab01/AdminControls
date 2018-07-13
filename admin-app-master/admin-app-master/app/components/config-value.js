import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
import { not, equal } from '@ember/object/computed';
import { getOwner } from '@ember/application';

const Validations = buildValidations({
  'newValue': [
    validator('presence', true),
    validator('format', {
      type: 'email',
      disabled: not('model.isEmailInput')
    }),
    validator('format', {
      type: 'url',
      disabled: not('model.isURLInput')
    }),
    validator('format', {
      type: 'phone',
      disabled: not('model.isPhoneInput')
    }),
    validator('format', {
      regex: /^[@]/,
      message: 'Your input must begin with "@"',
      disabled: not('model.isHandleInput')
    }),
    validator('comma', {
      disabled: not('model.isCommaSeperatedInput')
    }),
    validator('pipe', {
      disabled: not('model.isPipeSeperatedInput')
    }),
  ],
});


export default Component.extend(Validations, {

    isEmailInput: equal('availableConfig.inputType', 'email'),
    isURLInput: equal('availableConfig.inputType', 'url'),
    isPhoneInput: equal('availableConfig.inputType', 'phone'),
    isHandleInput: equal('availableConfig.inputType', 'handle'),
    isCommaSeperatedInput: equal('availableConfig.inputType', 'comma'),
    isPipeSeperatedInput: equal('availableConfig.inputType', 'pipe'),

    router: service(),
    store: service(),
    notifications: service('notification-messages'),

    currentConfig: computed('configs.@each.availableConfigId','availableConfig.id', function() {
      var found = this.configs.find(config => config.availableConfigId === this.availableConfig.id);

      return found;
    }),

    actions: {
      async saveCurrentValue() {
        try {
          await this.currentConfig.save();
          this.notifications.success('Successfully updated config');
          set(this, 'showInput', false);
        } catch (err) {
          this.notifications.error(`Error updating config: ${get(err, 'errors.0.detail') || 'Unknown Error'}`);
        }
      },

      async deleteCurrentValue(){
        try{
          await this.currentConfig.destroyRecord();
          this.notifications.success('Successfully updated config');
        } catch (err) {
          this.notifications.error(`Error updating config: ${get(err, 'errors.0.detail') || 'Unknown Error'}`)
        }
      },

      cancelEdit() {
        this.currentConfig.rollbackAttributes();
        this.set('showInput', false);
      },

      async saveNewValue() {
        this.notifications.clearAll();

        try {
          const { validations } = await this.validate();

          if(!validations.isValid) {
            throw new Error(`${get(validations, 'errors.0.message')}`);
          }

          let config = this.store.createRecord('config', {
            value: this.newValue,
            availableConfigId: this.availableConfig.id,
            regionId: this.regionId,
          });

          await config.save();

          // refresh the current route's data to make sure the newly created model is displayed
          let route = getOwner(this).lookup(`route:${this.router.currentRouteName}`);
          route.refresh();

          this.notifications.success('Successfully saved config', {
            autoClear: true
          });

          set(this, 'showInput', false);
        } catch (e) {
          this.notifications.error(`Error saving config: ${e.message}`)
        }
      },
    },
});
