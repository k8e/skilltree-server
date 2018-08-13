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
      defaultValue: 100,
    },
  });

  // Activate sequelize-hierarchy
  Skill.isHierarchy();

  return Skill;
};