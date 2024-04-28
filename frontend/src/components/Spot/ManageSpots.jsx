import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userSpots } from "../../store/spots";
import blankWVStar from "../../West_Virginia-512.png";
import { deleteUserSpot } from "../../store/spots";
import "./modal.css";
function ManageSpots() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const spots = useSelector((state) => state.spots);
  const spotsArray = Object.values(spots);

  const toggleModal = () => setShowModal(!showModal);

  //   const closeModal = () => {
  //     setShowModal(false);
  //   };
  const handleDelete = async (spotId) => {
    try {
      // window.location.reload(); // Dispatch deleteUserSpot thunk with spotId
      await dispatch(deleteUserSpot(spotId));
      setDeleted(!deleted);
      toggleModal(); // Close the modal after successful deletion
    } catch (error) {
      console.error("Error deleting spot:", error);
      // Handle error or display error message
    }
  };
  useEffect(() => {
    dispatch(userSpots());
  }, [dispatch, deleted]);
  return (
    <>
      <h1>Manage Spots</h1>
      <NavLink to="/spots/new" style={{display: "flex", width: "150px", height: "30px", backgroundColor: "#002855", color: "#EAAA00", textDecoration: "none", justifyContent: "center", alignContent: "center"}}>Create a New Spot</NavLink>
      {spotsArray.length === 0 ? (
        <div className="noSpotsMessage">
          {/* <NavLink to="/spots/new">Create a New Spot</NavLink>
           */}
          <p></p>
        </div>
      ) : (
        <div className="spotContainer">
          {spotsArray.map((spot) => (
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
                  <div className="price">{`$${spot.price}`}</div>
                  <div className="stars">
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src={blankWVStar}
                      alt="WVStarIcon"
                    />
                    {spot?.avgRating !== 0
                      ? (spot?.avgRating % 1 === 0
                          ? spot?.avgRating?.toFixed(0)
                          : spot?.avgRating?.toFixed(1)) + " stars"
                      : "New"}
                  </div>
                </div>
              </NavLink>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: "290px",
                }}
              >
                <div style={{display: "flex", position: "relative", right: "280px", gap: "10px", marginTop: "10px"}}>
                  <button
                    onClick={() => navigate(`/spots/${spot.id}/update-spot`)}
                  >
                    Update
                  </button>
                  <button onClick={toggleModal}>Delete</button>
                </div>
              </div>
              {showModal && (
                <div className="modal" onClick={toggleModal}>
                  <div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                    // style={{display: "flex", flexDirection: "column"}}
                  >
                    <span
                      className="close"
                      style={{ cursor: "pointer" }}
                      onClick={toggleModal}
                    >
                      X
                    </span>
                    <h3>Confirm Delete</h3>
                    <p>Are you sure that you want to remove this spot?</p>
                    <br />
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <button
                        onClick={() => handleDelete(spot.id)} style={{width: "280px", height: "50px", fontSize: "1em", backgroundColor: "red", cursor: "pointer"}}
                      >{`Yes (Delete Spot)`}</button>
                      <button onClick={toggleModal} style={{width: "280px", height: "50px", fontSize: "1em", backgroundColor: "grey", cursor: "pointer"}}>{`No (Keep Spot)`}</button>
                      {/* <MakeReview closeModal={closeModal} /> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default ManageSpots;
