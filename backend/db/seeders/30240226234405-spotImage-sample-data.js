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
          spotId: 1,
          url: "https://photos.zillowstatic.com/fp/b595414cacc9042e2d20e55de96f52a1-uncropped_scaled_within_1536_1152.webp",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://photos.zillowstatic.com/fp/e08f4569033679d827ea9eb4ccfddcaf-uncropped_scaled_within_1536_1152.webp",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://photos.zillowstatic.com/fp/1d3932fa7386493e3b213cfcd8ee57da-uncropped_scaled_within_1536_1152.webp",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://photos.zillowstatic.com/fp/9a4dcf35efa06b5edb97a21e575d814d-uncropped_scaled_within_1536_1152.webp",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://photos.zillowstatic.com/fp/d2b61817ca35a853ee8d86e82b605d6d-uncropped_scaled_within_1536_1152.webp",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://photos.zillowstatic.com/fp/b261ff8e004914ea9a2f15b5874b5c51-uncropped_scaled_within_1536_1152.webp",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://ap.rdcpix.com/97597954d01ad109654da6b7aeb3b8dal-m1419331428od-w1024_h768_x2.webp?w=750&q=75",
          preview: true,
        },
        {
          spotId: 3,
          url: "",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://ap.rdcpix.com/d296c40d2887f04a80c1cead540c7583l-b523895560od-w480_h360_x2.webp?w=640&q=75",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://ap.rdcpix.com/4a67e3638a847722579b5fa80040d8bal-m3349128204rd-w2048_h1536.webp",
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
