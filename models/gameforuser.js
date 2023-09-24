'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GameForUser extends Model {
    static associate(models) {
      GameForUser.belongsTo(models.User, {
        foreignKey: 'user_id', 
        as: 'user', 
      });
      GameForUser.belongsTo(models.Game, {
        foreignKey: 'game_id', 
        as: 'game', 
      });
    }
  }

  GameForUser.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User', 
          key: 'id',
        },
      },
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Game', 
          key: 'id', 
        },
      },
      play_time: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'GameForUser',
    }
  );

  return GameForUser;
};
