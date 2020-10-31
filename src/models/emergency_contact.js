/* jshint indent: 2 */

const sequelize = require('../../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports = sequelize.define('emergency_contact', {
    emergency_contact_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phone_1: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    phone_2: {
      type: DataTypes.STRING(20),
      allowNull: true
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
    tableName: 'emergency_contact',
    timestamps: true,
    paranoid: true,
    });
