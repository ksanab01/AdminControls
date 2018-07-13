const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const { notFound: NotFoundError } = require('tssc-admin-errors');
const { expressWrap: wrap } = require('tssc-admin-helpers');

// const authentication = require('../../middlewares/authentication');
function authentication(req, res, next) {
  // TODO: authentication?
  next();
}

const db = require('../../../db/');

const Serializer = new JSONAPISerializer('region', {
  attributes: [
    'name',
  ],
  keyForAttribute: 'camelCase',
});

const getAll = wrap(async (req, res) => {
  await db.region.findAll().then((payload) => {
    if (!payload) {
      throw new NotFoundError('No regions found');
    }

    res.json(Serializer.serialize(payload));
  });
});

const getOne = wrap(async (req, res) => {
  await db.region.findOne({
    where: {
      id: parseInt(req.params.id, 10),
    },
  })
    .then((payload) => {
      if (!payload) {
        throw new NotFoundError(`Region with id ${req.params.id} not found`);
      }

      res.json(Serializer.serialize(payload));
    });
});

module.exports.autoroute = {
  get: {
    '/regions': [authentication, getAll],
    '/regions/:id': [authentication, getOne],
  },
};
