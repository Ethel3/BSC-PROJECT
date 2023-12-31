'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GameForUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false, // Ensuring the column is not nullable
        references: {
          model: 'users', 
          key: 'id',       
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE'  
      },
      game_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Games',
          key: 'id',       
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE'  
      },
      play_time: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('GameForUsers', {
      type: 'foreign key',
      fields: ['user_id'],
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('GameForUsers', {
      type: 'foreign key',
      fields: ['game_id'],
      references: {
        table: 'Games',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GameForUsers');
  }
};
