module.exports = (sequelize, Datatypes) => sequelize.define('config', {
  value: Datatypes.STRING,
  regionId: { type: Datatypes.INTEGER, unique: 'oneConfigPerRegion', allowNull: false },
  availableConfigId: { type: Datatypes.INTEGER, unique: 'oneConfigPerRegion', allowNull: false },
});
