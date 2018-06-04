module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Skill, {
      foreignKey: 'categoryId',
      as: 'skills',
      through: 'SkillCategory',
    });
  };

  return Category;
};