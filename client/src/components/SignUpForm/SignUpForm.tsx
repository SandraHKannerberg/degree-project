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
    setSuccessInfo,
    errorEmailInfo,
    setErrorEmailInfo,
    errorPswInfo,
    setErrorPswInfo,
  } = useUserContext();
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleRegistrationNewUser = async () => {
    // Reset error states
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setErrorInfo("");
    setErrorEmailInfo("");
    setErrorPswInfo("");

    // Collect user data from the log in form (inputs)
    const newUserData: NewUserType = {
      firstName,
      lastName,
      email,
      password,
    };

    // Check if required fields are empty
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      setNameError(firstName === "" || lastName === "");
      setEmailError(email === "");
      setPasswordError(password === "");
      setConfirmPasswordError(confirmPassword === "");
      setErrorInfo("*Required Fields! Can't be empty");
      return; // Do not proceed registration if required fields are empty
    }

    // Check if passwords inputs match
    if (password !== confirmPassword) {
      setErrorPswInfo("Password do not match");
      setPassword("");
      setConfirmPassword("");
      return; // Do not proceed registration if password and confirm password do not match
    }

    // Call registrationNewUser with the new user data
    await registrationNewUser(newUserData);

    // Reset fields after registration
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  // Timeout for error message to be shown if inputs are empty
  useEffect(() => {
    if (errorInfo !== "") {
      setTimeout(() => {
        setErrorInfo("");
      }, 5000); // 5sec
    }
  }, [errorInfo]);

  // Timeout for error message to be shown if email are wrong or taken
  useEffect(() => {
    if (errorEmailInfo !== "") {
      setTimeout(() => {
        setErrorEmailInfo("");
      }, 5000); // 5sec
    }
  }, [errorEmailInfo]);

  // Timeout for error message to be shown if password are wrong or do not match
  useEffect(() => {
    if (errorPswInfo !== "") {
      setTimeout(() => {
        setErrorPswInfo("");
      }, 5000); // 5sec
    }
  }, [errorPswInfo]);

  // Timeout for success message to be shown
  useEffect(() => {
    if (successInfo !== "") {
      setTimeout(() => {
        setSuccessInfo("");
      }, 8000); // 8sec
    }
  }, [successInfo]);

  // Button accept keyDown ENTER
  const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      handleRegistrationNewUser();
    }
  };

  return (
    <Container className="h-100 mt-0 p-3">
      {/* If registration success show Welcome text here */}
      {successInfo ? (
        <h5
          className="mt-3 text-center"
          style={{ color: "#EfE1D1", fontWeight: "bold" }}
        >
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

          {/* Input to enter firstname */}
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

          {/* Input to enter lastname */}
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

          {/* Input to enter email */}
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
                emailError || errorEmailInfo ? "error-border" : ""
              }`}
            />
          </InputGroup>

          {/* Input to choose password */}
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
                passwordError || errorPswInfo ? "error-border" : ""
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

            {/* Input to confirm choosen password */}
            <Form.Control
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              aria-describedby="basic-addon1"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`customize-input ${
                confirmPasswordError || errorPswInfo ? "error-border" : ""
              }`}
            />
            <p style={{ fontSize: "12px" }}>
              Password require min 6 characters of which at least one letter and
              at least one number
            </p>
          </InputGroup>

          {/* Error message if fields are empty */}
          {errorInfo !== "" && (
            <span
              style={{
                color: "#dc3545",
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#EFE1D1",
                borderRadius: "15px 15px 15px 0",
                minHeight: "25px",
              }}
              className="mx-1 my-1 p-3 d-flex align-items-center"
            >
              {errorInfo}
            </span>
          )}

          {/* Message if email error occured */}
          {errorEmailInfo !== "" && (
            <span
              style={{
                color: "#dc3545",
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#EFE1D1",
                borderRadius: "15px 15px 15px 0",
                minHeight: "25px",
              }}
              className="mx-1 my-1 p-3 d-flex align-items-center"
            >
              {errorEmailInfo}
            </span>
          )}

          {/* Message if password error occured */}
          {errorPswInfo !== "" && (
            <span
              style={{
                color: "#dc3545",
                fontWeight: "bold",
                fontSize: "14px",
                backgroundColor: "#EFE1D1",
                borderRadius: "15px 15px 15px 0",
                minHeight: "25px",
              }}
              className="mx-1 my-1 p-3 d-flex align-items-center"
            >
              {errorPswInfo}
            </span>
          )}

          {/* Button to Submit the registration */}
          <Row className="mx-1">
            <Button
              type="submit"
              style={{
                backgroundColor: "#3F2E3E",
                color: "#EFE1D1",
                border: "none",
                borderRadius: 0,
                fontWeight: 500,
              }}
              className="shadow zoom-effect"
              onClick={handleRegistrationNewUser}
              onKeyDown={handleKeyPress}
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
