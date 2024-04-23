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

const delReview = (reviewId) => {
  return {
    type: DELETE,
    reviewId,
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
  res.json(`Successfully deleted ${reviewId}`);
};

export const createSpotReview = (review, spotId) => async (dispatch) => {
  let res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  let newReview = await res.json();
  await dispatch(makeReview(newReview));
  return newReview;
};

export const spotReviews = (spotId) => async (dispatch) => {
  let res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  let reviews = await res.json();
  dispatch(getReviews(reviews));
  return reviews;
};

export default function reviewsReducer(state = {}, action) {
  switch (action.type) {
    case GET: {
      let newState = {};
      action.reviews.Reviews.forEach(
        (review) => (newState[review.id] = review)
      );
      return newState;
    }
    case CREATE: {
      let newState = { ...state, [action.review.id]: action.review };
      return newState;
    }
    case DELETE: {
      let newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }

    default:
      return state;
  }
}
