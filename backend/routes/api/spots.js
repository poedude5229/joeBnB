const express = require("express");
const { Op, sequelize } = require("sequelize");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");

const { Spot, Review, SpotImage } = require("../../db/models");

router.get("/:spotId", async (req, res) => {
  let { spotId } = req.params;

  let spot = await Spot.findOne({
    where: {
      id: spotId,
    },
  });
  if (!spot) {
    return res.status(404).json({
      message: "Spot couldn't be found",
    });
  }
  return res.status(200).json(spot);
});
router.get("/current", requireAuth, async (req, res) => {
  // try {
  // Get the currently logged-in user's ID
  const userId = req.user.id;

  // Find all spots owned by the currently logged-in user
  const spots = await Spot.findAll({
    where: {
      ownerId: userId,
    },
  });

  res.status(200).json({ Spots: spots });
  // } catch (error) {
  //   console.error("Error retrieving spots:", error);
  //   res.status(500).json({ message: "Internal server error" });
  // }
});

router.get("/", async (req, res) => {
  const spots = await Spot.findAll({});

  for (let spot of spots) {
    let sum = 0;
    const reviews = await Review.findAll({
      where: { spotId: spot.id },
    });
    for (let review of reviews) {
      sum += review.stars;
    }
    let average;
    if (reviews.length > 0) {
      average = sum / reviews.length;
    } else {
      average = 0;
    }
    spot.avgRating = average;
    let previewImage = await SpotImage.findOne({
      where: { spotId: spot.id, preview: true },
      attributes: ["url"],
    });
    spot.previewImage = previewImage;
  }
  //    // Calculate average rating for the spot

  //  // Fetch preview image URL for the spot

  const fixed = spots.map((spot) => {
    return {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      avgRating: spot.avgRating || 0,
      previewImage: spot.previewImage.url,
    };
  });
  //  // Add avgRating and previewImage to the spot object
  //  spot.previewImage = previewImage;
  //  }
  res.status(200).json({ Spots: fixed });
});

// router.post("/", requireAuth, async (req, res) => {
//   let { address, city, state, country, lat, lng, name, description, price } = req.body;


// });

module.exports = router;
