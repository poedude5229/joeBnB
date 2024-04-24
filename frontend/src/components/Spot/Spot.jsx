import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { spotDetails } from "../../store/spots";
import { useParams } from "react-router-dom";
// import blankWvStar from "../../West_Virginia-512.png";
import { spotReviews } from "../../store/reviews";
import "../../../public/assets/index-167b04b0.css";
import MakeReview from "../Reviews/MakeReview";
import "./modal.css";
function DetailsPage() {
  let { spotId } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotDetails(spotId));
    dispatch(spotReviews(spotId));
  }, [dispatch, spotId]);

  let spot = useSelector((state) => state.spots);
  let selected = spot[spotId];
  let reviews = useSelector((state) => state.reviews);
  let rv = Object.values(reviews);
  let sum = 0;
  rv.forEach((review) => {
    sum += review.stars;
  });
  //   console.log(rv);
  let average = (sum / rv.length).toFixed(1);
  //   console.log(average);
  let stringAvg = average.toString();
  let sessionUser = useSelector((state) => state.session.user);
  // console.log(sessionUser.id)
  let existing = rv.find((review) => review.userId === sessionUser.id);
//   console.log(existing);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div>
      {selected && (
        <div className="spotPage">
          <header>
            <h2>{selected.name}</h2>
            <h3>
              {selected.city}, {selected.state} {selected.country}
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
                <span className="spotPrice">{`$${selected.price} / night`}</span>
                <span className="spotStars">
                  {!existing &&
                    sessionUser &&
                    sessionUser.id !== selected.ownerId && (
                      <button onClick={toggleModal}>
                        {rv.length > 0
                          ? "Post Your Review!"
                          : "Be the first to leave a review!"}
                      </button>
                    )}
                  <div className="reviewBoard">
                    <div
                      className="reviewHeader"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                      }}
                    >
                      <h3>
                        {stringAvg[stringAvg.length - 1] === 0
                          ? `${average} stars · `
                          : `${stringAvg} stars · `}
                      </h3>

                      <h3>
                        {rv.length > 1
                          ? ` ${rv.length} reviews`
                          : ` ${rv.length} review`}
                      </h3>
                    </div>
                    <ul>
                      {rv.map((review) => (
                        <li key={review.id}>{review.review}</li>
                      ))}
                    </ul>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span
              className="close"
              style={{ cursor: "pointer" }}
              onClick={toggleModal}
            >
              X
                      </span>
                      <form onSubmit={toggleModal}><MakeReview /></form>

          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
