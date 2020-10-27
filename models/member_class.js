/* jshint indent: 2 */

const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports = sequelize.define('member_class', {
    hb_id: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'member',
        key: 'hb_id'
      }
    },
    class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'class',
        key: 'class_id'
      }
    }
  }, {
    sequelize,
    tableName: 'member_class',
    timestamps: false
    });
