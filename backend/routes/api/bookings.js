const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { Spot, Review, User, SpotImage, Booking } = require("../../db/models");

router.get("/current", requireAuth, async (req, res) => {
  let userId = req.user.id;

  let bookings = await Booking.findAll({
    where: { userId },
    include: [
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
        include: {
          model: SpotImage,
          as: "previewImage",
          where: {
            preview: true,
          },
          attributes: ["url"],
          limit: 1,
        },
      },
    ],
  });
  let response = {
    Bookings: bookings.map((booking) => ({
      id: booking.id,
      spotId: booking.spotId,
      Spot: {
        id: booking.Spot.id,
        ownerId: booking.Spot.ownerId,
        address: booking.Spot.address,
        city: booking.Spot.city,
        state: booking.Spot.state,
        country: booking.Spot.country,
        lat: booking.Spot.lat,
        lng: booking.Spot.lng,
        name: booking.Spot.name,
        price: booking.Spot.price,
        previewImage: booking.Spot.previewImage[0].url,
      },
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    })),
  };

    res.status(200).json(response)
});

module.exports = router;
