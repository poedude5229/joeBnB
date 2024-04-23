import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSpotReview } from "../../store/reviews";

const MakeReview = () => {
  let dispatch = useDispatch();
  let { spotId } = useParams();
  let reviews = useSelector((state) => state.reviews);
  reviews = Object.values(reviews);
  let sessionUser = useSelector((state) => state.session.user?.id);
  let spotOwner = useSelector((state) => state.spots?.[spotId].ownerId);
  const [review, setReview] = useState("");
  const [active, setActive] = useState(false);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);
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
    setActive(null);
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
    <>
      {sessionUser && sessionUser !== spotOwner && !existing && (
        <form onSubmit={onSubmit}></form>
      )}
    </>
  );
};
