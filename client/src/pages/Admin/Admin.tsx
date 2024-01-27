import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import { useUserContext } from "../../context/UserContext";
import WelcomeAdmin from "../../components/WelcomeAdmin/WelcomeAdmin";
import Sidebar from "../../components/Sidebar/Sidebar";
import NoAdminAccess from "../../components/Errors/NoAdminAccess";

// Page for admin - managing orders and products
function Admin() {
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
              <WelcomeAdmin />
            </Col>
          </Row>
        ) : (
          <NoAdminAccess></NoAdminAccess>
        )}
      </Container>
    </>
  );
}

export default Admin;
