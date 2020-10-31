/* jshint indent: 2 */

const sequelize = require('../../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports = sequelize.define('member', {
    hb_id: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true
    },
    occupation: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    is_active: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    is_kumdo_student: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    previous_experience: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    injury_illness: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_verified: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
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
    tableName: 'member',
    timestamps: true,
    paranoid: true,
    });
