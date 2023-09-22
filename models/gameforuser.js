'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GameForUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GameForUser.init({
    userId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    playTime: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'GameForUser',
  });
  return GameForUser;
};