const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const { notFound: NotFoundError } = require('tssc-admin-errors');
const { expressWrap: wrap } = require('tssc-admin-helpers');

// const authentication = require('../../middlewares/authentication');
function authentication(req, res, next) {
  // TODO: authentication?
  next();
}

const db = require('../../../db/');

const Serializer = new JSONAPISerializer('available-config', {
  attributes: [
    'key',
    'description',
    'inputType',
  ],
  keyForAttribute: 'camelCase',
});

const getAll = wrap(async (req, res) => {
  const payload = await db.availableConfig.findAll();

  if (!payload) {
    throw new NotFoundError('No availble configs found');
  }

  res.json(Serializer.serialize(payload));
});

module.exports.autoroute = {
  get: {
    '/available-configs': [authentication, getAll],
  },
};
