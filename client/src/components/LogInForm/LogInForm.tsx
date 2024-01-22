import { useUserContext } from "../../context/UserContext";
import { Envelope, Key } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Row } from "react-bootstrap";

function LogInForm() {
  const { loggedInUser, login, logout, errorLogin, setErrorLogin } =
    useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async () => {
    // Reset error states
    setEmailError(false);
    setPasswordError(false);

    // Collect user data from the log in form (inputs)
    const userData = {
      email: email,
      password: password,
    };

    // Check for required fields
    if (email === "" || password === "") {
      setErrorLogin("*Required Field! Can't be empty");
      setEmailError(email === "");
      setPasswordError(password === "");
      return; // Do not proceed with login if required fields are empty
    }

    // Call login with the user data
    await login(userData);
  };

  useEffect(() => {
    if (errorLogin !== "") {
      setTimeout(() => {
        setErrorLogin("");
      }, 5000);
    }
  }, [errorLogin]);

  return (
    <>
      {loggedInUser ? (
        <>
          <p>Welcome {loggedInUser.firstName}!!</p>
          <Button
            size="lg"
            style={{
              backgroundColor: "#85586f",
              border: "none",
              borderRadius: 0,
              color: "#EFE1D1",
              fontWeight: 500,
            }}
            className="shadow"
            onClick={logout}
          >
            Log Out
          </Button>
        </>
      ) : (
        <>
          <h6>Enter e-mail and password to log in</h6>
          <InputGroup className="mt-2 mb-3">
            <InputGroup.Text id="basic-addon1">
              <Envelope />
            </InputGroup.Text>
            <Form.Control
              placeholder="E-mail"
              aria-label="E-mail"
              aria-describedby="basic-addon1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={emailError || errorLogin ? "error-border" : ""} // Apply red border if emailError is true
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <Key />
            </InputGroup.Text>
            <Form.Control
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={passwordError || errorLogin ? "error-border" : ""} // Apply red border if passwordError is true
            />
          </InputGroup>
          {/* If error occurred, write the error message here */}
          <span>{errorLogin}</span>
          <Row>
            <Button
              style={{
                backgroundColor: "#85586f",
                border: "none",
                borderRadius: 0,
                color: "#EFE1D1",
                fontWeight: 500,
              }}
              className="shadow"
              onClick={handleLogin}
            >
              Log In
            </Button>
          </Row>
        </>
      )}
    </>
  );
}

export default LogInForm;
