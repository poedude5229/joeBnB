"use strict";
const { Spot } = require("../models");

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
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "95 Smith Farm Rd",
          city: "Liberty",
          state: "West Virginia",
          country: "USA",
          //38.60153943377623, -81.71987210346751
          lat: 38.60153943377623,
          lng: -81.71987210346751,
          name: "Hardwood in the hills",
          description:
            "This residence boasts a cozy wood-burning fireplace, an inviting open kitchen featuring granite countertops and a center island. Set amidst 5.7 acres of tranquil landscape, it offers a detached workshop.",
          price: 70,
        },
        {
          ownerId: 2,
          address: "230 Quarry Ridge Rd",
          city: "Charleston",
          state: "West Virginia",
          country: "USA",
          lat: 38.32510669271417,
          lng: -81.60491746187168,
          name: "Mountain Masterpiece",
          description:
            "This sprawling 24-acre estate boasts breathtaking views of the State Capital, downtown skyline, and the serene Kanawha River. Crafted with unparalleled attention to detail, this custom-built residence offers luxury living at its finest.",
          price: 200,
          // 38.32510669271417, -81.60491746187168
        },
        {
          ownerId: 2,
          address: "713 Woodlawn Avenue",
          city: "Beckley",
          state: "West Virginia",
          country: "USA",
          //37.76809828864811, -81.18476170423169
          lat: 37.76809828864811,
          lng: -81.18476170423169,
          name: "Timeless Brick Manor",
          description:
            "From stately brick exterior to the custom millwork that adorns the curved staircase, it is apparent every attention was paid to the finest detail when this home was crafted. The recent renovations add modern enhancements that complement the classic charm of the estate beautifully.",
          price: 130,
        },
        {
          ownerId: 2,
          address: "4428 Irish Heights Drive",
          city: "Summersville",
          state: "West Virginia",
          country: "USA",
          // 38.25594714360664, -80.8449902330398
          lat: 38.25594714360664,
          lng: -80.8449902330398,
          name: "Summersville Lake Oasis",
          description:
            "Built in 2010, and sited atop a hill overlooking 111 acres of forest and beyond, this is the home you've dreamed of. Almost 16,000 sq ft of luxury combined with a dual bath and private outdoor hot tub primary suite, saltwater infinity pool, full-feature home gym, and 3,000 bottle wine cellar. Experience tranquility and convenience next to the Summersville Lake State Park and near the Greenbrier Resort",
          price: 300,
        },
        {
          ownerId: 2,
          address: "390 Oakmont Road",
          city: "Wheeling",
          state: "West Virginia",
          country: "USA",
          //40.07020545721412, -80.66824824827728
          lat: 40.07020545721412,
          lng: -80.66824824827728,
          name: "Wheeling Dwelling",
          description: "Welcome to your get away. 8 beds and 12 baths built over 8,331 square feet, your family will never run out of room on this staycation",
          price: 100
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
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  },
};
