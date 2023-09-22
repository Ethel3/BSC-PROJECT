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
    user_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    play_time: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'GameForUser',
  });
  return GameForUser;
};