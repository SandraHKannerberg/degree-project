import { useUserContext } from "../../context/UserContext";
import { Person, Envelope, Key } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Row } from "react-bootstrap";

function NewUserForm() {
  const { registrationNewUser, errorInfo, setErrorInfo, successInfo } =
    useUserContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleRegistrationNewUser = async () => {
    // Reset error states
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);

    // Collect user data from the log in form (inputs)
    const newUserData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
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

  useEffect(() => {
    if (errorInfo !== "") {
      setTimeout(() => {
        setErrorInfo("");
      }, 5000);
    }
  }, [errorInfo]);

  return (
    <>
      {successInfo ? (
        <h5 className="mt-3">{successInfo}</h5>
      ) : (
        <>
          <h6 className="mt-3">Not a member yet?</h6>
          <span>
            Sign Up to Club Lotus Harmony and take advantage of our offers.
          </span>
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
              className={nameError ? "error-border" : ""} // Apply red border if nameError is true
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
              className={nameError ? "error-border" : ""} // Apply red border if nameError is true
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
              className={emailError || errorInfo ? "error-border" : ""} // Apply red border if emailError is true
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
              className={passwordError ? "error-border" : ""} // Apply red border if passwordError is true
            />
          </InputGroup>

          <span>{errorInfo}</span>
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
    </>
  );
}

export default NewUserForm;
