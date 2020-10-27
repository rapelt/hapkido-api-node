/* jshint indent: 2 */

const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports = sequelize.define('technique_photo', {
    t_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'technique',
        key: 't_id'
      },
      unique: "table_name_technique_t_id_fk"
    },
    p_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'photo',
        key: 'id'
      },
      unique: "table_name_photo_id_fk"
    }
  }, {
    sequelize,
    tableName: 'technique_photo',
    timestamps: false
    });
