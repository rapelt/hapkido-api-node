/* jshint indent: 2 */

const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');

module.exports = sequelize.define('class', {
    class_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
        field: 'class_id'
    },
    is_grading: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      field: 'is_grading'
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
        allowNull: true,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'class',
    timestamps: true,
    paranoid: true,
    });
