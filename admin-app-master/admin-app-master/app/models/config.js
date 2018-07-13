import DS from 'ember-data';


export default DS.Model.extend({
  value: DS.attr(),
  availableConfigId: DS.attr('string'),
  regionId: DS.attr(),
});
