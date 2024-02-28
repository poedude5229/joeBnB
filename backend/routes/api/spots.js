const express = require("express");
const { Op, sequelize } = require("sequelize");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");

const { Spot, Review, SpotImage } = require("../../db/models");

const validateSpot = (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price || price < 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        address: "Street address is required",
        city: "City is required",
        state: "State is required",
        country: "Country is required",
        lat: "Latitude must be within -90 and 90",
        lng: "Longitude must be within -180 and 180",
        name: "Name must be less than 50 characters",
        description: "Description is required",
        price: "Price per day must be a positive number",
      },
    });
  }
  next();
};

router.get("/:spotId", async (req, res) => {
  try {
    const { spotId } = req.params;

    // Find the spot by its ID
    const spot = await Spot.findOne({
      where: {
        id: spotId,
      },
    });

    // If spot is not found, return 404
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    // Calculate average rating for the spot
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

    // Fetch preview image URL for the spot
    const spotImage = await SpotImage.findOne({
      where: { spotId: spot.id },
    });
    spot.SpotImages = spotImage;

    // Prepare the response data
    const responseData = {
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
      SpotImages: spot.SpotImages,
    };

    // Return the spot with the calculated data
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error retrieving spot:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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

router.post("/", requireAuth, validateSpot, async (req, res) => {
  let { address, city, state, country, lat, lng, name, description, price } = req.body
  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });


  res.status(201).json(newSpot);
});

module.exports = router;