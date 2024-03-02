const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const {handleValidationErrors} = require("../../utils/validation")
const {Op} = require("sequelize")
const { Spot, Review, User, SpotImage, Booking } = require("../../db/models");
const { validationResult } = require("express-validator");

const formatAmericanDate = (date) => {
  const formattedDate = new Date(date);
  const month = formattedDate.getMonth() + 1;
  const day = formattedDate.getDate();
  const year = formattedDate.getFullYear();
  return `${month}/${day}/${year}`;
};

const validateBookingDates = (req, res, next) => {

  let errors = validationResult(req);
  if (errors.length > 0) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { startDate, endDate } = req.body;


  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Start date and end date are required" });
  }


  if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
    return res.status(400).json({ message: "Invalid date format" });
  }


  if (new Date(endDate) <= new Date(startDate)) {
    return res
      .status(400)
      .json({ message: "End date must be after start date" });
  }


  next();
};

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
      id: +booking.id,
      spotId: +booking.spotId,
      Spot: {
        id: +booking.Spot.id,
        ownerId: +booking.Spot.ownerId,
        address: booking.Spot.address,
        city: booking.Spot.city,
        state: booking.Spot.state,
        country: booking.Spot.country,
        lat: +booking.Spot.lat,
        lng: +booking.Spot.lng,
        name: booking.Spot.name,
        price: +booking.Spot.price,
        previewImage: booking.Spot.previewImage[0].url,
      },
      userId: +booking.userId,
      startDate: formatAmericanDate(booking.startDate),
      endDate: formatAmericanDate(booking.endDate),
      createdAt: formatAmericanDate(booking.createdAt),
      updatedAt: formatAmericanDate(booking.updatedAt),
    })),
  };

    res.status(200).json(response)
});

router.put(
  "/:bookingId",
  requireAuth,
  handleValidationErrors,
  validateBookingDates,
  async (req, res) => {
    try {
      let { user } = req;
      let { bookingId } = req.params;
      let { startDate, endDate } = req.body;
      let currentDate = new Date();


      let booking = await Booking.findOne({ where: { id: bookingId } });


      if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
      }


      if (user.id !== booking.userId) {
        return res.status(403).json({ message: "Forbidden" });
      }


      if (
        new Date(startDate) < currentDate ||
        new Date(endDate) < currentDate
      ) {
        return res
          .status(403)
          .json({ message: "Past bookings can't be modified" });
      }


      let conflict = await Booking.findOne({
        where: {
          id: { [Op.ne]: bookingId },
          spotId: booking.spotId,
          startDate: { [Op.lte]: new Date(endDate) },
          endDate: { [Op.gte]: new Date(startDate) },
        },
      });


      if (conflict) {
        return res.status(403).json({
          message: "Sorry, this spot is already booked for the specified dates",
          errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking",
          },
        });
      }

      // Update the booking's startDate and endDate if provided
      if (startDate) booking.startDate = startDate;
      if (endDate) booking.endDate = endDate;


      booking.startDate = formatAmericanDate(booking.startDate);
      booking.endDate = formatAmericanDate(booking.endDate);
      // Save the changes
      await booking.save();

      // Return the updated booking
      return res.json(booking);
    } catch (error) {}
  }
);

router.delete("/:bookingId", requireAuth, async (req, res) => {
    let { bookingId } = req.params;

    let booking = await Booking.findByPk(bookingId);

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    }

    if (booking.userId !== req.user.id) {
        let spot = await Spot.findByPk(booking.spotId);
        if (!spot || spot.ownerId !== req.user.id) {
          return res.status(403).json({ message: "Forbidden" });
        }
    }

     if (new Date(booking.startDate) <= new Date()) {
       return res
         .status(403)
         .json({ message: "Bookings that have been started can't be deleted" });
     }

    await booking.destroy();

    return res.status(200).json({ message: "Successfully deleted" });
})




module.exports = router;
