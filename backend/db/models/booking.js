"use strict";
const { Model, Op } = require("sequelize");
// const { User } = require("../models");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Booking.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // unique: true,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // unique: true,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      startDate: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true, //'2/23/24',
          isAfter: "2024-02-22",
          // async isStartDatevalid(value) {
          //   await Booking.findOne({
          //     where: {
          //       spotId: this.spotId,
          //       endDate: {
          //         [Op.gt]: value
          //       }
          //     }
          //   }).then((existingBooking) => {
          //     if (existingBooking) {
          //       throw new Error("Start date conflicts with an existing booking")
          //     }
          //   })
          // }
          //   
        },
      },
      endDate: {
        type: DataTypes.DATEONLY,
        validate: {
          isDate: true,
          isAfter: this.startDate,
        },
      },
    },
    {
      sequelize,
      modelName: "Booking",
      // defaultScope: {
      //   attributes: {
      //     exclude: ['createdAt','updatedAt']
      //   }
      // }
    }
  );
  return Booking;
};
