// import { useDispatch } from "react-redux";
import { csrfFetch } from "./csrf";
// let dispatch = useDispatch();

const GETSPOTS = "spots/GETSPOTS";
const GETSPOT = "spots/GETSPOT";
const CREATE = "spots/CREATE";
const UPDATE = "spots/UPDATE";
const DELETE = "spots/DELETE";
const GETCURRENT = "spots/GETCURRENT";

let getSpots = (spots) => ({
  type: GETSPOTS,
  spots,
});

let getSpot = (spot) => ({
  type: GETSPOT,
  spot,
});

let createSpot = (spot) => ({
  type: CREATE,
  spot,
});

let getCurrentSpots = (spots) => ({
  type: GETCURRENT,
  spots,
});

let updateSpot = (spot) => ({
  type: UPDATE,
  spot,
});

let deleteSpot = (spot) => ({
  type: DELETE,
  spot,
});

export const deleteUserSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  await dispatch(deleteSpot(spotId));
  res.json("Successfully Deleted");
};

export const updateCurrent = (spot, spotId) => async (dispatch) => {
  let res = await csrfFetch(`/apit/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  let updated = await res.json();
  await dispatch(updateSpot(updated));
  return updated;
};

export const createASpot = (spot, images) => async (dispatch) => {
  const imgURLs = Object.values(images);
  let res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });
  if (res.status !== 201) {
    throw new Error("Spot could not be created");
  }
  if (res.ok) {
    let newSpot = await res.json();
    let newImgs = imgURLs.forEach((url) => {
      url &&
        csrfFetch(`/api/spots/${newSpot.id}/images`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            url: url,
            preview: true,
          }),
        });
    });
    await dispatch(createSpot(newSpot, newImgs));
    return newSpot;
  }
};

export const getAll = () => async (dispatch) => {
  let res = await csrfFetch("/api/spots", {});
  let data = await res.json();
  dispatch(getSpots(data));
  return res;
};

export const spotDetails = (spotId) => async (dispatch) => {
  let res = await csrfFetch(`/api/spots/${spotId}`);
  let data = await res.json();
  dispatch(getSpot(data));
  return res;
};

export const userSpots = () => async (dispatch) => {
  let res = await csrfFetch(`/api/spots/current`);
  let currentSpots = await res.json();
  dispatch(getCurrentSpots(currentSpots));
  return currentSpots;
};

function spotsReducer(state = {}, action) {
  switch (action.type) {
    case GETSPOTS: {
      let newState = {};
      action.spots.Spots.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    }
    case GETSPOT: {
      let newState = { [action.spot.id]: action.spot };
      return newState;
    }
    case CREATE: {
      let newState = { ...state, [action.spot.id]: action.spot };
      return newState;
    }
    case GETCURRENT: {
      let newState = {};
      action.spots.Spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    }
    case UPDATE: {
      let newState = { ...state, [action.spot.id]: action.spot };
      return newState;
    }
    case DELETE: {
      let newState = { ...state };
      delete newState[action.spotId];
      return newState;
    }
    default:
      return state;
  }
}

export default spotsReducer;
