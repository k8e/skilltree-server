const categoryRoutes = require('./category');
const skillRoutes = require('./skill');

module.exports = (app) => {

  // Category API Methods
  app.get('/api/categories',                  categoryRoutes.list);
  app.get('/api/categories/:categoryId',      categoryRoutes.retrieve);
  app.put('/api/categories/:categoryId',      categoryRoutes.update);
  app.delete('/api/categories/:categoryId',   categoryRoutes.delete);
  app.post('/api/categories', function (req, res) {
                                              categoryRoutes.create(req, res);
  });

  // Skill API Methods
  app.get('/api/skills',                      skillRoutes.list);
  app.post('/api/skills',                     skillRoutes.create);
  app.post('/api/skills/:skillId/children',   skillRoutes.createChild);
  app.put('/api/skills/:skillId',             skillRoutes.update);
  app.delete('/api/skills/:skillId',          skillRoutes.delete);

  // Catch all others
  app.all('/api/todos/:categoryId/skills', (req, res) =>
    res.status(405).send({
      error: 'Permission denied.',
    })
  );
};