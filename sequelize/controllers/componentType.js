const ComponentType = require('../models').ComponentType;

module.exports = {
  list(req, res) {
    return ComponentType
      .findAll({
        // include: [{
        //   model: Student,
        //   as: 'students'
        // }],
        // order: [
        //   ['createdAt', 'DESC'],
        //   [{ model: Student, as: 'students' }, 'createdAt', 'DESC'],
        // ],
      })
      .then((componentTypes) => res.status(200).send(componentTypes))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return ComponentType
      .findById(req.params.id, {
        // include: [{
        //   model: Student,
        //   as: 'students'
        // }],
      })
      .then((componentType) => {
        if (!componentType) {
          return res.status(404).send({
            message: 'ComponentType Not Found',
          });
        }
        return res.status(200).send(componentType);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return ComponentType
      .create({
        name: req.body.name,
        category: req.body.category,
        version: req.body.version,
      })
      .then((componentType) => res.status(201).send(componentType))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return ComponentType
      .findById(req.params.id, {
        // include: [{
        //   model: Student,
        //   as: 'students'
        // }],
      })
      .then(componentType => {
        if (!componentType) {
          return res.status(404).send({
            message: 'ComponentType Not Found',
          });
        }
        return componentType
          .update({
            name: req.body.name || componentType.name,
            category: req.body.category || componentType.category,
            version: req.body.version || componentType.version,
          })
          .then(() => res.status(200).send(componentType))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return ComponentType
      .findById(req.params.id)
      .then(componentType => {
        if (!componentType) {
          return res.status(400).send({
            message: 'ComponentType Not Found',
          });
        }
        return componentType
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
