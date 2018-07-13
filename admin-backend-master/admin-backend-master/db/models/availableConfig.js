module.exports = (sequelize, Datatypes) => sequelize.define('availableConfig', {
  key: Datatypes.STRING,
  description: Datatypes.STRING,
  inputType: { type: Datatypes.STRING, allowNull: true },
}, {
  timestamps: false,
});
