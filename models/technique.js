/* jshint indent: 2 */

const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports =  sequelize.define('technique', {
    t_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    t_title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: "technique_t_title_uindex"
    },
    t_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    t_grade: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'grade',
        key: 'grade_id'
      },
      unique: "technique_grade_grade_id_fk"
    },
    t_set: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'technique_set',
        key: 'id'
      },
      unique: "technique_technique_set_id_fk"
    }
  }, {
    sequelize,
    tableName: 'technique',
    timestamps: false
    });

