/* jshint indent: 2 */

const sequelize = require('../../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports = sequelize.define('technique_set', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: "technique_set_name_uindex"
    },
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1
    },
    createdAt: {
        allowNull: true,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
    },
    deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'technique_set',
    timestamps: true,
    paranoid: true,
    });
