const express = require("express");
const { Op, sequelize } = require("sequelize");
const router = express.Router();
const {requireAuth} = require("../../utils/auth")

const { Spot, Review, SpotImage } = require("../../db/models");
router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
     for (let spot of spots) {
       // Calculate average rating for the spot
       const reviews = await Review.findAll({
         where: { spotId: spot.id },

       });
       for(let review of reviews){}

       // Fetch preview image URL for the spot
       let previewImage = await SpotImage.findOne({
         where: { spotId: spot.id, preview: true },
         attributes: ["url"],
       });

       // Add avgRating and previewImage to the spot object
       spot.avgRating = avgRating;
       spot.previewImage = previewImage;
     }
  res.status(200).json({ Spots: spots });
});

module.exports = router;
