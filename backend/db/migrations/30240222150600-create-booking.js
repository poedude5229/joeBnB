"use strict";

// const { process_params } = require("express/lib/router")

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // defines the schema in options object
}

const { User } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Bookings",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        spotId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          // unique: true,
          references: {
            model: "Spots",
            key: "id",
          },
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          // unique: true,
          references: {
            model: "Users",
            key: "id",
          },
        },
        startDate: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        endDate: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
    await queryInterface.addConstraint("Bookings", {
      type: "unique",
      fields: ["spotId", "userId", "startDate", "endDate"],
      name: "unique_booking_for_user_and_spot_and_dates",
    });
    await queryInterface.addConstraint("Bookings", {
      type: "unique",
      fields: ["spotId", "startDate"],
      name: "unique_spot_date_booking",
    });
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    await queryInterface.dropTable(options);
  },
};
