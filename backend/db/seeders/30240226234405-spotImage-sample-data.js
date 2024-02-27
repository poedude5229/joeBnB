"use strict";
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; //define schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://photos.zillowstatic.com/fp/58da4197b25c79b07ab2a6b8ae828922-cc_ft_576.webp",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://photos.zillowstatic.com/fp/3bcafb173d8898bcd08d15d3605afd63-cc_ft_576.webp",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://photos.zillowstatic.com/fp/1d3932fa7386493e3b213cfcd8ee57da-uncropped_scaled_within_1536_1152.webp",
          preview: true,
        },
      ],
      {
        validate: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */ options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  },
};
