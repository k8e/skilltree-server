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
    return Skill.findAll({ hierarchy: true });
  },

  retrieve(skillId) {
    // Get skill by ID
    return new Promise( (resolve, reject) => {
      Skill.findById(skillId, {
        include: [{
          model: Skill,
          as: 'descendents',
          hierarchy: true,
        }],
      })
      .then(foundSkill => {
        if (!foundSkill)  
          reject(Error("Skill not found!"))

        resolve(foundSkill);
      })
      .catch(error => { reject(error) });
    });
  },

  update(skillId, skillName, skillValue, skillTarget) {
    return Skill.find({
      where: {
        id: skillId,
      },
    })
    .then(skill => {
      if (!skill) 
        return Error("Skill not found!");

      let newName = skillName || skill.name;
      let newValue = (skillValue != null) ? skillValue : skill.value;
      let newTarget = (skillTarget != null) ? skillTarget : skill.target;

      return skill.update({
          name: newName,
          value: newValue,
          target: newTarget,
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