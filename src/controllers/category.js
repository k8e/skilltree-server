const category = require('../models').Category;
const skill = require('../models').Skill;

module.exports = {

  create(categoryName) {
    // Create new category
    return category.create({
      name: categoryName,
    });
  },

  list() {
    return category.findAll({
      // Include skills as nested list
      include: [{
        model: skill,
        as: 'skills',
      }],
    });
  },

  retrieve(categoryId) {
    // Get category by ID
    return category.findById(categoryId, {
      // Include skills as nested list
      include: [{
        model: skill,
        as: 'skills',
      }],
    })
    .then(foundCategory => {
      if (!foundCategory) {
        return Error("Category not found!");
      }
      return foundCategory;
    });
  },

  update(categoryId, title) {
    return category.findById(categoryId, {
      include: [{
        model: skill,
        as: 'skills',
      }],
    })
    .then(foundCategory => {
      if (!foundCategory) {
        return Error("Category not found!");
      }
      return foundCategory.update({
        name: title || foundCategory.name,
      })
      .catch((error) => Error(error.message));
    });
  },

  delete(categoryId) {
    return category.findById(categoryId)
      .then(foundCategory => {
        if (!foundCategory) {
          return Error("Category not found!");
        }
        return foundCategory.destroy()
          .catch(error => Error(error.message));
      });
  },

};