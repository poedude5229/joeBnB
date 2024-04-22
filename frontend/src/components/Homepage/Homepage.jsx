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
                  <div className="spotName">{`${spot.name}`}</div>
                  <div className="spotLocation">{`${spot.city}, WV`}</div>

                  <div className="price">{`$${spot.price}`}/ night</div>
                  <div className="stars">
                    <img src={blankWVStar} alt="WVStar" className="WVStar" />
                    {spot.avgRating !== 0
                      ? `${spot.avgRating} stars`
                      : "Not yet reviewed"}
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
