var DataTypes = require("sequelize").DataTypes;
var _video = require("./video");

function initModels(sequelize) {
  var video = _video(sequelize, DataTypes);

  return {
    video,
  };
}
module.exports = { initModels };
