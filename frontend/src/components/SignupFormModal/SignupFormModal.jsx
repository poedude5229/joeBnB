import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [block, setBlock] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  useEffect(() => {
    if (
      email.length === 0 ||
      username.length < 4 ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      password.length < 6 ||
      confirmPassword.length < 6
    ) {
      setBlock(true);
    } else {
      setBlock(false);
    }
  }, [email, username, firstName, lastName, password, confirmPassword]);

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Sign Up</h1>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", width: "290px"}}>
        <label>
          Email
          <br />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            style={{width: "260px", marginLeft: "5px"}}
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
          style={{width: "260px", marginLeft: "5px"}}
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <br />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={{ width: "260px", marginLeft: "5px" }}
            placeholder="First Name"
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label>
          Last Name
          <br />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={{ width: "260px", marginLeft: "5px" }}
            placeholder="Last Name"
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "260px", marginLeft: "5px" }}
            placeholder="Password"
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: "260px", marginLeft: "5px" }}
            placeholder="Confirm Password"
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button style={{backgroundColor: "#EAAA00", width: "260px", height: "30px", color: "darkblue", alignSelf: "center", marginTop: "5px", marginBottom: "5px",  }} type="submit" disabled={block}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
