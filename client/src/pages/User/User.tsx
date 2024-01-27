import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useUserContext } from "../../context/UserContext";
import WelcomeUser from "../../components/WelcomeUser/WelcomeUser";
import Sidebar from "../../components/Sidebar/Sidebar";
import NoUserAccess from "../../components/Errors/NoUserAccess";

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
          <NoUserAccess></NoUserAccess>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default User;
