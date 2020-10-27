/* jshint indent: 2 */

const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports =  sequelize.define('contact', {
    address_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    street_1: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    street_2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    postcode: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    suburb: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    state: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'contact',
    timestamps: false
    });
