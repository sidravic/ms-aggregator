'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('posts', {
      post_url: {
        type: Sequelize.STRING(),
        allowNull: false
      },
      id: {
        type: Sequelize.BIGINT(),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      shortened_url: {
        type: Sequelize.STRING(),
        allowNull: false
      }
    })
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    queryInterface.dropTable('posts');
  }
};
