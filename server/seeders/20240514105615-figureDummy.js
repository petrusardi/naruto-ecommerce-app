"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let figures = require("../action_figures.json");
    let newFig = figures.map((fig) => {
      fig.createdAt = new Date();
      fig.updatedAt = new Date();
      return fig;
    });
    await queryInterface.bulkInsert("Figures", newFig);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Figures", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
