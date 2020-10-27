/* jshint indent: 2 */

const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports = sequelize.define('family', {
    family_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    contact_address_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'contact',
        key: 'address_id'
      },
      unique: "fk_family_contact1"
    }
  }, {
    sequelize,
    tableName: 'family',
    timestamps: false
    });
