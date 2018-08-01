const skillController = require('../controllers').Skill;

module.exports = {

  create(req, res) {
    return skillController.create(req.body.name)
      .then(newSkill => res.status(201).send(newSkill))
      .catch(error => res.status(400).send(error.message));
  },

  createChild(req, res) {
    return skillController.createChild(req.params.skillId, req.body.name)
      .then(newSkill => res.status(201).send(newSkill))
      .catch(error => res.status(400).send(error.message));
  },

  list(req, res) {
    return skillController.list()
      .then(allSkills => res.status(200).send(allSkills))
      .catch(error => res.status(400).send(error.message));
  },

  retrieve(req, res) {
    return skillController.retrieve(req.params.skillId)
      .then(skill => res.status(200).send(skill))
      .catch(error => res.status(400).send(error.message));
  },

  update(req, res) {
    return skillController.update(
        req.params.skillId, 
        req.body.name, 
        req.body.value,
        req.body.target
      ) 
      .then(updatedSkill => res.status(200).send(updatedSkill))
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return skillController.delete(req.params.skillId)
      .then(() => res.status(204).send({ message: 'Deleted skill.' }))
      .catch(error => res.status(400).send(error));
  },

};