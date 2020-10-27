/* jshint indent: 2 */
const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports =  sequelize.define('class_type', {
    class_type_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    class_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'class_type',
    timestamps: false
    });
