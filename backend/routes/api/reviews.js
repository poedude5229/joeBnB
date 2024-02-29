const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const {
  Spot,
  Review,
  User,
  ReviewImage,
  SpotImage,
} = require("../../db/models");

router.get("/current", requireAuth, async (req, res) => {
  let userId = req.user.id;

  let reviews = await Review.findAll({
    where: {
      userId: userId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
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
          where: { preview: true },
            attributes: ["url"],
            limit: 1
        },
      },
      { model: ReviewImage, attributes: ["id", "url"] },
    ],
  });
    //   console.log(reviews)
    reviews = reviews.map((review) => ({
      ...review.toJSON(),
      Spot: {
        ...review.Spot.toJSON(),
        previewImage: review.Spot.previewImage[0].url,
      },
    }));

  res.status(200).json({ Reviews: reviews });
});

module.exports = router;
