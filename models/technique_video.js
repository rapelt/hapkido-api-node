/* jshint indent: 2 */

const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');
module.exports = sequelize.define('technique_video', {
    t_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'technique',
        key: 't_id'
      },
      unique: "technique_video_technique_t_id_fk"
    },
    v_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'video',
        key: 'id'
      },
      unique: "technique_video_video_id_fk"
    }
  }, {
    sequelize,
    tableName: 'technique_video',
    timestamps: false
    });
