/* jshint indent: 2 */

const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports = sequelize.define('photo', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    file_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    file_type: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    original_file_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    folder: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    size: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(400),
      allowNull: false,
      unique: "photo_url_uindex"
    }
  }, {
    sequelize,
    tableName: 'photo',
    timestamps: false
    });
