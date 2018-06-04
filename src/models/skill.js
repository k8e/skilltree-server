module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    target: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 80,
    },
  });

  Skill.associate = (models) => {
    Skill.belongsToMany(models.Skill, {
      as: 'parents',
      foreignKey: 'childId',
      through: "SkillTree",
    });

    Skill.belongsToMany(models.Skill, {
      as: 'children',
      foreignKey: 'parentId',
      through: "SkillTree",
    });

    Skill.belongsToMany(models.Category, {
      foreignKey: 'skillId',
      through: "SkillCategory"
    });
  };

  return Skill;
};