"use strict";
const { Booking } = require("../models");
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
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: "2024-02-23",
        endDate: "2024-02-25",
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "2024-02-26",
        endDate: "2024-02-27",
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2024-02-28",
        endDate: "2024-03-01",
      },
    ]);


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  },
};
