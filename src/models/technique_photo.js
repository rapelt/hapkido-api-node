/* jshint indent: 2 */

const sequelize = require('../../db/sequelize');
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
    tableName: 'technique_photo',
  timestamps: true,
  paranoid: true,
    });
