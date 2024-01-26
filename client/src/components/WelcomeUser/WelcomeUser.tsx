import { Container, Row } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { Heart } from "react-bootstrap-icons";
import youryogaspace from "../../assets/your-yoga-space.png";

// Component with Welcome content when you log in
function WelcomeUser() {
  const { loggedInUser } = useUserContext();

  return (
    <>
      {loggedInUser ? (
        <>
          <Container
            fluid
            style={{
              backgroundImage: `url(${youryogaspace})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              minHeight: "80vh",
            }}
            className="d-flex justify-content-center"
          >
            <Row className="p-3">
              <h1
                className="text-center mt-4"
                style={{ textShadow: "pink 1px 0 10px" }}
              >
                Namaste{" "}
                <span style={{ filter: "drop-shadow(0 0 0.75rem crimson)" }}>
                  <Heart />
                </span>{" "}
                {loggedInUser.firstName} {loggedInUser.lastName}
              </h1>
            </Row>
          </Container>
        </>
      ) : null}
    </>
  );
}

export default WelcomeUser;
