/* jshint indent: 2 */

const sequelize = require('../db/sequelize');
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
    preferred_class_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'class_type',
        key: 'class_type_id'
      },
      unique: "fk_member_class_type1"
    },
    family_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'family',
        key: 'family_id'
      },
      unique: "fk_member_family1"
    },
    emergency_contact_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'emergency_contact',
        key: 'emergency_contact_id'
      },
      unique: "fk_member_emergency_contact1"
    }
  }, {
    sequelize,
    tableName: 'member',
    timestamps: false
    });
