/* jshint indent: 2 */

const sequelize = require('../../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports = sequelize.define('member_grade', {
    grade_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'grade',
        key: 'grade_id'
      }
    },
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
      allowNull: true,
      references: {
        model: 'class',
        key: 'class_id'
      },
      unique: "fk_member_grade_class1"
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
        allowNull: true,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'member_grade',
    timestamps: true,
    });

