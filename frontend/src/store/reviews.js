import { csrfFetch } from "./csrf";
const GET = "reviews/GET";
const DELETE = "reviews/DELETE";
const CREATE = "reviews/CREATE";

const getReviews = (reviews) => {
  return {
    type: GET,
    reviews,
  };
};

const delReview = (review) => {
  return {
    type: DELETE,
    review,
  };
};

const makeReview = (review) => {
  return {
    type: CREATE,
    review,
  };
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  let res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
    await dispatch(delReview(reviewId));
    res.json(``)
};
