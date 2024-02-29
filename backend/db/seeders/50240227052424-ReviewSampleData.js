"use strict";
const { Review } = require("../models");

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
    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 4,
          review:
            "I had a fantastic stay over here. I visited Liberty, WV for a month",
          stars: 5,
        },
        {
          spotId: 2,
          userId: 4,
          review:
            "A bit expensive, but unbelievable luxury. I chilled in Charleston, WV for a month",
          stars: 4,
        },
        {
          spotId: 2,
          userId: 5,
          review:
            "I had a wonderful month-long stay over here. I visited Charleston, WV for a business trip staycation.",
          stars: 5,
        },
        {
          spotId: 3,
          userId: 5,
          review:
            "Here is some review sample text from the fifth user currently in the database. I hope it is fifty characters long or greater.",
          stars: 4,
        },
        {
          spotId: 4,
          userId: 4,
          review:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
          stars: 5,
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
     */
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  },
};
