const categoryController = require('../controllers').Category;

module.exports = {

  create(req, res) {
    return categoryController.create(req.body.name)
      .then(newCategory => res.status(201).send(newCategory))
      .catch(error => res.status(400).send(error));
  },

  list(req, res) {
    return categoryController.list()
      .then(allCategories => res.status(200).send(allCategories))
      .catch(error => res.status(400).send(error.message));
  },

  retrieve(req, res) {
    return categoryController.retrieve(req.params.categoryId)
      .then(foundCategory => {
        if (!foundCategory) {
          return res.status(404).send({
            message: 'Category not found!',
          });
        }
        return res.status(200).send(foundCategory);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return categoryController.update(req.params.categoryId, req.body.name)
      .then(updatedCategory => res.status(200).send(updatedCategory))
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return categoryController.delete(req.params.categoryId)
      .then(todo => res.status(200).send({ message: 'Deleted category.' }))
      .catch(error => res.status(400).send(error));
  },

};