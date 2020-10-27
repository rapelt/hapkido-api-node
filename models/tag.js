/* jshint indent: 2 */

const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');

module.exports = sequelize.define('tag', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: "tag_name_uindex"
    }
  }, {
    sequelize,
    tableName: 'tag',
    timestamps: false
    });

