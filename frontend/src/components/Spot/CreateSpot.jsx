import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createASpot, spotDetails } from "../../store/spots";

function CreateSpot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sessionUser = useSelector((state) => state.session.user);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(90);
  const [lng, setLng] = useState(180);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(1);
  const [previewImage, setPreviewImage] = useState({ url: "", preview: true });
  const [img2, setImg2] = useState({ url: "", preview: true });
  const [img3, setImg3] = useState({ url: "", preview: true });
  const [img4, setImg4] = useState({ url: "", preview: true });
  const [img5, setImg5] = useState({ url: "", preview: true });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    let validArr = [];
    if (name.length < 5) {
      validArr.push("Name is required (Must be at least 5 characters)");
    }
    if (name.length > 30) {
      validArr.push("Name must be less than 50 characters");
    }
    if (address.length < 5) {
      validArr.push("Street address is required");
    }
    if (city.length < 1) {
      validArr.push("City is required");
    }
    if (state.length < 1) {
      validArr.push("State is required");
    }
    if (country.length < 1) {
      validArr.push("Country is required");
    }
    if (lat < -90 || lat > 90) {
      validArr.push("Latitude must be within -90 and 90");
    }
    if (lng < -180 || lng > 180) {
      validArr.push("Longitude must be within -180 and 180");
    }
    if (description.length < 30) {
      validArr.push("Description needs 30 or more characters");
    }
    if (price < 1) {
      validArr.push("Price per night is required");
    }
    if (previewImage.url.length < 1) {
      validArr.push("Preview image URL is required");
    }
    setErrors(validArr);
  }, [
    name,
    address,
    city,
    state,
    country,
    lat,
    lng,
    description,
    price,
    previewImage.url,
  ]);

  async function handleSubmit(e) {
    e.preventDefault();

    let images = { previewImage, img2, img3, img4, img5 };
    // console.log(previewImage, img2, img3, img4, img5);
    let spot = {
      ownerId: sessionUser.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    };
    // console.log(images);

    // spot.spotImages = Object.values(images);
    let newSpot = await dispatch(createASpot(spot, images));
    // newSpot.SpotImages.push(Object.values(images));
    await dispatch(spotDetails(newSpot.id));
    navigate(`/spots/${newSpot.id}`);
  }

  return (
    <div
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        width: "500px",
      }}
    >
      <h1
        style={{ marginLeft: "auto", marginRight: "auto", textAlign: "left" }}
      >
        Create a New Spot
      </h1>

      <form style={{ marginLeft: "auto", marginRight: "auto" }}>
        <section id="inputContainer">
          <h2>Where&#39;s your spot located?</h2>
          <p>
            Guests will only get your exact address once they booked a
            reservation
          </p>
          <label
            htmlFor="Country"
            style={{ display: "flex", flexDirection: "column" }}
          >
            Country
            <br />
            <input
              id="Country"
              name="Country"
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label>
          <p
            style={{
              color: "red",
              backgroundColor: "rgb(0,0,0)",
              width: "180px",
            }}
          >
            {errors.filter((error) => error.includes("Country"))}
          </p>
          <hr />
          <div id="addressInputContainer">
            <label htmlFor="streetAddress">
              Street Address
              <br />
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                placeholder="Street Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <p
              style={{
                backgroundColor: "rgb(0,0,0)",
                color: "red",
                width: "180px",
              }}
            >
              {errors.filter((error) => error.includes("ddress"))}
            </p>
            <hr />
          </div>
          <div style={{ display: "flex", gap: "40px" }}>
            <label htmlFor="city">
              City
              <br />
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ width: "370px" }}
              />
            </label>

            <label htmlFor="state">
              State
              <br />
              <input
                type="text"
                id="state"
                name="state"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </label>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
            <p
              style={{
                backgroundColor: "rgb(0, 0, 0)",
                color: "red",
                width: "180px",
              }}
            >
              {errors.filter((error) => error.includes("ity"))}
            </p>
            <p
              style={{
                backgroundColor: "rgb(0,0,0)",
                color: "red",
                width: "180px",
              }}
            >
              {errors.filter((error) => error.includes("tate"))}
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "24px" }}>
            <label htmlFor="latitude">
              Latitude
              <input
                type="number"
                id="latitude"
                name="latitude"
                placeholder="Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </label>

            <label htmlFor="longitude">
              Longitude
              <input
                type="number"
                id="longitude"
                name="longitude"
                placeholder="Longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </label>
          </div>
        </section>
        <section id="descriptionContainer">
          <h2>Describe your place to guests!</h2>
          <p>
            Mention the best features of your space, any special amenities like
            fast wifi or parking
          </p>
          <textarea
            name="description"
            id="descriptionInput"
            cols="70"
            rows="5"
            placeholder="Please write at least 30 characters"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p
            style={{
              backgroundColor: "rgb(0,0,0)",
              color: "red",
              width: "300px",
            }}
          >
            {errors.filter((error) => error.includes("cription"))}
          </p>
        </section>
        <section>
          <h2>Create a title for your spot</h2>
          <p>
            Catch guests&#39; attention with a spot title that highlights what
            makes your spot special.
          </p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of your spot"
          />
          <p
            style={{
              color: "red",
              backgroundColor: "rgb(0,0,0)",
              width: "180px",
            }}
          >
            {errors.filter((error) => error.includes("Name"))}
          </p>
        </section>
        <section>
          <h2>Set a base price for your spot</h2>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results
          </p>
          ${" "}
          <input
            type="number"
            placeholder="Price per night (USD)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </section>
        <section id="photos-input-section">
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot</p>
          <div id="photos-input-field" style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <label htmlFor="prevImageURL">
              {/* {"Preview Image URL:     "} */}
              <input
                type="text"
                placeholder="Preview Image Url"
                id="prevImageURL"
                value={previewImage.url}
                onChange={(e) =>
                  setPreviewImage((prevState) => ({
                    ...prevState,
                    url: e.target.value,
                  }))
                }
                style={{width: "540px"}}
              />
            </label>
            <p
              style={{
                color: "red",
                backgroundColor: "rgb(0,0,0)",
                width: "180px",
              }}
            >
              {errors.filter((error) => error.includes("review"))}
            </p>
            <label htmlFor="image2Input">
              {/* Image 2 URL */}
              <input
                type="text"
                placeholder="Image URL"
                id="image2Input"
                value={img2.url}
                onChange={(e) =>
                  setImg2((prevState) => ({
                    ...prevState,
                    url: e.target.value,
                  }))
                }
                style={{width: "540px"}}
              />
            </label>
            <label htmlFor="image3Input">
              {/* Image 3 URL */}
              <input
                id="image3Input"
                type="text"
                placeholder="Image URL"
                value={img3.url}
                onChange={(e) =>
                  setImg3((prevState) => ({
                    ...prevState,
                    url: e.target.value,
                  }))
                }
                style={{width: "540px"}}
              />
            </label>
            <label htmlFor="image4Input">
              {/* Image 4 URL */}
              <input
                type="text"
                id="image4Input"
                placeholder="Image URL"
                value={img4.url}
                onChange={(e) =>
                  setImg4((prevState) => ({
                    ...prevState,
                    url: e.target.value,
                  }))
                }
                style={{width: "540px"}}
              />
            </label>
            <label htmlFor="image5Input">

              <input
                type="text"
                id="image5Input"
                placeholder="Image URL"
                value={img5.url}
                onChange={(e) =>
                  setImg5((prevState) => ({
                    ...prevState,
                    url: e.target.value,
                  }))
                }
                style={{width: "540px"}}
              />
            </label>
          </div>
        </section>
        <hr />
        <button style={{marginTop: "5px", position: "relative", left: "210px", width: "130px",height: "40px",boxShadow: "2px 3px 5px #EAAA00", backgroundColor: "#002855", color: "#EAAA00", fontSize: "1em"}} onClick={handleSubmit}>Create Spot</button>
      </form>
    </div>
  );
}

export default CreateSpot;
