'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    timestamps: false, 
    tableName: 'Categories',
    /* underscored: true, */
  });

/*   Employee.associate = (models) => {
    Employee.hasOne(models.Address,
      { foreignKey: 'employeeId', as: 'addresses' });
  }; */

  return Category;
};