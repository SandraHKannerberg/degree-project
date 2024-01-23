import { useUserContext, NewUserType } from "../../context/UserContext";
import { Person, Envelope, Key } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import Logotype from "../Logotype/Logotype";

//Component with the form to sign up as a new user

function SignUpForm() {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    registrationNewUser,
    errorInfo,
    setErrorInfo,
    successInfo,
  } = useUserContext();
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleRegistrationNewUser = async () => {
    // Reset error states
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);

    // Collect user data from the log in form (inputs)
    const newUserData: NewUserType = {
      firstName,
      lastName,
      email,
      password,
    };

    // Check for required fields
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      setNameError(firstName === "" || lastName === "");
      setEmailError(email === "");
      setPasswordError(password === "");
      setErrorInfo("*Required Fields! Can't be empty");
      return; // Do not proceed registration if required fields are empty
    }

    // Call login with the user data
    await registrationNewUser(newUserData);
  };

  // Timeout for error message to be shown
  useEffect(() => {
    if (errorInfo !== "") {
      setTimeout(() => {
        setErrorInfo("");
      }, 5000);
    }
  }, [errorInfo]);

  return (
    <Container className="h-100 mt-0 p-3">
      {successInfo ? (
        <h5 className="mt-3" style={{ color: "#74cb88" }}>
          {successInfo}
        </h5>
      ) : (
        <>
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

            <span className="text-center my-3">
              Sign Up today and take advantage of our amazing offers.
            </span>
          </Row>

          <InputGroup className="mt-2 mb-3">
            <InputGroup.Text
              id="basic-addon1"
              style={{
                backgroundColor: "#3F2E3E",
                color: "#EFE1D1",
                border: "none",
              }}
            >
              <Person />
            </InputGroup.Text>
            <Form.Control
              placeholder="Firstname"
              aria-label="Firstname"
              aria-describedby="basic-addon1"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={`customize-input ${nameError ? "error-border" : ""}`}
            />
          </InputGroup>
          <InputGroup className="mt-2 mb-3">
            <InputGroup.Text
              id="basic-addon1"
              style={{
                backgroundColor: "#3F2E3E",
                color: "#EFE1D1",
                border: "none",
              }}
            >
              <Person />
            </InputGroup.Text>
            <Form.Control
              placeholder="Lastname"
              aria-label="Lastname"
              aria-describedby="basic-addon1"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className={`customize-input ${nameError ? "error-border" : ""}`}
            />
          </InputGroup>
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
                emailError || errorInfo ? "error-border" : ""
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
                passwordError || errorInfo ? "error-border" : ""
              }`}
            />
          </InputGroup>

          {/* Error message if fields are empty */}
          {errorInfo !== "" && (
            <span
              style={{
                color: "#dc3545",
                fontWeight: "bold",
                backgroundColor: "#EFE1D1",
                borderRadius: "15px 15px 15px 0",
                height: "25px",
              }}
              className="mx-1 my-1 p-3 d-flex align-items-center"
            >
              {errorInfo}
            </span>
          )}

          <Row className="mx-1">
            <Button
              style={{
                backgroundColor: "#3F2E3E",
                color: "#EFE1D1",
                border: "none",
                borderRadius: 0,
                fontWeight: 500,
              }}
              className="shadow"
              onClick={handleRegistrationNewUser}
            >
              Submit
            </Button>
          </Row>
        </>
      )}
    </Container>
  );
}

export default SignUpForm;
