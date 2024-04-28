import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../store/spots";
import blankWVStar from "../../West_Virginia-512.png";
import "./Homepage.css";

const Homepage = () => {
  const dispatch = useDispatch();

  let spots = useSelector((state) => state.spots);

  spots = Object.values(spots);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  return (
    <>
      <div className="spotContainer">
        {spots &&
          spots.map((spot) => (
            <div className="tile" key={spot.id}>
              <NavLink to={`/spots/${spot.id}`}>
                <img
                  src={spot.previewImage}
                  alt={`Preview image for ${spot.name}`}
                  className="tileThumbnail"
                />
                <div className="spotInfo">
                  <span className="spotName">{`${spot.name}`}</span>
                  <div className="spotLocation">{`${spot.city}, ${spot.state}`}</div>

                  <div className="price">{`$${spot.price}`}/ night</div>
                  <div className="stars">
                    <img src={blankWVStar} alt="WVStar" className="WVStar" />
                    {spot?.avgRating !== 0
                      ? (spot?.avgRating % 1 === 0
                          ? spot?.avgRating?.toFixed(0)
                          : spot?.avgRating?.toFixed(1)) + " stars"
                      : "New"}
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
      </div>
    </>
  );
};

export default Homepage;
