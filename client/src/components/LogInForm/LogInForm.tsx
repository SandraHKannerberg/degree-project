import { useUserContext, UserType } from "../../context/UserContext";
import { Envelope, Key } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import Logotype from "../Logotype/Logotype";
import { useNavigate } from "react-router-dom";

//Component with the log in form to be able to log in.
function LogInForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loggedInUser,
    login,
    errorLogin,
    setErrorLogin,
    isAdmin,
  } = useUserContext();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to correct page depending on auth status
    if (loggedInUser) {
      if (loggedInUser.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/loggedin");
      }
    }
  }, [loggedInUser, navigate]);

  const handleLogin = async () => {
    // Reset error states
    setEmailError(false);
    setPasswordError(false);

    // Collect user data from the log in form (inputs)
    const user: UserType = {
      email,
      password,
    };

    // Check for required fields
    if (email === "" || password === "") {
      setErrorLogin("*Required Fields! Can't be empty");
      setEmailError(email === "");
      setPasswordError(password === "");
      return; // Do not proceed with login if required fields are empty
    }

    // Check if the one who log in has admin auth
    isAdmin(user);

    // Call login with the user data
    await login(user);

    // Reset the fields after login
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (errorLogin !== "") {
      setTimeout(() => {
        setErrorLogin("");
      }, 5000);
    }
  }, [errorLogin]);

  // Button accept keyDown ENTER
  const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      {/* If already log in - show the name of the user */}
      {loggedInUser ? (
        <>
          <p className="mt-3">Welcome {loggedInUser.firstName}!!</p>
        </>
      ) : (
        // If not already logged in - show log in form. Yog log in with e-mail and password
        <Container className="h-100 mt-0 p-3">
          <Row>
            <Col className="d-flex justify-content-center mt-3">
              <Logotype />
            </Col>
            <h2
              style={{
                color: "#EFE1D1",
                fontFamily: "Julius Sans One",
                textShadow: "1px 1px 2px pink",
              }}
              className="text-center"
            >
              Club Lotus Harmony
            </h2>
          </Row>

          <h6 className="text-center my-3">
            Enter e-mail and password to log in
          </h6>
          <InputGroup className="mt-2 mb-3">
            <InputGroup.Text
              id="basic-addon1"
              style={{
                backgroundColor: "#3F2E3E",
                color: "#EFE1D1",
                border: "none",
              }}
            >
              <Envelope />
            </InputGroup.Text>
            <Form.Control
              placeholder="E-mail"
              aria-label="E-mail"
              aria-describedby="basic-addon1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`customize-input ${
                emailError || errorLogin ? "error-border" : ""
              }`}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text
              id="basic-addon1"
              style={{
                backgroundColor: "#3F2E3E",
                color: "#EFE1D1",
                border: "none",
              }}
            >
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
              className={`customize-input ${
                passwordError || errorLogin ? "error-border" : ""
              }`}
            />
          </InputGroup>

          {/* If error occurred, write the error message here */}
          {errorLogin !== "" && (
            <span
              style={{
                color: "#dc3545",
                fontWeight: "bold",
                backgroundColor: "#EFE1D1",
                borderRadius: "15px 15px 15px 0",
                minHeight: "25px",
              }}
              className="mx-1 my-1 p-3 d-flex align-items-center"
            >
              {errorLogin}
            </span>
          )}

          <Row className="mx-1">
            <Button
              type="submit"
              style={{
                backgroundColor: "#3F2E3E",
                border: "none",
                borderRadius: 0,
                color: "#EFE1D1",
                fontWeight: 500,
              }}
              className="shadow"
              onClick={handleLogin}
              onKeyDown={handleKeyPress}
            >
              Log In
            </Button>
          </Row>
        </Container>
      )}
    </>
  );
}

export default LogInForm;
