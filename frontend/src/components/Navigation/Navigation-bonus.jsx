import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton-bonus";
import "./Navigation.css";
import bridge from "../../../public/assets/bridge.png";
function Navigation({ isLoaded }) {
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
      }}
    >
      <div
        onClick={() => navigate("/")}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          cursor: "pointer",
        }}
      >
        <img
          src={bridge}
          alt="No"
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        />
        <span
          style={{
            fontSize: "60px",
            color: "#002855",
            fontWeight: "bold",
            textShadow: "2px 2px 5px #EAAA00",
          }}
        >
          WV
        </span>
        <span style={{ fontSize: "60px", color: "#EAAA00" }}>bnb</span>
      </div>

      <ul
        style={{
          borderRadius: "10px ",
          border: "1px solid gray",
          paddingRight: "40px",
          paddingLeft: "15px",
          width: "100px",
          height: "100px",
          boxShadow: "2px 2px 5px #002855",
          backgroundColor: "white",
          listStyle: "none",
          display: "flex",
          flexFlow: "row-wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <li style={{ paddingRight: "10px" }}>
          <NavLink to="/" style={{ fontSize: "20px" }}>
            Home
          </NavLink>
        </li>

        {sessionUser && <NavLink to="spots/new">Create a New Spot</NavLink>}
        {isLoaded && (
          <li style={{ cursor: "hover", paddingLeft: "10px" }}>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
