/* jshint indent: 2 */

const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports =sequelize.define('grade', {
    grade_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    short_name: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    long_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    css_class: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'grade',
    timestamps: false
    });

