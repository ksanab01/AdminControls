const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const _ = require('lodash');

const { notFound: NotFoundError, badRequest: BadRequestError } = require('tssc-admin-errors');
const { expressWrap: wrap } = require('tssc-admin-helpers');


// const authentication = require('../../middlewares/authentication');
function authentication(req, res, next) {
  // TODO: authentication?
  next();
}

const db = require('../../../db/');

const Serializer = new JSONAPISerializer('config', {
  attributes: [
    'availableConfigId',
    'value',
    'regionId',
  ],

  keyForAttribute: 'camelCase',
});

const getAll = wrap(async (req, res) => {
  if (!req.query.region) {
    throw new BadRequestError('`region` query param is required');
  }

  await db.config.findAll({
    where: {
      regionId: req.query.region,
    },
  }).then((payload) => {
    if (!payload) {
      throw new NotFoundError('No regions found');
    }

    res.json(Serializer.serialize(payload));
  });
});

const updateConfig = wrap(async (req, res) => {
  if (!req.body.data.attributes.value) {
    throw new BadRequestError('No value provided');
  }

  const config = await db.config.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!config) {
    throw new NotFoundError(`Alert with id ${req.params.id} not found`);
  }

  config.value = req.body.data.attributes.value;

  await config.save();

  res.status(204).send();
});

const createConfig = wrap(async (req, res) => {
  if (!req.body.data.attributes.value) {
    throw new BadRequestError('No value provided');
  }

  if (!req.body.data.attributes.availableConfigId) {
    throw new BadRequestError('No Available Config ID provided');
  }

  if (!req.body.data.attributes.regionId) {
    throw new BadRequestError('No Region ID provided');
  }

  const newConfig = await db.config.create(_.pick(req.body.data.attributes, ['value', 'availableConfigId', 'regionId']));

  res.json(Serializer.serialize(newConfig));
});

const deleteConfig = wrap(async (req, res) => {
  const config = await db.config.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!config) {
    throw new NotFoundError(`Alert with id ${req.params.id} not found`);
  }

  res.status(204).send();
});


module.exports.autoroute = {
  get: {
    '/configs': [authentication, getAll],
  },
  patch: {
    '/configs/:id': [authentication, updateConfig],
  },
  post: {
    '/configs': [authentication, createConfig],
  },
  delete: {
    '/configs/:id': [authentication, deleteConfig],
  },
};
