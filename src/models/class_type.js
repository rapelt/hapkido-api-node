/* jshint indent: 2 */
const sequelize = require('../../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports =  sequelize.define('class_type', {
    class_type_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    class_type: {
      type: DataTypes.STRING(45),
      allowNull: false
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
    tableName: 'class_type',
    timestamps: true,
    paranoid: true
    });
