import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useUserContext } from "../../context/UserContext";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";
import Sidebar from "../../components/Sidebar/Sidebar";

function User() {
  const { loggedInUser } = useUserContext();

  return (
    <>
      <Header />
      <Container
        fluid
        className="p-0 mx-0"
        style={{
          marginTop: "9rem",
          minHeight: "60vh",
        }}
      >
        {loggedInUser ? (
          <Row
            className="d-flex mx-3"
            style={{
              marginTop: "9rem",
            }}
          >
            <Sidebar></Sidebar>
            <Col>
              <WelcomeUser />
            </Col>
          </Row>
        ) : (
          <Row>
            <p className="text-center">
              Oops sorry, no access! You need to log in
            </p>
          </Row>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default User;
