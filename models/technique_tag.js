/* jshint indent: 2 */

const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports = sequelize.define('technique_tag', {
    t_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'technique',
        key: 't_id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'technique_tag',
    timestamps: false
    });
