import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { spotDetails } from "../../store/spots";
import { useParams } from "react-router-dom";
import blankWvStar from "../../West_Virginia-512.png";
import { spotReviews } from "../../store/reviews";
import "../../../public/assets/index-167b04b0.css";

// import { spotReviews } from "../../store/reviews";

function DetailsPage() {
  let { spotId } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotDetails(spotId));
  }, [dispatch, spotId]);
  useEffect(() => {
    dispatch(spotReviews(spotId));
  }, [dispatch, spotId]);

  let spot = useSelector((state) => state.spots);
  let selected = spot[spotId];

  //   let rv = useSelector((state) => state.reviews);
  let reviews = useSelector((state) => state.reviews);
  console.log(Object.values(reviews));

  return (
    <div>
      {selected && (
        <div className="spotPage">
          <header>
            <h2>{selected.name}</h2>
            <h3>
              {selected.city}, {selected.state}
              {selected.country}
            </h3>
          </header>
          <div className="spotDetailsImages">
            <img
              src={selected?.SpotImages?.[0].url}
              alt={`Spot ${spotId} preview image`}
              className="largeThumbnail"
            />
            <div className="smallImagesContainer">
              <img
                src={selected.SpotImages?.[1]?.url}
                alt="small spot picture one"
              />
              <img
                src={selected.SpotImages?.[1]?.url}
                alt="small spot picture 2"
              />
              <img
                src={selected.SpotImages?.[1]?.url}
                alt="small spot picture 3"
              />
              <img
                src={selected.SpotImages?.[1]?.url}
                alt="small spot picture 4"
              />
            </div>
            <div className="spotInfo">
              <div className="description">
                <h3>{`Hosted by ${selected.Owner?.firstName} ${selected.Owner?.lastName}`}</h3>
                <p>{selected.description}</p>
                <span className="spotPrice">
                  {`$${selected.price} / night`}{" "}
                </span>
                <span className="spotStars">
                  <img
                    src={blankWvStar}
                    alt="tinyStar"
                    style={{ width: "25px", height: "25px" }}
                  />
                  {/* <h3>{reviews()}</h3> */}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
