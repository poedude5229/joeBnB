import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitBlock, setSubmitBlock] = useState(false);
  const { closeModal } = useModal();
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        // console.log(res);
        if (parseInt(res.status) === 401) {
          setErrorMessage("The provided credentials were invalid");
        }
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  useEffect(() => {
    if (credential.length < 4 || password.length < 6) {
      setSubmitBlock(true);
    }
    if (credential.length > 4 && password.length > 6) {
      setSubmitBlock(false);
    }
  }, [credential, password]);

  return (
    <div className="loginBox" style={{ display: "flex" }}>
      <h1 style={{ textAlign: "center" }}>Log In</h1>
      {errorMessage && (
        <p style={{ backgroundColor: "#000000b3", color: "red" }}>
          {errorMessage}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "auto",
          marginRight: "auto",
          gap: "8px",
        }}
      >
        <label style={{ paddingRight: "8px" }}>
          Username or Email:{" "}
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label style={{ paddingRight: "8px" }}>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p>{errors.credential}</p>}
        <button
          type="submit"
          disabled={submitBlock}
          style={
            submitBlock === false
              ? { cursor: "pointer" }
              : { cursor: "not-allowed" }
          }
        >
          Log In
        </button>
        <button
          type="submit"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setCredential("Demo-lition"), setPassword("password");
          }}
        >
          Login as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
