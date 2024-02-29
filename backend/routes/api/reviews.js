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


let authorizeReview = async (req, res, next) => {
  let { reviewId } = req.params;
  // const userId = req.user.id;

  // try {
  let review = await Review.findByPk(reviewId);

  if (!review) {
    return res.status(404).json({ message: "Review couldn't be found" });
  }

  if (review.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
  // } catch (error) {
  //   console.error("Error authorizing review:", error);
  //   res.status(500).json({ message: "Internal server error" });
  // }
};

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


router.post("/:reviewId/images", requireAuth, authorizeReview, async (req, res) => {
  let { reviewId } = req.params;

  let { url } = req.body;

  let review = await Review.findByPk(reviewId);
  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }

  let reviewImageCount = await ReviewImage.count({ where: { reviewId } });

  if (reviewImageCount >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });
  }
  let newImage = await ReviewImage.create({
    reviewId,
    url,
  });

  res.status(200).json({
    id: newImage.id,
    url: newImage.url,
  });
});
module.exports = router;
