const Skill = require('../models').Skill;

module.exports = {

  create(skillName) {
    // Create new skill
    return Skill.create({
      name: skillName,
    });
  },

  createChild(parentId, childName) {
    return new Promise( (resolve, reject) => {
      // Find parent skill
      Skill.findById(parentId).then(parentSkill => {
        if (!parentSkill)
          reject(Error("Parent skill not found!"));

        // Create skill and add as child
        Skill.create({
          name: childName,
        })
        .then(newSkill => {
          parentSkill.addChild(newSkill);
          resolve(newSkill);
        })
        .catch(error => { reject(error) });
      })
      .catch(error => { reject(error) });
    });
  },

  list() {
    return Skill.findAll({
      // Include child skills in nested list
      include: [
        {
          model: Skill,
          as: 'children',
          through: {attributes: []},
        },
        {
          model: Skill,
          as: 'parents',
          through: {attributes: []},
        },
      ],
      // Only include top-level skills (children are nested)
      where: {
        '$parents.id$' : null,
      },
    });
  },

  retrieve(skillId) {
    // Get skill by ID
    return Skill.findById(skillId, {
      include: [{
        model: Skill,
        as: 'children',
      }],
    })
    .then(foundSkill => {
      if (!foundSkill) {
        return Error("Skill not found!");
      }
      return foundSkill;
    });
  },

  update(skillId, skillName, skillValue, skillTarget) {
    return Skill.find({
      where: {
        id: skillId,
      },
    })
    .then(skill => {
      if (!skill) {
        return Error("Skill not found!");
      }
      return skill.update({
          name: skillName || skill.name,
          value: skillValue || skill.value,
          target: skillTarget || skill.target,
        })
        .catch(error => Error(error.message));
    })
    .catch(error => Error(error.message));
  },

  delete(skillId) {
    return Skill.find({
      where: {
        id: skillId,
      },
    })
    .then(skill => {
      if (!skill) {
        return Error("Skill not found.");
      }
      return skill.destroy()
        .catch(error => Error(error.message));
    })
    .catch(error => Error(error.message));
  },

};