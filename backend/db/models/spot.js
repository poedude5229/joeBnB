"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
        // onDelete: "CASCADE",
      });
      Spot.hasMany(models.Booking, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId",
        as: "previewImage",
        onDelete: "CASCADE",
      });
      Spot.hasMany(models.Review, {
        foreignKey: "spotId",
        onDelete: "CASCADE",
      });
    }
  }
  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
        },
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
        },
      },
      lat: {
        type: DataTypes.NUMERIC,
        allowNull: false,
        unique: true,
      },
      lng: { type: DataTypes.NUMERIC, allowNull: false, unique: true },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5, 50],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [30, 500],
        },
      },
      price: {
        type: DataTypes.NUMERIC,
        allowNull: false,
        // validate: {
        //   min: 1,
        //   max: 300,
        // },
      },
    },
    {
      sequelize,
      modelName: "Spot",
    }
  );
  return Spot;
};
