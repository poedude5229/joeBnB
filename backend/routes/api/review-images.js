const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { ReviewImage, Review } = require("../../db/models");

router.delete("/:imageId", requireAuth, async (req, res) => {
  let { imageId } = req.params;

  let reviewImage = await ReviewImage.findByPk(imageId);

  if (!reviewImage) {
    return res.status(404).json({ message: "Review Image couldn't be found" });
  }

  let review = await Review.findByPk(reviewImage.reviewId);

  if (!review || review.userId !== req.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  return res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
