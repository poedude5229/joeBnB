import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSpotReview } from "../../store/reviews";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import "./modal.css";
const MakeReview = () => {
  let dispatch = useDispatch();
  let { spotId } = useParams();
  let reviews = useSelector((state) => state.reviews);
  reviews = Object.values(reviews);
  let sessionUser = useSelector((state) => state.session.user?.id);
  let spotOwner = useSelector((state) => state.spots?.[spotId].ownerId);
  const [review, setReview] = useState("");
  const [active, setActive] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);
  const [filled, setFilled] = useState(0);
  const ratings = [1, 2, 3, 4, 5];

  useEffect(() => {
    let arr = [];
    if (review.length < 10) {
      arr.push("Review must be at least 10 characters");
    }
    if (!stars) {
      arr.push("Review must be at least 1 star");
    }
    setErrors(arr);
  }, [review, stars]);

  function resetStates() {
    setReview("");
    // setActive(null);
    setStars(0);
    setErrors([]);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      review,
      stars,
    };

    dispatch(createSpotReview(newReview, spotId));
    resetStates();
  };

  let existing = reviews?.find((review) => review.userId === sessionUser);
  return (
    <div>
      {sessionUser && sessionUser !== spotOwner && !existing && (
        <form onSubmit={onSubmit}>
          <h2>How was your stay?</h2>
          <textarea
            name="reviewtext"
            id="reviewtext"
            placeholder="Leave your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <p className="errorMessage">
            {errors.filter((error) => error.includes("char"))}
          </p>
          {ratings.map((star, index) => {
            let starRating = index + 1;
            return (
              <label key={starRating}>
                <input
                  type="radio"
                  name="starRating"
                  value={starRating}
                  onClick={() => {
                    setStars(starRating);
                    setFilled(starRating);
                  }}
                  onChange={() => setStars(starRating)}
                  placeholder={index}
                />
                <i
                  onMouseEnter={() => setActive(starRating)}
                  onMouseLeave={() => setActive(0)}
                >
                  {active >= starRating || starRating <= filled ? (
                    <FaStar />
                  ) : (
                    <FaRegStar />
                  )}{" "}
                </i>
              </label>
            );
          })}
          <span>{stars} Stars</span>
          <button disabled={errors.length}>Submit Your Review</button>
        </form>
      )}
    </div>
  );
};

export default MakeReview;
