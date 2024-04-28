import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { spotDetails } from "../../store/spots";
import { useParams } from "react-router-dom";
// import blankWvStar from "../../West_Virginia-512.png";
import { deleteReviewThunk, spotReviews } from "../../store/reviews";
import "../../../public/assets/index-167b04b0.css";
import MakeReview from "../Reviews/MakeReview";
import "./modal.css";
import "./Spot.css";
import { FaStar } from "react-icons/fa";
function DetailsPage() {
  let { spotId } = useParams();
  let dispatch = useDispatch();
  const [toggleOne, setToggleOne] = useState(false);
  useEffect(() => {
    dispatch(spotDetails(spotId));
    dispatch(spotReviews(spotId));
  }, [dispatch, spotId, toggleOne]);

  const closeModal = () => {
    setToggleOne(true);
    setShowModal(false);
    dispatch(spotReviews(spotId));
  };

  let spot = useSelector((state) => state.spots);
  let selected = spot[spotId];
  let reviews = useSelector((state) => state.reviews);
  let rv = Object.values(reviews);
  // console.log("Reviews: " + rv);
  let reversedReviews = rv.reverse();
  reversedReviews;
  // console.log("reversedReviews: " + reversedReviews);
  const handleDelete = async () => {
    const reviewToDelete = rv.find(
      (review) => review.userId === sessionUser.id
    );
    if (reviewToDelete) {
      await dispatch(deleteReviewThunk(reviewToDelete.id));
      toggleDeleteModal();
    }
    // console.log(reviewToDelete);
  };
  // console.log(reversedReviews);
  let sum = 0;
  rv.forEach((review) => {
    sum += review.stars;
  });
  //   console.log(rv);
  let average = (sum / rv.length).toFixed(1);
  if (average % 1 === 0) {
    average = (+average).toFixed(0);
  }
  //   console.log(average);
  let stringAvg = average.toString();
  let sessionUser = useSelector((state) => state.session.user);
  // console.log(sessionUser.id)
  let existing = rv.find((review) => review.userId === sessionUser?.id);
  //   console.log(existing);

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
    setToggleOne(!toggleOne);
  };
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
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
          <div
            className="spotDetailsImages"
            style={
              {
                // display: "flex",
                // flexDirection: "row",
                // flexWrap: "wrap",
                // gap: "24px",
                // width: "1000px",
                // height: "500px",
              }
            }
          >
            <img
              // style={{ width: "700px", height: "500px" }}
              src={selected?.SpotImages?.[0]?.url}
              alt={`Spot ${spotId} preview image`}
              className="largeThumbnail"
            />
            <div
              className="smallImagesContainer"
              style={
                {
                  // display: "flex",
                  // flexDirection: "row",
                  // maxHeight: "500px",
                  // height: "500px",
                  // width: "300px",
                  // maxWidth: "300px",
                }
              }
            >
              <img
                style={{ width: "300px", height: "220px" }}
                src={
                  selected.SpotImages?.[1]?.url ||
                  "https://res.cloudinary.com/djuzk5um3/image/upload/v1710993252/am-bnb%20authme_Project/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available_ykibfw.webp"
                }
                alt="small spot picture one"
              />
              <img
                style={{ width: "300px", height: "220px" }}
                src={
                  selected.SpotImages?.[2]?.url ||
                  "https://res.cloudinary.com/djuzk5um3/image/upload/v1710993252/am-bnb%20authme_Project/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available_ykibfw.webp"
                }
                alt="small spot picture 2"
              />
              <img
                style={{ width: "300px", height: "220px" }}
                src={
                  selected.SpotImages?.[3]?.url ||
                  "https://res.cloudinary.com/djuzk5um3/image/upload/v1710993252/am-bnb%20authme_Project/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available_ykibfw.webp"
                }
                alt="small spot picture 3"
              />
              <img
                style={{ width: "300px", height: "220px" }}
                src={
                  selected.SpotImages?.[4]?.url ||
                  "https://res.cloudinary.com/djuzk5um3/image/upload/v1710993252/am-bnb%20authme_Project/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available_ykibfw.webp"
                }
                alt="small spot picture 4"
              />
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              right: "12px",
              width: "200px",
              height: "150px",
              border: "3px solid rgb(0, 40, 85)",
              borderRadius: "5%",
            }}
          >
            <h3 style={{ marginLeft: "20px" }}>${selected.price} per night</h3>
            <h4 style={{ marginLeft: "20px" }}>
              <FaStar />
              {rv.length > 0 ? `${average} stars · ` : null}
              {rv.length === 0
                ? "New"
                : rv.length > 1
                ? `${rv.length} reviews`
                : `1 review`}
            </h4>
            {sessionUser && sessionUser?.id !== selected.ownerId && (
              <button
                onClick={() => window.alert("Feature coming soon...")}
                style={{
                  marginLeft: "15px",
                  cursor: "pointer",
                  width: "80px",
                  height: "30px",
                }}
              >
                Reserve
              </button>
            )}
          </div>
          <div className="spotInfo">
            <div className="description">
              <h3>{`Hosted by ${selected.Owner?.firstName} ${selected.Owner?.lastName}`}</h3>
              <p style={{ width: "500px" }}>{selected?.description}</p>
              <span className="spotPrice">{`$${selected?.price} / night`}</span>
              <br />
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
                      <FaStar style={{ color: "#EAAA00" }} />

                      {rv.length > 0
                        ? average % 1 !== 0
                          ? `${average} stars · `
                          : `${stringAvg} stars · `
                        : ""}
                    </h3>

                    <h3>
                      {rv.length === 0
                        ? "New"
                        : rv.length > 1
                        ? `${rv.length} reviews`
                        : `1 review`}
                      {/* {rv.length > 1
                          ? ` ${rv.length} reviews`
                          : ` ${rv.length} review`} */}
                    </h3>
                  </div>
                  <ul style={{ listStyle: "none" }}>
                    {rv.length === 0
                      ? "Be the first to leave a review!"
                      : rv.map((review) => (
                          <li key={review.id} style={{borderBottom: "2px solid black", width: "200px",}}>
                            <div style={{ display: "flex", gap: "8px" }}>
                              <p>
                                {" "}
                                <b>
                                  {review.User?.firstName ||
                                    sessionUser.firstName}{" "}
                                </b>
                              </p>
                              <p>
                                {" "}
                                {months[review.createdAt?.slice(0, 1) - 1]}
                                {", "}
                                {review.createdAt?.slice(5, 9)}
                              </p>
                            </div>
                            <p>
                              <FaStar />
                              <b> {review.stars} stars</b>
                            </p>
                            <p>{review.review}</p>
                            {sessionUser &&
                              sessionUser.id === review.userId && (
                                <button onClick={toggleDeleteModal} style={{marginBottom: "10px"}}>
                                  Delete
                                </button>
                              )}
                            {showDeleteModal && (
                              <div
                                className="modal"
                                onClick={toggleDeleteModal}
                              >
                                <div
                                  className="modal-content"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span
                                    className="close"
                                    style={{ cursor: "pointer" }}
                                    onClick={toggleDeleteModal}
                                  >
                                    X
                                  </span>
                                  <h2>Confirm Delete</h2>
                                  <p>
                                    Are you sure you want to delete this review?
                                  </p>
                                  <button
                                    style={{
                                      backgroundColor: "grey",
                                      color: "White",
                                    }}
                                    onClick={toggleDeleteModal}
                                  >{`No (Keep Review)`}</button>
                                  <button
                                    style={{ backgroundColor: "red" }}
                                    onClick={() => {
                                      handleDelete(); // console.log(review.id);
                                    }}
                                  >
                                    {`Yes (Delete Review)`}
                                  </button>
                                </div>
                              </div>
                            )}
                          </li>
                        ))}
                  </ul>
                </div>
              </span>
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

            <MakeReview closeModal={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
