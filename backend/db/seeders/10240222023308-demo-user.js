"use strict";
const { User } = require("../models");
const bcrypt = require("bcryptjs");

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

    await User.bulkCreate(
      [
        {
          firstName: "Bob",
          lastName: "Saget",
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Joe",
          lastName: "Mama",
          email: "user1@user.io",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Stringcheese",
          lastName: "Bababooey",
          email: "user2@user.io",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          firstName: "Melinda",
          lastName: "Visitor",
          email: "mvistswv@emailwebsite.com",
          username: "MelVisits420",
          hashedPassword: bcrypt.hashSync("haushouse42-hous3"),
        },
        {
          firstName: "Richard",
          lastName: "Shufflebottom",
          email: "ricksb13@example.com",
          username: "RickSB1300",
          hashedPassword: bcrypt.hashSync("iPodCringe329"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  },
};
